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

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { walletAddress: userId },
          { email: userId },
        ],
      },
    });

    if (!user) {
      return NextResponse.json(null);
    }

    // Get health score
    const healthScore = await prisma.healthScore.findFirst({
      where: { userId: user.id },
      orderBy: { calculatedAt: 'desc' },
    });

    // Get recent biomarker readings
    const recentBiomarkers = await prisma.biomarkerReading.findMany({
      where: { userId: user.id },
      orderBy: { date: 'desc' },
      take: 5,
    });

    return NextResponse.json({
      healthScore: healthScore?.score,
      riskScores: null, // HealthAssessment model not yet implemented
      recentBiomarkers,
      profile: null, // Profile not in User model
    });
  } catch (error: unknown) {
    console.error('Error fetching health context:', error);
    return NextResponse.json(
      { error: 'Failed to fetch health context' },
      { status: 500 }
    );
  }
}

