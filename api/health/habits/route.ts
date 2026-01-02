import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const date = searchParams.get('date');

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

    // TODO: DailyHabits model not yet implemented in schema
    return NextResponse.json(null);
  } catch (error: unknown) {
    console.error('Error fetching habits:', error);
    return NextResponse.json(
      { error: 'Failed to fetch habits' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, date, ...habitData } = body;

    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { walletAddress: userId },
          { email: userId },
        ],
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          walletAddress: userId.startsWith('0x') ? userId : `0x${Buffer.from(userId).toString('hex').slice(0, 40).padStart(40, '0')}`,
          email: userId.includes('@') ? userId : null,
        },
      });
    }

    // TODO: DailyHabits model not yet implemented in schema
    return NextResponse.json(
      { error: 'Daily habits not yet implemented' },
      { status: 501 }
    );
  } catch (error: unknown) {
    console.error('Error saving habits:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to save habits';
    return NextResponse.json(
      { error: 'Failed to save habits', details: errorMessage },
      { status: 500 }
    );
  }
}

