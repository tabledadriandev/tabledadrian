import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { address, type, amount, description } = await request.json();

    if (!address || !type || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { walletAddress: address },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          walletAddress: address,
        },
      });
    }

    // TODO: Reward model not yet implemented, update user's totalTokensEarned directly
    const rewardAmount = parseFloat(amount);
    
    await prisma.user.update({
      where: { id: user.id },
      data: {
        totalTokensEarned: {
          increment: rewardAmount,
        },
      },
    });

    return NextResponse.json({ 
      success: true, 
      data: {
        userId: user.id,
        type,
        amount: rewardAmount,
        description: description || `Reward for ${type}`,
      }
    });
  } catch (error: unknown) {
    console.error('Error creating reward:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create reward';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

