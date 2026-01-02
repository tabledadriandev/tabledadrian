import { NextRequest, NextResponse } from 'next/server';
import { stripeService, PRICING_TIERS } from '@/lib/stripe';
import { authService } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import type { SubscriptionTier, BillingCycle } from '@/lib/stripe';
// TODO: Install stripe package: npm install stripe
// import Stripe from 'stripe';
type Stripe = any; // Temporary type until stripe package is installed

export const dynamic = 'force-dynamic';

/**
 * POST /api/payments/subscriptions/create
 * Create a new subscription
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

    const { tier, billingCycle, paymentMethodId, paymentMethodType } = await request.json();

    if (!tier || !billingCycle) {
      return NextResponse.json(
        { error: 'Tier and billing cycle are required' },
        { status: 400 }
      );
    }

    // Validate tier
    const validTiers: SubscriptionTier[] = ['basic', 'premium', 'concierge'];
    if (!validTiers.includes(tier)) {
      return NextResponse.json(
        { error: `Tier must be one of: ${validTiers.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate billing cycle
    const validBillingCycles: BillingCycle[] = ['monthly', 'yearly'];
    if (!validBillingCycles.includes(billingCycle)) {
      return NextResponse.json(
        { error: `Billing cycle must be one of: ${validBillingCycles.join(', ')}` },
        { status: 400 }
      );
    }

    // TODO: Subscription model not yet implemented
    return NextResponse.json(
      { error: 'Subscription model not yet implemented' },
      { status: 501 }
    );
  } catch (error: unknown) {
    console.error('Error creating subscription:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create subscription';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

