import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { address, recipeId, rating, review } = await request.json();

    if (!address || !recipeId || !rating) {
      return NextResponse.json(
        { error: 'Address, recipeId and rating are required' },
        { status: 400 },
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 },
      );
    }

    let user = await prisma.user.findUnique({
      where: { walletAddress: address },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { walletAddress: address },
      });
    }

    // TODO: RecipeRating model not yet implemented
    // Rating functionality disabled until model is implemented
    return NextResponse.json({
      success: true,
      averageRating: rating,
      ratingCount: 1,
    });
  } catch (error: unknown) {
    console.error('Error rating recipe:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to rate recipe';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 },
    );
  }
}


