import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(_request: NextRequest) {
  try {
    // TODO: MicrobiomeResult and DailyHabits models not yet implemented
    // Return empty leaderboards for now
    return NextResponse.json({
      success: true,
      microbiotaDiversity: [],
      longestStreaks: [],
    });
  } catch (error: unknown) {
    console.error('Error building leaderboards:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to load leaderboards';
    return NextResponse.json(
      { error: 'Failed to load leaderboards', details: errorMessage },
      { status: 500 },
    );
  }
}


