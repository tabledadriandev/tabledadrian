import { NextResponse } from 'next/server';

// Minimal stub API for Vercel Hobby deployment.
// The full implementation lives in `api_disabled/api/achievements/route.ts`.
// This keeps the route available without creating extra Vercel Serverless Functions.

export async function GET() {
  return NextResponse.json(
    {
      message:
        'Achievements API is temporarily disabled on the Hobby deployment.',
    },
    { status: 503 },
  );
}
