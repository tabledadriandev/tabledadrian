import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 },
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { walletAddress: userId },
          { email: userId },
        ],
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 },
      );
    }

    // TODO: Appointment model not yet implemented
    const appointments: unknown[] = [];

    return NextResponse.json({ success: true, appointments });
  } catch (error: unknown) {
    console.error('Error listing appointments:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to list appointments';
    return NextResponse.json(
      { error: 'Failed to list appointments', details: errorMessage },
      { status: 500 },
    );
  }
}


