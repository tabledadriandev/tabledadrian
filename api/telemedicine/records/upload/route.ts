import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, title, description, fileUrl, providerId } = body;

    if (!userId || !title) {
      return NextResponse.json(
        { error: 'userId and title are required' },
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
    const record = await prisma.medicalResult.create({
      data: {
        userId: user.id,
        pdfUrl: fileUrl ?? null,
        extractedData: {},
        biomarkers: {},
        testDate: new Date(),
        testType: 'general',
        labName: description ?? null,
        doctorNotes: description ?? null,
      },
    });

    return NextResponse.json({ success: true, record });
  } catch (error: unknown) {
    console.error('Error uploading medical record:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to upload record';
    return NextResponse.json(
      { error: 'Failed to upload record', details: errorMessage },
      { status: 500 },
    );
  }
}


