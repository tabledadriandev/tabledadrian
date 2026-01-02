import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { address } = await request.json();
    const { id } = await params;
    const postId = id;

    if (!address) {
      return NextResponse.json(
        { error: 'Address required' },
        { status: 400 }
      );
    }

    // Increment likes
    const post = await prisma.post.update({
      where: { id: postId },
      data: {
        likes: { increment: 1 },
      },
    });

    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    console.error('Error liking post:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to like post';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

