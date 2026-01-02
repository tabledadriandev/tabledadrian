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

    // TODO: MedicalRecord model not yet implemented, use MedicalResult instead
    const records = await prisma.medicalResult.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, records });
  } catch (error: unknown) {
    console.error('Error listing medical records:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to list records';
    return NextResponse.json(
      { error: 'Failed to list records', details: errorMessage },
      { status: 500 },
    );
  }
}


