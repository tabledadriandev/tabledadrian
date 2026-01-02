/**
 * Latest Biomarkers API
 * Returns most recent biomarker readings for dashboard
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing userId' },
        { status: 400 }
      );
    }

    // Get latest readings for each metric
    const metrics = ['hrv', 'sleep_score', 'readiness', 'recovery', 'steps', 'active_minutes'] as const;
    type Metric = typeof metrics[number];
    const latestReadings: Record<Metric, number | null> = {
      hrv: null,
      sleep_score: null,
      readiness: null,
      recovery: null,
      steps: null,
      active_minutes: null,
    };

    for (const metric of metrics) {
      const reading = await prisma.biomarkerReading.findFirst({
        where: {
          userId,
          metric,
        },
        orderBy: {
          date: 'desc',
        },
        select: {
          value: true,
        },
      });

      if (reading && reading.value !== null) {
        latestReadings[metric] = Number(reading.value);
      }
    }

    return NextResponse.json({
      hrv: latestReadings.hrv || null,
      sleepScore: latestReadings.sleep_score || null,
      recovery: latestReadings.recovery || null,
      readiness: latestReadings.readiness || null,
      steps: latestReadings.steps || null,
      activeMinutes: latestReadings.active_minutes || null,
    });
  } catch (error) {
    console.error('Latest biomarkers error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch latest biomarkers';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
