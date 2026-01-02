import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

/**
 * Get treasury balance across all currencies
 */
export async function GET() {
  try {
    // TODO: TreasuryBalance and TreasuryTransaction models not yet implemented
    const balances: unknown[] = [];

    return NextResponse.json({
      balances,
      totalValue: 0,
    });
  } catch (error: unknown) {
    console.error('Error fetching treasury balance:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch treasury balance';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

