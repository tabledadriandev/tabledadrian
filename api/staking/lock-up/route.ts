import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { web3Service } from '@/lib/web3';

export const dynamic = 'force-dynamic';

/**
 * Lock-up periods and multipliers:
 * - 30 days: 1.5x voting power
 * - 90 days: 2.0x voting power
 * - 180 days: 3.0x voting power
 * - 365 days: 5.0x voting power
 */
const LOCK_UP_OPTIONS = {
  30: 1.5,
  90: 2.0,
  180: 3.0,
  365: 5.0,
} as const;

export async function POST(request: NextRequest) {
  try {
    const { address, amount, lockUpPeriod } = await request.json();

    if (!address || !amount || !lockUpPeriod) {
      return NextResponse.json(
        { error: 'Address, amount, and lock-up period required' },
        { status: 400 }
      );
    }

    if (!(lockUpPeriod in LOCK_UP_OPTIONS)) {
      return NextResponse.json(
        { error: 'Invalid lock-up period. Must be 30, 90, 180, or 365 days' },
        { status: 400 }
      );
    }

    const multiplier = LOCK_UP_OPTIONS[lockUpPeriod as keyof typeof LOCK_UP_OPTIONS];
    const amountNum = parseFloat(amount);

    if (amountNum <= 0) {
      return NextResponse.json(
        { error: 'Amount must be greater than 0' },
        { status: 400 }
      );
    }

    // Check balance
    const balance = await web3Service.getBalance(address as `0x${string}`);
    const balanceNum = parseFloat((balance / BigInt(1e18)).toString());

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { walletAddress: address },
      include: {
        stakings: {
          where: { status: 'active' },
        },
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { walletAddress: address },
        include: {
          stakings: {
            where: { status: 'active' },
          },
        },
      });
    }

    // Calculate available balance (total - already staked)
    const totalStaked = user.stakings.reduce((sum, s) => sum + s.amount, 0);
    const availableBalance = balanceNum - totalStaked;

    if (amountNum > availableBalance) {
      return NextResponse.json(
        { error: `Insufficient balance. Available: ${availableBalance.toFixed(2)} $tabledadrian` },
        { status: 400 }
      );
    }

    // Calculate locked until date
    const lockedUntil = new Date();
    lockedUntil.setDate(lockedUntil.getDate() + lockUpPeriod);

    // Create stake
    const stake = await prisma.staking.create({
      data: {
        userId: user.id,
        amount: amountNum,
        startDate: new Date(),
        unlockDate: lockedUntil,
        status: 'active',
        apy: 0, // TODO: Calculate APY based on lock-up period
        rewardsEarned: 0,
      },
    });

    // Update user staked amount
    await prisma.user.update({
      where: { id: user.id },
      data: {
        stakedTokens: { increment: amountNum },
      },
    });

    return NextResponse.json({
      success: true,
      stake: {
        id: stake.id,
        amount: stake.amount,
        lockUpPeriod,
        multiplier,
        lockedUntil: stake.unlockDate,
      },
    });
  } catch (error: unknown) {
    console.error('Error creating lock-up stake:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create lock-up stake';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

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
      include: {
        stakings: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!user) {
      return NextResponse.json({
        stakes: [],
        totalStaked: 0,
        activeStakes: [],
      });
    }

    const activeStakes = user.stakings.filter(
      (s) => s.status === 'active' && s.unlockDate !== null && s.unlockDate > new Date()
    );

    return NextResponse.json({
      stakes: user.stakings,
      totalStaked: user.stakings.reduce((sum, s) => sum + s.amount, 0),
      activeStakes,
      lockUpOptions: LOCK_UP_OPTIONS,
    });
  } catch (error: unknown) {
    console.error('Error fetching lock-up stakes:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch lock-up stakes';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

