/**
 * API Route: Get Streak Status
 * Returns current streak and commitment status for a protocol
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserIdFromHeader } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const userId = getUserIdFromHeader(request);

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const protocolId = searchParams.get('protocolId');

    if (!protocolId) {
      return NextResponse.json(
        { error: 'Missing protocolId parameter' },
        { status: 400 }
      );
    }

    // Get all commitments for this protocol
    const commitments = await prisma.proofOfHealth.findMany({
      where: {
        userId,
        proofType: 'commitment',
        metadata: {
          path: ['protocolId'],
          equals: protocolId,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Calculate streak
    let streak = 0;
    let lastDay = 0;
    const today = Math.floor(Date.now() / (1000 * 60 * 60 * 24));

    for (const commitment of commitments) {
      const metadata = commitment.metadata as unknown;
      const day = metadata.day;
      const revealed = metadata.revealed || false;

      if (revealed && (lastDay === 0 || day === lastDay - 1)) {
        streak++;
        lastDay = day;
      } else if (revealed) {
        break; // Streak broken
      }
    }

    // Get missed reveals
    const missedReveals = commitments.filter((c: unknown) => {
      const metadata = c.metadata as unknown;
      const day = metadata.day;
      const revealed = metadata.revealed || false;
      const commitmentDay = Math.floor(
        new Date(c.createdAt).getTime() / (1000 * 60 * 60 * 24)
      );

      // Check if reveal window expired (24 hours)
      return !revealed && today > commitmentDay + 1;
    }).length;

    return NextResponse.json({
      success: true,
      data: {
        protocolId,
        streak,
        missedReveals,
        shouldSlash: missedReveals >= 3,
        totalCommitments: commitments.length,
        recentCommitments: commitments.slice(0, 7).map((c: unknown) => ({
          id: c.id,
          day: c.metadata.day,
          revealed: c.metadata.revealed || false,
          createdAt: c.createdAt,
        })),
      },
    });
  } catch (error) {
    console.error('Get streak error:', error);
    return NextResponse.json(
/**
 * API Route: Get Streak Status
 * Returns current streak and commitment status for a protocol
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserIdFromHeader } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const userId = getUserIdFromHeader(request);

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const protocolId = searchParams.get('protocolId');

    if (!protocolId) {
      return NextResponse.json(
        { error: 'Missing protocolId parameter' },
        { status: 400 }
      );
    }

    // Get all commitments for this protocol
    const commitments = await prisma.proofOfHealth.findMany({
      where: {
        userId,
        proofType: 'commitment',
        metadata: {
          path: ['protocolId'],
          equals: protocolId,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Calculate streak
    let streak = 0;
    let lastDay = 0;
    const today = Math.floor(Date.now() / (1000 * 60 * 60 * 24));

    for (const commitment of commitments) {
      const metadata = commitment.metadata as unknown;
      const day = metadata.day;
      const revealed = metadata.revealed || false;

      if (revealed && (lastDay === 0 || day === lastDay - 1)) {
        streak++;
        lastDay = day;
      } else if (revealed) {
        break; // Streak broken
      }
    }

    // Get missed reveals
    const missedReveals = commitments.filter((c: unknown) => {
      const metadata = c.metadata as unknown;
      const day = metadata.day;
      const revealed = metadata.revealed || false;
      const commitmentDay = Math.floor(
        new Date(c.createdAt).getTime() / (1000 * 60 * 60 * 24)
      );

      // Check if reveal window expired (24 hours)
      return !revealed && today > commitmentDay + 1;
    }).length;

    return NextResponse.json({
      success: true,
      data: {
        protocolId,
        streak,
        missedReveals,
        shouldSlash: missedReveals >= 3,
        totalCommitments: commitments.length,
        recentCommitments: commitments.slice(0, 7).map((c: unknown) => ({
          id: c.id,
          day: c.metadata.day,
          revealed: c.metadata.revealed || false,
          createdAt: c.createdAt,
        })),
      },
    });
  } catch (error) {
    console.error('Get streak error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to get';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}













