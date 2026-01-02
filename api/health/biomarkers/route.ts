import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { walletAddress: userId },
          { email: userId },
        ],
      },
    });

    if (!user) {
      return NextResponse.json([]);
    }

    // Get biomarkers (using BiomarkerReading model)
    const biomarkers = await prisma.biomarkerReading.findMany({
      where: { userId: user.id },
      orderBy: { date: 'desc' },
      take: 100,
    });

    return NextResponse.json(biomarkers);
  } catch (error: unknown) {
    console.error('Error fetching biomarkers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch biomarkers' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, ...biomarkerData } = body;

    // Find user
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { walletAddress: userId },
          { email: userId },
        ],
      },
    });

    if (!user) {
      // Create user if doesn't exist
      user = await prisma.user.create({
        data: {
          walletAddress: userId.startsWith('0x') ? userId : `0x${Buffer.from(userId).toString('hex').slice(0, 40).padStart(40, '0')}`,
          email: userId.includes('@') ? userId : null,
        },
      });
    }

    // BiomarkerReading model has: metric, value, unit, source, date, metadata
    // Create multiple biomarker readings from the data
    const biomarkerEntries = [];
    const labDate = biomarkerData.labDate ? new Date(biomarkerData.labDate) : new Date();
    
    // Map each biomarker field to a BiomarkerReading entry
    const biomarkerFields: Array<{ key: string; metric: string; unit: string }> = [
      { key: 'bloodGlucose', metric: 'bloodGlucose', unit: 'mg/dL' },
      { key: 'cholesterolTotal', metric: 'cholesterolTotal', unit: 'mg/dL' },
      { key: 'cholesterolLDL', metric: 'cholesterolLDL', unit: 'mg/dL' },
      { key: 'cholesterolHDL', metric: 'cholesterolHDL', unit: 'mg/dL' },
      { key: 'triglycerides', metric: 'triglycerides', unit: 'mg/dL' },
      { key: 'heartRate', metric: 'heartRate', unit: 'bpm' },
      { key: 'weight', metric: 'weight', unit: 'kg' },
      { key: 'bmi', metric: 'bmi', unit: 'kg/m²' },
      { key: 'bodyFatPercentage', metric: 'bodyFatPercentage', unit: '%' },
      { key: 'muscleMass', metric: 'muscleMass', unit: 'kg' },
      { key: 'vitaminD', metric: 'vitaminD', unit: 'ng/mL' },
      { key: 'vitaminB12', metric: 'vitaminB12', unit: 'pg/mL' },
      { key: 'iron', metric: 'iron', unit: 'μg/dL' },
      { key: 'ferritin', metric: 'ferritin', unit: 'ng/mL' },
      { key: 'testosterone', metric: 'testosterone', unit: 'ng/dL' },
      { key: 'cortisol', metric: 'cortisol', unit: 'μg/dL' },
      { key: 'tsh', metric: 'tsh', unit: 'mIU/L' },
      { key: 't3', metric: 't3', unit: 'ng/dL' },
      { key: 't4', metric: 't4', unit: 'μg/dL' },
    ];

    for (const field of biomarkerFields) {
      const value = biomarkerData[field.key] as number | undefined;
      if (value !== undefined && value !== null) {
        const reading = await prisma.biomarkerReading.create({
          data: {
            userId: user.id,
            metric: field.metric,
            value,
            unit: field.unit,
            source: biomarkerData.source || 'manual',
            date: labDate,
            metadata: {
              notes: biomarkerData.notes,
              ...(biomarkerData.bloodPressureSystolic && { bloodPressureSystolic: biomarkerData.bloodPressureSystolic }),
              ...(biomarkerData.bloodPressureDiastolic && { bloodPressureDiastolic: biomarkerData.bloodPressureDiastolic }),
            },
          },
        });
        biomarkerEntries.push(reading);
      }
    }

    return NextResponse.json({ success: true, biomarkers: biomarkerEntries });
  } catch (error: unknown) {
    console.error('Error saving biomarker:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to save biomarker';
    return NextResponse.json(
      { error: 'Failed to save biomarker', details: errorMessage },
      { status: 500 }
    );
  }
}

