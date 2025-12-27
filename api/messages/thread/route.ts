import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { decryptMessage } from '@/lib/messaging/encryption';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { viewerAddress, otherPartyAddress } = await request.json();

    if (!viewerAddress || !otherPartyAddress) {
      return NextResponse.json(
        { error: 'viewerAddress and otherPartyAddress are required' },
        { status: 400 },
      );
    }

    const viewer = await prisma.user.findUnique({
      where: { walletAddress: viewerAddress },
    });
    const other = await prisma.user.findUnique({
      where: { walletAddress: otherPartyAddress },
    });

    if (!viewer || !other) {
      return NextResponse.json({ messages: [] });
    }

    // TODO: Message model not yet implemented
    const messages: unknown[] = [];

    const participants = [
      viewerAddress.toLowerCase(),
      otherPartyAddress.toLowerCase(),
    ].sort();
    const sharedKey = participants.join('|');

    // TODO: Message model not yet implemented, return empty array
    return NextResponse.json({ messages: [] });
  } catch (error: unknown) {
    console.error('Error loading thread:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to load thread';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 },
    );
  }
}


