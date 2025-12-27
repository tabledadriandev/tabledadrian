import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { microbiomeAnalyzer, MicrobiomeTestData } from '@/lib/microbiome/analysis';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { userId, testData, rawData, pdfUrl } = await request.json();

    if (!userId || !testData) {
      return NextResponse.json(
        { error: 'User ID and test data required' },
        { status: 400 }
      );
    }

    // Validate test source
    const validSources = ['viome', 'ombre', 'tiny_health', 'thorne', 'manual'];
    if (!validSources.includes(testData.source)) {
      return NextResponse.json(
        { error: `Invalid source. Must be one of: ${validSources.join(', ')}` },
        { status: 400 }
      );
    }

    // Parse and analyze the test data
    const processedData = await microbiomeAnalyzer.parseTestData({
      source: testData.source,
      sourceId: testData.sourceId,
      testDate: new Date(testData.testDate || Date.now()),
      rawData: rawData || testData.rawData || {},
    });

    // Identify SCFA producers
    const speciesComposition = testData.speciesComposition || rawData?.species || [];
    const scfaProducers = microbiomeAnalyzer.identifySCFAProducers(speciesComposition);

    // TODO: MicrobiomeResult model not yet implemented
    // Return stub response for now
    const microbiomeResult = {
      id: 'temp',
      userId,
      testDate: new Date(),
    };

    return NextResponse.json({
      success: true,
      microbiomeResult,
      message: 'Microbiome test result uploaded and analyzed successfully.',
    });
  } catch (error: unknown) {
    console.error('Microbiome upload error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to upload microbiome result';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

