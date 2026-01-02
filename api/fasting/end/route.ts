import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { address, endTime } = await request.json();

    if (!address || !endTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { walletAddress: address },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Log fasting end
    await prisma.healthData.create({
      data: {
        userId: user.id,
        type: 'fasting_end',
        value: 1,
        source: 'manual',
        recordedAt: new Date(endTime),
      },
    });

    // Award tokens (Reward model not yet implemented)
    const tokenReward = 5; // 5 TA tokens
    await prisma.user.update({
      where: { id: user.id },
      data: {
        totalTokensEarned: { increment: tokenReward },
      },
    });

    return NextResponse.json({ success: true, tokensEarned: tokenReward });
  } catch (error: unknown) {
    console.error('Error ending fast:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to end fast';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

