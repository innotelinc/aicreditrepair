import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // 1. Save file to secure storage (S3 in Production)
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `reports/${Date.now()}-${file.name}`;
    // In real prod: await s3.putObject({ Bucket: 'reports', Key: fileName, Body: buffer }).promise();
    
    // 2. Trigger Analysis Engine (Textract/LLM)
    const extractedData = await analyzeReport(buffer);

    // 3. Write to Database
    const report = await prisma.creditReport.create({
      data: {
        userId: 'mock-user-id', // In production, get from Clerk auth()
        bureau: 'ALL',
        rawData: extractedData as any,
        items: {
          create: extractedData.items
        }
      }
    });

    return NextResponse.json({ success: true, reportId: report.id });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to process report' }, { status: 500 });
  }
}

async function analyzeReport(buffer: Buffer) {
  return {
    bureau: 'All',
    score: 620,
    items: [
      {
        accountName: 'Chase Collections',
        accountNumberMasked: 'XXXX-1234',
        status: 'Collection',
        balance: 450.00,
        dateReported: new Date(),
        category: 'COLLECTION' as const,
        isDisputed: false,
      },
      {
        accountName: 'T-Mobile',
        accountNumberMasked: 'XXXX-5678',
        status: 'Late Payment',
        balance: 120.00,
        dateReported: new Date(),
        category: 'LATE_PAYMENT' as const,
        isDisputed: false,
      },
      {
        accountName: 'Hard Inquiry',
        accountNumberMasked: 'N/A',
        status: 'Inquiry',
        balance: 0,
        dateReported: new Date(),
        category: 'INQUIRY' as const,
        isDisputed: false,
      }
    ]
  };
}
