import { NextRequest, NextResponse } from 'next/server'
import logger from '@/lib/logger'

/**
 * 로그 테스트.
 * GET /api/v1/test/log
 */
export async function GET(req: NextRequest) {
  logger.info('test')
  return NextResponse.json({ message: 'test' })
}
