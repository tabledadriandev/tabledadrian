import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { providerId, verified } = body;

    if (!providerId) {
      return NextResponse.json(
        { error: 'providerId is required' },
        { status: 400 },
      );
    }

    // TODO: HealthcareProvider model not yet implemented
    return NextResponse.json(
      { error: 'HealthcareProvider model not yet implemented' },
      { status: 501 }
    );
  } catch (error: unknown) {
    console.error('Error verifying provider:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to verify provider';
    return NextResponse.json(
      { error: 'Failed to verify provider', details: errorMessage },
      { status: 500 },
    );
  }
}


