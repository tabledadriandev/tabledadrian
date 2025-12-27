import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      fullName,
      type,
      specialties,
      languages,
      bio,
      yearsExperience,
      licenseNumber,
      licenseCountry,
      consultationPrice,
      timezone,
      availability,
    } = body;

    if (!fullName || !type) {
      return NextResponse.json(
        { error: 'fullName and type are required' },
        { status: 400 },
      );
    }

    const linkedUser = userId
      ? await prisma.user.findFirst({
          where: {
            OR: [
              { walletAddress: userId },
              { email: userId },
            ],
          },
        })
      : null;

    // TODO: HealthcareProvider model not yet implemented
    return NextResponse.json(
      { error: 'HealthcareProvider model not yet implemented' },
      { status: 501 }
    );
  } catch (error: unknown) {
    console.error('Error registering provider:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to register provider';
    return NextResponse.json(
      { error: 'Failed to register provider', details: errorMessage },
      { status: 500 },
    );
  }
}


