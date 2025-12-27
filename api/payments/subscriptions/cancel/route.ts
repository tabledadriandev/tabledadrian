import { NextRequest, NextResponse } from 'next/server';
import { stripeService } from '@/lib/stripe';
import { authService } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

/**
 * POST /api/payments/subscriptions/cancel
 * Cancel subscription (at end of period or immediately)
 */
export async function POST(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('sessionToken')?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const user = await authService.verifySession(sessionToken);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 401 }
      );
    }

    const { subscriptionId, cancelImmediately } = await request.json();

    if (!subscriptionId) {
      return NextResponse.json(
        { error: 'Subscription ID is required' },
        { status: 400 }
      );
    }

    // TODO: Subscription model not yet implemented
    return NextResponse.json(
      { error: 'Subscription model not yet implemented' },
      { status: 501 }
    );
  } catch (error: unknown) {
    console.error('Error canceling subscription:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to cancel subscription';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

