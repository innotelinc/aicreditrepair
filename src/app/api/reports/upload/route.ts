import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { analyzeReport } from '@/lib/ai-analysis';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // 1. Extract and Analyze using Ollama
    const buffer = Buffer.from(await file.arrayBuffer());
    const analysisResults = await analyzeReport(buffer);
    
    // 2. Create Report in Database
    const report = await prisma.creditReport.create({
      data: {
        userId: 'mock-user-id', // In production, replace with Clerk auth() userId
        bureau: 'ALL',
        rawData: analysisResults as any,
        items: {
          create: analysisResults
        }
      }
    });

    return NextResponse.json({ 
      success: true, 
      reportId: report.id, 
      analysis: analysisResults 
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to process report' }, { status: 500 });
  }
}
