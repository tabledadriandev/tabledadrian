/**
 * API Route: List user's protocols
 */

import { NextRequest, NextResponse } from 'next/server';
import { createProtocolBuilder } from '@/lib/protocols/protocolBuilder';
import { getUserIdFromHeader } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const userId = getUserIdFromHeader(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'active';

    const builder = createProtocolBuilder();
    const protocols = await builder.getActiveProtocols(userId);

    return NextResponse.json({
      success: true,
      protocols,
    });
  } catch (error) {
    console.error('Protocol list error:', error);
    return NextResponse.json(
/**
 * API Route: List user's protocols
 */

import { NextRequest, NextResponse } from 'next/server';
import { createProtocolBuilder } from '@/lib/protocols/protocolBuilder';
import { getUserIdFromHeader } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const userId = getUserIdFromHeader(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'active';

    const builder = createProtocolBuilder();
    const protocols = await builder.getActiveProtocols(userId);

    return NextResponse.json({
      success: true,
      protocols,
    });
  } catch (error) {
    console.error('Protocol list error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Protocol list :';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
