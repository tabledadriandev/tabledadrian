import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

/**
 * GET /api/data-licensing/purchases
 * Lists data licensing purchases for research/admin console.
 */
export async function GET(request: NextRequest) {
  try {
    // TODO: DataLicensePurchase model not yet implemented in schema
    // Return empty array for now
    return NextResponse.json({ purchases: [] });
  } catch (error: unknown) {
    console.error('Error listing data license purchases:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to list data license purchases';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 },
    );
  }
}


