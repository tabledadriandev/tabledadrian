import { NextRequest, NextResponse } from 'next/server';

// Minimal session API to keep auth flows working on Vercel Hobby.
// The full implementation is preserved in `api_disabled/api/auth/session/route.ts`.

export async function GET(req: NextRequest) {
  // For now, just indicate that the detailed session API is disabled.
  // Frontend should gracefully handle a missing/invalid session response.
  return NextResponse.json(
    {
      authenticated: false,
      message: 'Session API is temporarily limited on the Hobby deployment.',
    },
    { status: 200 },
  );
}
