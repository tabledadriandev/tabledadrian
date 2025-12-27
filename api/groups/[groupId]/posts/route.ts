import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: NextRequest,
  _context: { params: { groupId: string } },
) {
  try {
    // TODO: ForumPost model not yet implemented, Post model doesn't have groupId
    return NextResponse.json([]);
  } catch (error: unknown) {
    console.error('Error fetching forum posts:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch posts';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 },
    );
  }
}

export async function POST(
  _request: NextRequest,
  _context: { params: { groupId: string } },
) {
  try {
    // TODO: ForumPost model not yet implemented
    return NextResponse.json(
      { error: 'Forum posts not yet implemented' },
      { status: 501 },
    );
  } catch (error: unknown) {
    console.error('Error creating forum post:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create post';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 },
    );
  }
}


