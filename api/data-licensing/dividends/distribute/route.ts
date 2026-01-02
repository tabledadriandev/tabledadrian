import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

/**
 * POST /api/data-licensing/dividends/distribute
 * Distributes calculated dividends to users.
 * This would typically be called by an admin or automated job.
 */
export async function POST(request: NextRequest) {
  try {
    const { licenseId, period, dryRun } = await request.json();

    // Calculate dividends first
    const calcUrl = new URL('/api/data-licensing/dividends/calculate', request.url);
    if (licenseId) calcUrl.searchParams.set('licenseId', licenseId);
    if (period) calcUrl.searchParams.set('period', period);

    const calcResponse = await fetch(calcUrl.toString());
    const calcData = await calcResponse.json();

    if (!calcResponse.ok || !calcData.dividends || calcData.dividends.length === 0) {
      return NextResponse.json(
        { error: 'No dividends to distribute', data: calcData },
        { status: 400 }
      );
    }

    type Dividend = {
      userId: string;
      walletAddress: string | null;
      tokenBalance: number;
      stakedAmount: number;
      share: number;
      dividendAmount: number;
      currency: string;
    };

    if (dryRun === true) {
      const dividends = calcData.dividends as Dividend[];
      return NextResponse.json({
        success: true,
        dryRun: true,
        totalDividends: dividends.reduce((sum: number, d: Dividend) => sum + d.dividendAmount, 0),
        userCount: dividends.length,
        dividends: dividends,
        message: 'Dry run - no payments processed',
      });
    }

    // Create dividend payment records
    const dividends = calcData.dividends as Dividend[];
    const payments = await Promise.all(
      dividends.map((div: Dividend) =>
        prisma.dividendPayment.create({
          data: {
            userId: div.userId,
            sourceType: 'data_licensing',
            sourceId: licenseId || null,
            amount: div.dividendAmount,
            currency: div.currency,
            usdValue: null, // Would be calculated from current $tabledadrian price
            distributionMethod: div.currency === 'TA' ? 'token_transfer' : 'platform_credits',
            status: 'pending', // Would be updated after on-chain transfer
          },
        })
      )
    );

    // In production, this would:
    // 1. Batch transfer $tabledadrian tokens to users' wallets
    // 2. Update payment records with txHash
    // 3. Update user token balances
    // 4. Send notifications

    interface Payment {
      id: string;
      userId: string;
      amount: number;
      currency: string;
      status: string;
    }
    return NextResponse.json({
      success: true,
      totalDividends: payments.reduce((sum: number, p: Payment) => sum + p.amount, 0),
      userCount: payments.length,
      payments: payments.map((p: Payment) => ({
        id: p.id,
        userId: p.userId,
        amount: p.amount,
        currency: p.currency,
        status: p.status,
      })),
      message: 'Dividend payments created. On-chain distribution pending.',
    });
  } catch (error) {
    console.error('Error distributing dividends:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to distribute dividends';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

