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
      return NextResponse.json({ days: [], completedDays: 0, totalDays: 7 });
    }

    // TODO: DailyHabits model not yet implemented in schema
    return NextResponse.json({
      days: [],
      completedDays: 0,
      totalDays: 7,
      avgWater: 0,
      avgSteps: 0,
      exerciseDays: 0,
    });
  } catch (error: unknown) {
    console.error('Error fetching weekly summary:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weekly summary' },
      { status: 500 }
    );
  }
}

