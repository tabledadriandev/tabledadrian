/**
 * Google Fit Sync Endpoint
 * Syncs steps, heart rate, activity, and sleep data
 */

import { NextRequest, NextResponse } from 'next/server';
import { createGoogleFitClient } from '@/lib/wearables/google-fit';
import { prisma } from '@/lib/prisma';
import {
  createDeviceAttestationTypedData,
  hashBiomarkerData,
  type DeviceAttestationData,
} from '@/lib/crypto/eip712';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { userId, accessToken } = await request.json();

    if (!userId || !accessToken) {
      return NextResponse.json(
        { error: 'Missing userId or accessToken' },
        { status: 400 }
      );
    }

    const googleFitClient = createGoogleFitClient(accessToken);

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Sync data for last 30 days
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);

    // Get steps
    const steps = await googleFitClient.getSteps(startDate, endDate);
    
    // Get heart rate
    const heartRateData = await googleFitClient.getHeartRate(startDate, endDate);
    
    // Get activities
    const activities = await googleFitClient.getActivities(startDate, endDate);
    
    // Get sleep
    const sleepData = await googleFitClient.getSleep(startDate, endDate);

    // Store connection
    const existing = await prisma.wearableConnection.findFirst({
      where: {
        userId,
        provider: 'google',
      },
    });

    if (existing) {
      await prisma.wearableConnection.update({
        where: { id: existing.id },
        data: {
          accessToken,
          lastSyncAt: new Date(),
          isActive: true,
        },
      });
    } else {
      await prisma.wearableConnection.create({
        data: {
          userId,
          provider: 'google',
          accessToken,
          lastSyncAt: new Date(),
          isActive: true,
        },
      });
    }

    // Store biomarker readings
    const biomarkerReadings = [];

    if (steps > 0) {
      biomarkerReadings.push({
        userId,
        metric: 'steps',
        value: steps,
        unit: 'steps',
        source: 'google',
        date: new Date(),
      });
    }

    if (heartRateData.length > 0) {
      const avgHR = heartRateData.reduce((sum, hr) => sum + hr.value, 0) / heartRateData.length;
      const minHR = Math.min(...heartRateData.map(hr => hr.value));
      const maxHR = Math.max(...heartRateData.map(hr => hr.value));

      biomarkerReadings.push({
        userId,
        metric: 'heart_rate_resting',
        value: minHR,
        unit: 'bpm',
        source: 'google',
        date: new Date(),
        metadata: {
          average: avgHR,
          max: maxHR,
        },
      });
    }

    if (sleepData.length > 0) {
      for (const sleep of sleepData) {
        const duration = (parseInt(sleep.endTimeMillis) - parseInt(sleep.startTimeMillis)) / (1000 * 60 * 60);
        biomarkerReadings.push({
          userId,
          metric: 'sleep_duration',
          value: duration,
          unit: 'hours',
          source: 'google',
          date: new Date(parseInt(sleep.startTimeMillis)),
        });
      }
    }

    // Bulk insert
    if (biomarkerReadings.length > 0) {
      await prisma.biomarkerReading.createMany({
        data: biomarkerReadings,
        skipDuplicates: true,
      });
    }

    // Calculate token reward
    const dataPoints = biomarkerReadings.length;
    const tokenReward = dataPoints * 0.1;

    // Record DeSci contribution
    await prisma.deSciContribution.create({
      data: {
        userId,
        dataPoints,
        tokenReward,
        researchStudy: 'wearable_sync',
      },
    });

    // Generate EIP-712 attestations for synced data (Phase 2.5)
    const attestations = [];
    const deviceId = 'google_fit';
    const timestamp = Math.floor(Date.now() / 1000);

    // Create attestations for key metrics
    for (const reading of biomarkerReadings.slice(0, 10)) { // Limit to first 10 for performance
      const dataHash = hashBiomarkerData(
        userId,
        reading.metric,
        reading.value,
        timestamp,
        reading.metadata
      );

      const typedData = createDeviceAttestationTypedData({
        userId,
        deviceId,
        dataHash,
        timestamp,
        metric: reading.metric,
        value: reading.value,
      });

      // Store attestation record (signature will be added by device wallet)
      try {
        await (prisma as any).deviceAttestation.create({
          data: {
            userId,
            deviceId,
            devicePubKey: '', // Will be set when signature is verified
            dataHash,
            signature: '', // Device wallet will sign
            metric: reading.metric,
            value: reading.value,
            timestamp: new Date(timestamp * 1000),
          },
        });

        attestations.push({
          metric: reading.metric,
          dataHash,
          typedData,
        });
      } catch (error) {
        // Skip if attestation already exists
        console.warn(`Attestation already exists for ${reading.metric}`);
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        synced: dataPoints,
        reward: tokenReward,
        steps,
        heartRate: heartRateData.length,
        activities: activities.length,
        sleep: sleepData.length,
        attestations: attestations.length,
        message: attestations.length > 0
          ? `${attestations.length} device attestations created. Sign with device wallet to submit onchain.`
          : undefined,
      },
    });
  } catch (error: unknown) {
    console.error('Google Fit sync error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to sync Google Fit data';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
