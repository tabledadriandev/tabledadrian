/**
 * Apple HealthKit Sync Endpoint
 * Accepts HealthKit export file upload and syncs data
 */

import { NextRequest, NextResponse } from 'next/server';
import { appleHealthKitParser } from '@/lib/wearables/apple-healthkit';
import { prisma } from '@/lib/prisma';
import {
  createDeviceAttestationTypedData,
  hashBiomarkerData,
  type DeviceAttestationData,
} from '@/lib/crypto/eip712';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const userId = formData.get('userId') as string;

    if (!file || !userId) {
      return NextResponse.json(
        { error: 'Missing file or userId' },
        { status: 400 }
      );
    }

    // Parse HealthKit export
    const healthData = await appleHealthKitParser.extractFromFile(file);

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

    // Store or update connection
    const existing = await prisma.wearableConnection.findFirst({
      where: {
        userId,
        provider: 'apple',
      },
    });

    if (existing) {
      await prisma.wearableConnection.update({
        where: { id: existing.id },
        data: {
          lastSyncAt: new Date(),
          isActive: true,
        },
      });
    } else {
      await prisma.wearableConnection.create({
        data: {
          userId,
          provider: 'apple',
          accessToken: 'file-upload', // HealthKit uses file upload, not OAuth token
          lastSyncAt: new Date(),
          isActive: true,
        },
      });
    }

    // Store biomarker readings
    const biomarkerReadings = [];

    if (healthData.steps) {
      biomarkerReadings.push({
        userId,
        metric: 'steps',
        value: healthData.steps,
        unit: 'steps',
        source: 'apple',
        date: new Date(),
      });
    }

    if (healthData.heartRate) {
      biomarkerReadings.push({
        userId,
        metric: 'heart_rate_resting',
        value: healthData.heartRate.resting,
        unit: 'bpm',
        source: 'apple',
        date: new Date(),
      });
    }

    if (healthData.sleep) {
      biomarkerReadings.push({
        userId,
        metric: 'sleep_duration',
        value: healthData.sleep.duration,
        unit: 'hours',
        source: 'apple',
        date: healthData.sleep.startDate,
        metadata: {
          startDate: healthData.sleep.startDate,
          endDate: healthData.sleep.endDate,
        },
      });
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
    const deviceId = 'apple_health';
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
        await prisma.deviceAttestation.create({
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
        attestations: attestations.length,
        message: attestations.length > 0
          ? `${attestations.length} device attestations created. Sign with device wallet to submit onchain.`
          : undefined,
      },
    });
  } catch (error: unknown) {
    console.error('Apple HealthKit sync error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to sync Apple Health data';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
