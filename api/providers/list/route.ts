import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(_request: NextRequest) {
  try {
    // TODO: HealthcareProvider model not yet implemented
    const providers: unknown[] = [];

    return NextResponse.json({ success: true, providers });
  } catch (error: unknown) {
    console.error('Error listing providers:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to list providers';
    return NextResponse.json(
      { error: 'Failed to list providers', details: errorMessage },
      { status: 500 },
    );
  }
}


