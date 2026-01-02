import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const goal = (searchParams.get('goal') || '').toLowerCase(); // e.g. longevity, sleep, metabolic

    // Base query: active marketplace items tagged as supplements
    const baseWhere: unknown = {
      isActive: true,
      OR: [
        { category: 'supplement' },
        { type: 'product' },
      ],
    };

    // TODO: MarketplaceItem model not yet implemented
    return NextResponse.json([]);
  } catch (error: unknown) {
    console.error('Error recommending supplements:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to recommend supplements';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 },
    );
  }
}


