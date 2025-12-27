import { NextRequest, NextResponse } from 'next/server';
import { stripeService } from '@/lib/stripe';
import { authService } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

/**
 * GET /api/payments/invoice?paymentId=xxx
 * Get invoice PDF URL or generate invoice data
 */
export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get('paymentId');
    const subscriptionId = searchParams.get('subscriptionId');

    if (!paymentId && !subscriptionId) {
      return NextResponse.json(
        { error: 'Payment ID or Subscription ID is required' },
        { status: 400 }
      );
    }

    // Get invoice for payment
    if (paymentId) {
      // TODO: Payment model not yet implemented, use Transaction instead
      const payment = await prisma.transaction.findFirst({
        where: {
          id: paymentId,
          userId: user.id,
        },
      });

      if (!payment) {
        return NextResponse.json(
          { error: 'Payment not found' },
          { status: 404 }
        );
      }

      // TODO: Transaction model doesn't have stripeInvoiceId, check metadata instead
      const paymentMetadata = payment.metadata as Record<string, unknown> | null;
      const stripeInvoiceId = paymentMetadata?.stripeInvoiceId as string | undefined;
      if (stripeInvoiceId) {
        const invoiceUrl = await stripeService.getInvoicePdfUrl(stripeInvoiceId);
        return NextResponse.json({
          success: true,
          invoice: {
            paymentId: payment.id,
            amount: payment.amount,
            currency: (paymentMetadata?.currency as string) || 'USD',
            description: payment.description,
            paidAt: payment.createdAt,
            invoiceUrl: invoiceUrl || (paymentMetadata?.invoiceUrl as string) || null,
            invoiceNumber: (paymentMetadata?.invoiceNumber as string) || null,
          },
        });
      }

      // For crypto payments, generate invoice data (no PDF)
      return NextResponse.json({
        success: true,
        invoice: {
          paymentId: payment.id,
          amount: payment.amount,
          currency: (paymentMetadata?.currency as string) || 'USD',
          description: payment.description,
          paidAt: payment.createdAt,
          txHash: payment.txHash,
          invoiceNumber: `INV-${payment.id.slice(0, 8).toUpperCase()}`,
        },
      });
    }

    // TODO: Subscription and Payment models not yet implemented
    if (subscriptionId) {
      return NextResponse.json(
        { error: 'Subscription model not yet implemented' },
        { status: 501 }
      );
    }

    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  } catch (error: unknown) {
    console.error('Error fetching invoice:', error);
    return NextResponse.json(
      { error: 'Failed to fetch invoice' },
      { status: 500 }
    );
  }
}

