import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const reports = await prisma.creditReport.findMany({
      include: { user: true, items: true },
      orderBy: { pulledAt: 'desc' }
    });
    return NextResponse.json(reports);
  } catch (error) {
    console.error('Admin reports error:', error);
    return NextResponse.json({ error: 'Failed to fetch reports' }, { status: 500 });
  }
}
