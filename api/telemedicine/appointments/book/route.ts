import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, providerId, startTime, endTime, reason } = body;

    if (!userId || !providerId || !startTime) {
      return NextResponse.json(
        { error: 'userId, providerId and startTime are required' },
        { status: 400 },
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
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 },
      );
    }

    // TODO: HealthcareProvider model not yet implemented
    return NextResponse.json(
      { error: 'HealthcareProvider model not yet implemented' },
      { status: 501 },
    );
  } catch (error: unknown) {
    console.error('Error booking appointment:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to book appointment';
    return NextResponse.json(
      { error: 'Failed to book appointment', details: errorMessage },
      { status: 500 },
    );
  }
}


