import { NextResponse } from 'next/server';
import { getAnalysis } from '@/lib/ai-analysis';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const reportId = searchParams.get('reportId');

  if (!reportId) {
    return NextResponse.json({ error: 'Report ID is required' }, { status: 400 });
  }

  try {
    const analysis = await getAnalysis(reportId);
    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Analysis fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch analysis' }, { status: 500 });
  }
}
