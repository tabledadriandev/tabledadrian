import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, ...assessmentData } = body;

    // Find or create user
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { walletAddress: userId },
          { email: userId },
        ],
      },
    });

    if (!user) {
      // Create user if doesn't exist
      user = await prisma.user.create({
        data: {
          walletAddress: userId.startsWith('0x') ? userId : `0x${Buffer.from(userId).toString('hex').slice(0, 40).padStart(40, '0')}`,
          email: userId.includes('@') ? userId : null,
          username: userId.includes('@') ? userId.split('@')[0] : null,
        },
      });
    }

    // TODO: HealthAssessment model not yet implemented in schema
    // Store assessment data in user preferences or create a JSON record
    const assessment = {
      userId: user.id,
      chronicConditions: assessmentData.chronicConditions || [],
      pastSurgeries: assessmentData.pastSurgeries || [],
      currentMedications: assessmentData.currentMedications || [],
      familyHistory: assessmentData.familyHistory || [],
      sleepHours: assessmentData.sleepHours,
      stressLevel: assessmentData.stressLevel,
      exerciseFrequency: assessmentData.exerciseFrequency,
      exerciseType: assessmentData.exerciseType || [],
      mealFrequency: assessmentData.mealFrequency,
      foodGroups: assessmentData.foodGroups || [],
      dietaryRestrictions: assessmentData.dietaryRestrictions || [],
      waterIntake: assessmentData.waterIntake,
      anxietyLevel: assessmentData.anxietyLevel,
      depressionIndicators: assessmentData.depressionIndicators || [],
      moodStability: assessmentData.moodStability,
      currentSymptoms: assessmentData.currentSymptoms || [],
      symptomSeverity: assessmentData.symptomSeverity || [],
      concerns: assessmentData.concerns || [],
      heartDiseaseRisk: assessmentData.heartDiseaseRisk,
      diabetesRisk: assessmentData.diabetesRisk,
      hypertensionRisk: assessmentData.hypertensionRisk,
      strokeRisk: assessmentData.strokeRisk,
      metabolicSyndromeRisk: assessmentData.metabolicSyndromeRisk,
      overallRiskScore: assessmentData.overallRiskScore,
      healthProfile: {
        assessmentDate: new Date().toISOString(),
        summary: 'Comprehensive health assessment completed',
      },
      recommendations: generateRecommendations(assessmentData),
    };

    // Generate initial health score
    const healthScore = await calculateHealthScore(user.id, assessment);

    return NextResponse.json({
      success: true,
      assessment,
      riskScores: {
        heartDiseaseRisk: assessment.heartDiseaseRisk,
        diabetesRisk: assessment.diabetesRisk,
        hypertensionRisk: assessment.hypertensionRisk,
        strokeRisk: assessment.strokeRisk,
        metabolicSyndromeRisk: assessment.metabolicSyndromeRisk,
        overallRiskScore: assessment.overallRiskScore,
      },
      healthScore,
    });
  } catch (error: unknown) {
    console.error('Assessment error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to save assessment';
    return NextResponse.json(
      { error: 'Failed to save assessment', details: errorMessage },
      { status: 500 }
    );
  }
}

function generateRecommendations(data: Record<string, unknown>): string[] {
  const recommendations: string[] = [];

  const heartDiseaseRisk = data.heartDiseaseRisk as number | undefined;
  if (heartDiseaseRisk && heartDiseaseRisk > 30) {
    recommendations.push('Consider regular cardiovascular monitoring');
    recommendations.push('Increase physical activity to reduce heart disease risk');
  }

  const diabetesRisk = data.diabetesRisk as number | undefined;
  if (diabetesRisk && diabetesRisk > 30) {
    recommendations.push('Monitor blood glucose levels regularly');
    recommendations.push('Focus on whole grains and reduce refined sugars');
  }

  const stressLevel = data.stressLevel as number | undefined;
  if (stressLevel && stressLevel > 7) {
    recommendations.push('Implement stress management techniques (meditation, yoga)');
    recommendations.push('Ensure adequate sleep (7-9 hours per night)');
  }

  const exerciseFrequency = data.exerciseFrequency as string | undefined;
  if (!exerciseFrequency || exerciseFrequency === 'rarely' || exerciseFrequency === 'never') {
    recommendations.push('Start with 30 minutes of moderate exercise 3x per week');
  }

  const sleepHours = data.sleepHours as number | undefined;
  if (sleepHours && sleepHours < 7) {
    recommendations.push('Aim for 7-9 hours of quality sleep per night');
  }

  const foodGroups = data.foodGroups as unknown[] | undefined;
  if (foodGroups && foodGroups.length < 4) {
    recommendations.push('Diversify your diet to include more food groups');
  }

  return recommendations;
}

async function calculateHealthScore(userId: string, assessment: Record<string, unknown>) {
  // Calculate comprehensive health score
  let score = 100;

  // Deduct points based on risk factors
  const overallRiskScore = assessment.overallRiskScore as number | undefined;
  if (overallRiskScore) {
    score -= overallRiskScore * 0.5;
  }

  // Lifestyle factors
  const sleepHours = assessment.sleepHours as number | undefined;
  const stressLevel = assessment.stressLevel as number | undefined;
  const exerciseFrequency = assessment.exerciseFrequency as string | undefined;
  const foodGroups = assessment.foodGroups as unknown[] | undefined;
  
  if (sleepHours && sleepHours < 7) score -= 10;
  if (stressLevel && stressLevel > 7) score -= 10;
  if (exerciseFrequency === 'rarely' || exerciseFrequency === 'never') score -= 15;
  if (foodGroups && foodGroups.length < 4) score -= 10;

  // Mental health
  const anxietyLevel = assessment.anxietyLevel as number | undefined;
  const depressionIndicators = assessment.depressionIndicators as unknown[] | undefined;
  if (anxietyLevel && anxietyLevel > 7) score -= 10;
  if (depressionIndicators && depressionIndicators.length > 3) score -= 15;

  const overallScore = Math.max(0, Math.min(100, score));
  
  // Calculate category scores
  const heartDiseaseRisk = assessment.heartDiseaseRisk as number | undefined;
  const diabetesRisk = assessment.diabetesRisk as number | undefined;
  const cardiovascularScore = Math.max(0, 100 - (heartDiseaseRisk || 0));
  const metabolicScore = Math.max(0, 100 - (diabetesRisk || 0));
  const mentalWellnessScore = Math.max(0, 100 - ((anxietyLevel || 0) * 5 + (depressionIndicators?.length || 0) * 5));
  const physicalFitnessScore = exerciseFrequency === 'daily' ? 90 : exerciseFrequency === 'weekly' ? 70 : 50;
  const nutritionScore = foodGroups && foodGroups.length >= 6 ? 90 : foodGroups && foodGroups.length >= 4 ? 70 : 50;
  const sleepScore = sleepHours && sleepHours >= 7 && sleepHours <= 9 ? 90 : sleepHours && sleepHours >= 6 && sleepHours <= 10 ? 70 : 50;

  // HealthScore model only has: id, userId, score, factors, calculatedAt, createdAt, updatedAt
  const healthScore = await prisma.healthScore.create({
    data: {
      userId,
      score: overallScore,
      factors: {
        cardiovascularScore,
        metabolicScore,
        mentalWellnessScore,
        physicalFitnessScore,
        nutritionScore,
        sleepScore,
        riskFactors: overallRiskScore,
        lifestyle: {
          sleep: sleepHours,
          exercise: exerciseFrequency,
          stress: stressLevel,
        },
      },
    },
  });

  return healthScore;
}

