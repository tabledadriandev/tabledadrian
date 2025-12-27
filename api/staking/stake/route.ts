import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { web3Service } from '@/lib/web3';

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

    // Check balance
    const balance = await web3Service.getBalance(address as `0x${string}`);
    const amountInWei = BigInt(Math.floor(amount * 1e18));

    if (balance < amountInWei) {
      return NextResponse.json(
        { error: 'Insufficient balance' },
        { status: 400 }
      );
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { walletAddress: address },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { walletAddress: address },
      });
    }

    // Create staking record
    await prisma.staking.create({
      data: {
        userId: user.id,
        amount: amount,
        startDate: new Date(),
        unlockDate: null, // No lock-up for regular staking
        status: 'active',
        apy: 0, // TODO: Set appropriate APY
        rewardsEarned: 0,
      },
    });

    // Update staked amount
    await prisma.user.update({
      where: { id: user.id },
      data: {
        stakedTokens: {
          increment: amount,
        },
      },
    });

    // Create transaction record
    await prisma.transaction.create({
      data: {
        userId: user.id,
        type: 'stake',
        amount: amount,
        description: `Staked ${amount} $tabledadrian`,
        status: 'pending', // Would be updated after on-chain confirmation
      },
    });

    // In production, this would trigger an on-chain staking transaction
    // For now, we just record it in the database

    return NextResponse.json({
      success: true,
      message: 'Staking initiated. Please confirm the transaction in your wallet.',
    });
  } catch (error: unknown) {
    console.error('Error staking:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to stake';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

