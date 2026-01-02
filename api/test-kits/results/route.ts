import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { BiomarkerInterpretationModule } from '@/lib/ai-coach/modules';

export const dynamic = 'force-dynamic';

// POST: Upload test results
export async function POST(request: NextRequest) {
  try {
    const {
      userId,
      orderId,
      testType,
      testName,
      resultsData,
      provider,
      providerResultId,
      providerReportUrl,
      sampleCollectedAt,
      sampleReceivedAt,
      processingCompletedAt,
    } = await request.json();

    if (!userId || !testType || !resultsData) {
      return NextResponse.json(
        { error: 'User ID, test type, and results data are required' },
        { status: 400 }
      );
    }

    // Get user
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ walletAddress: userId }, { email: userId }],
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // TODO: TestOrder model not yet implemented - skipping order verification
    // if (orderId) {
    //   const order = await prisma.testOrder.findUnique({
    //     where: { id: orderId },
    //   });
    //   if (!order || order.userId !== user.id) {
    //     return NextResponse.json(
    //       { error: 'Invalid order reference' },
    //       { status: 400 }
    //     );
    //   }
    // }

    // Process results based on test type
    const biomarkerEntries = await processTestResults(testType, resultsData);

    // TODO: TestResult model not yet implemented, use MedicalResult instead
    const testResult = await prisma.medicalResult.create({
      data: {
        userId: user.id,
        testType,
        testDate: processingCompletedAt ? new Date(processingCompletedAt) : new Date(),
        extractedData: resultsData,
        biomarkers: biomarkerEntries ? (Array.isArray(biomarkerEntries) ? biomarkerEntries : {}) : {},
        labName: provider || null,
        doctorNotes: `Test: ${testName || `${testType} test`}`,
      },
    });

    // Create biomarker readings if processed
    if (biomarkerEntries && Array.isArray(biomarkerEntries)) {
      for (const entry of biomarkerEntries) {
        await prisma.biomarkerReading.create({
          data: {
            userId: user.id,
            metric: Object.keys(entry)[0] || 'unknown',
            value: Object.values(entry)[0] as number || 0,
            unit: 'unknown', // TODO: Extract unit from test results
            date: processingCompletedAt ? new Date(processingCompletedAt) : new Date(),
            source: 'lab',
          },
        });
      }
    }

    // Generate AI recommendations
    const recommendations = await generateRecommendations(testType, resultsData, biomarkerEntries);

    return NextResponse.json({
      success: true,
      testResult: {
        ...testResult,
        recommendations,
      },
      biomarkersCreated: biomarkerEntries?.length || 0,
      message: 'Test results uploaded and processed successfully',
    });
  } catch (error: unknown) {
    console.error('Upload test results error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to upload test results';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// GET: Get test results for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const testType = searchParams.get('testType');
    const orderId = searchParams.get('orderId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      );
    }

    const where: unknown = {};
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ walletAddress: userId }, { email: userId }],
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    where.userId = user.id;

    if (testType) {
      where.testType = testType;
    }

    if (orderId) {
      where.orderId = orderId;
    }

    // TODO: TestResult model not yet implemented, use MedicalResult instead
    const results = await prisma.medicalResult.findMany({
      where,
      orderBy: { testDate: 'desc' },
    });

    return NextResponse.json({
      success: true,
      results,
    });
  } catch (error: unknown) {
    console.error('Get test results error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to get test results';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

/**
 * Process test results and extract biomarker data
 */
async function processTestResults(testType: string, resultsData: any): Promise<any[] | null> {
  const biomarkerEntries: unknown[] = [];

  if (testType === 'blood') {
    // Process blood test results
    if (resultsData.bloodGlucose) {
      biomarkerEntries.push({
        bloodGlucose: parseFloat(resultsData.bloodGlucose),
      });
    }
    if (resultsData.cholesterolTotal) {
      biomarkerEntries.push({
        cholesterolTotal: parseFloat(resultsData.cholesterolTotal),
        cholesterolLDL: resultsData.cholesterolLDL ? parseFloat(resultsData.cholesterolLDL) : null,
        cholesterolHDL: resultsData.cholesterolHDL ? parseFloat(resultsData.cholesterolHDL) : null,
        triglycerides: resultsData.triglycerides ? parseFloat(resultsData.triglycerides) : null,
      });
    }
    if (resultsData.vitaminD) {
      biomarkerEntries.push({
        vitaminD: parseFloat(resultsData.vitaminD),
      });
    }
    if (resultsData.vitaminB12) {
      biomarkerEntries.push({
        vitaminB12: parseFloat(resultsData.vitaminB12),
      });
    }
    if (resultsData.testosterone) {
      biomarkerEntries.push({
        testosterone: parseFloat(resultsData.testosterone),
      });
    }
    if (resultsData.cortisol) {
      biomarkerEntries.push({
        cortisol: parseFloat(resultsData.cortisol),
      });
    }
    // Add more biomarker mappings as needed
  }

  return biomarkerEntries.length > 0 ? biomarkerEntries : null;
}

/**
 * Generate AI recommendations based on test results
 */
async function generateRecommendations(
  testType: string,
  resultsData: any,
  biomarkerEntries: unknown[] | null
): Promise<string[]> {
  const recommendations: string[] = [];

  // Use biomarker interpretation module if available
  if (biomarkerEntries && biomarkerEntries.length > 0) {
    try {
      const biomarkerModule = new BiomarkerInterpretationModule();
      const interpretation = await biomarkerModule.interpretLabResults(
        biomarkerEntries,
        {} // User context would be passed here
      );
      
      if (interpretation.recommendations) {
        recommendations.push(...interpretation.recommendations);
      }
    } catch (error) {
      console.error('Error generating AI recommendations:', error);
      // Fall through to basic recommendations
    }
  }

  // Basic recommendations if AI fails
  if (recommendations.length === 0) {
    recommendations.push('Review your test results with your healthcare provider.');
    recommendations.push('Continue tracking biomarkers to monitor trends over time.');
  }

  return recommendations;
}

