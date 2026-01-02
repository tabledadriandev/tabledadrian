import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');

    if (!address) {
      return NextResponse.json({ error: 'Address required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { walletAddress: address },
      include: { dataLicenseOptIn: true },
    });

    if (!user) {
      return NextResponse.json({ optedIn: false, dataTypes: [] });
    }

    const optIn = user.dataLicenseOptIn;
    return NextResponse.json({
      optedIn: optIn?.optedIn ?? false,
      dataTypes: optIn?.licenseType ? [optIn.licenseType] : [],
      optedInAt: optIn?.createdAt ?? null,
    });
  } catch (error: unknown) {
    console.error('Error fetching opt-in status:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch opt-in status';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { address, optedIn, licenseType } = await request.json();

    if (!address) {
      return NextResponse.json({ error: 'Address required' }, { status: 400 });
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { walletAddress: address },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { walletAddress: address },
      });
    }

    // Upsert opt-in record
    const optIn = await prisma.dataLicenseOptIn.upsert({
      where: { userId: user.id },
      update: {
        optedIn: optedIn === true,
        licenseType: licenseType || null,
      },
      create: {
        userId: user.id,
        optedIn: optedIn === true,
        licenseType: licenseType || null,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        optedIn: optIn.optedIn,
        licenseType: optIn.licenseType,
        optedInAt: optIn.createdAt,
      },
    });
  } catch (error: unknown) {
    console.error('Error updating opt-in:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to update opt-in';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

