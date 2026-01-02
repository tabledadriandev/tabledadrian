import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { encryptMessage } from '@/lib/messaging/encryption';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { senderAddress, recipientAddress, content } = await request.json();

    if (!senderAddress || !recipientAddress || !content) {
      return NextResponse.json(
        { error: 'senderAddress, recipientAddress and content are required' },
        { status: 400 },
      );
    }

    let sender = await prisma.user.findUnique({
      where: { walletAddress: senderAddress },
    });
    if (!sender) {
      sender = await prisma.user.create({
        data: { walletAddress: senderAddress },
      });
    }

    let recipient = await prisma.user.findUnique({
      where: { walletAddress: recipientAddress },
    });
    if (!recipient) {
      recipient = await prisma.user.create({
        data: { walletAddress: recipientAddress },
      });
    }

    // Derive a very simple shared key from sorted wallet addresses for demo purposes.
    const participants = [senderAddress.toLowerCase(), recipientAddress.toLowerCase()].sort();
    const sharedKey = participants.join('|');

    const encryptedContent = await encryptMessage(content, sharedKey);

    // TODO: Message model not yet implemented
    // Return stub response for now
    const message = {
      id: 'temp',
      senderId: sender.id,
      recipientId: recipient.id,
      content: encryptedContent,
      createdAt: new Date(),
    };

    return NextResponse.json({ success: true, id: message.id });
  } catch (error: unknown) {
    console.error('Error sending message:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to send message';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 },
    );
  }
}


