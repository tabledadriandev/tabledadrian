import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { address, amount } = await request.json();

    if (!address || !amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Valid address and amount required' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { walletAddress: address },
      include: {
        stakings: {
          where: { status: 'active' },
        },
      },
    });

    if (!user || user.stakedTokens < amount) {
      return NextResponse.json(
        { error: 'Insufficient staked amount' },
        { status: 400 }
      );
    }

    // Update staked amount
    await prisma.user.update({
      where: { id: user.id },
      data: {
        stakedTokens: {
          decrement: amount,
        },
      },
    });

    // Update staking records to withdrawn status
    // TODO: Implement proper unstaking logic with cooldown periods
    await prisma.staking.updateMany({
      where: {
        userId: user.id,
        status: 'active',
      },
      data: {
        status: 'withdrawn',
      },
    });

    // Create transaction record
    await prisma.transaction.create({
      data: {
        userId: user.id,
        type: 'unstake',
        amount: amount,
        description: `Unstaked ${amount} $tabledadrian`,
        status: 'pending', // Would be updated after on-chain confirmation
      },
    });

    // In production, this would trigger an on-chain unstaking transaction
    // with a 7-day cooldown period

    return NextResponse.json({
      success: true,
      message: 'Unstaking initiated. Tokens will be available after 7-day cooldown.',
    });
  } catch (error: unknown) {
    console.error('Error unstaking:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to unstake';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

