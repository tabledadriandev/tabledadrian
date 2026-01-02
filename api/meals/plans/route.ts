import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');

    if (!address) {
      return NextResponse.json(
        { error: 'Wallet address required' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { walletAddress: address },
    });

    if (!user) {
      return NextResponse.json([]);
    }

    // TODO: MealPlan model not yet implemented, use ChefMealPlan instead
    const mealPlans = await prisma.chefMealPlan.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(mealPlans);
  } catch (error: unknown) {
    console.error('Error fetching meal plans:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch meal plans';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

