import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(_request: NextRequest) {
  try {
    // TODO: GovernanceProposal model not yet implemented in schema
    return NextResponse.json([]);
  } catch (error: unknown) {
    console.error('Error fetching proposals:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch proposals';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { address, title, description } = await request.json();

    if (!address || !title || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: GovernanceProposal model not yet implemented in schema
    return NextResponse.json(
      { error: 'Governance proposals not yet implemented' },
      { status: 501 }
    );
  } catch (error: unknown) {
    console.error('Error creating proposal:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create proposal';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

