import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, type, imageData, ...analysisData } = body;

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
      user = await prisma.user.create({
        data: {
          walletAddress: userId.startsWith('0x') ? userId : `0x${Buffer.from(userId).toString('hex').slice(0, 40).padStart(40, '0')}`,
          email: userId.includes('@') ? userId : null,
        },
      });
    }

    // Save image (in production, upload to cloud storage)
    const imageUrl = `/api/images/${Date.now()}.jpg`; // Placeholder

    // Create camera analysis
    const analysis = await prisma.cameraAnalysis.create({
      data: {
        userId: user.id,
        type: type || 'facial',
        imageUrl,
        imageData: imageData?.substring(0, 1000), // Store first 1000 chars as reference
        skinHealth: analysisData.skinHealth,
        eyeAnalysis: analysisData.eyeAnalysis,
        facialSymmetry: analysisData.facialSymmetry,
        stressLevel: analysisData.stressLevel,
        estimatedAge: analysisData.estimatedAge,
        actualAge: analysisData.actualAge,
        measurements: analysisData.measurements,
        bodyFatEstimate: analysisData.bodyFatEstimate,
        leanMuscleMass: analysisData.leanMuscleMass,
        muscleSymmetry: analysisData.muscleSymmetry,
        postureAnalysis: analysisData.postureAnalysis,
        heartRateEstimate: analysisData.heartRate || analysisData.heartRateEstimate,
        respiratoryRate: analysisData.breathingRate || analysisData.respiratoryRate,
        bloodOxygenEstimate: analysisData.bloodOxygenEstimate,
        foodsIdentified: analysisData.foodsIdentified,
        nutritionAnalysis: analysisData.nutritionAnalysis,
        recommendations: analysisData.stressIndicators ? { stressIndicators: analysisData.stressIndicators } : undefined,
      },
    });

    return NextResponse.json({ success: true, analysis });
  } catch (error: unknown) {
    console.error('Error saving camera analysis:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to save analysis';
    return NextResponse.json(
      { error: 'Failed to save analysis', details: errorMessage },
      { status: 500 }
    );
  }
}

