import { NextRequest, NextResponse } from 'next/server'

/**
 * 헬스 체크.
 * GET /api/v1/healthcheck
 */
export async function GET(req: NextRequest) {
  return NextResponse.json({ message: 'ok' })
}
