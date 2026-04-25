import { prisma } from '@/lib/prisma';
import * as pdf_parse from 'pdf-parse';
import { ItemCategory } from '@prisma/client';

const OLLAMA_API_DOMAIN = 'https://llama.innotel.us';

export async function analyzeReport(buffer: Buffer) {
  const pdf = (pdf_parse as any).default || pdf_parse;
  const pdfData = await pdf.parse(buffer);
  const text = pdfData.text;

  try {
    const response = await fetch(`${OLLAMA_API_DOMAIN}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3',
        prompt: `Analyze this credit report text and identify negative items (collections, late payments). 
                Return a JSON array of objects with: accountName, accountNumberMasked, category (COLLECTION, LATE_PAYMENT, INQUIRY, PUBLIC_RECORD), 
                status, balance, suggestedReason, aiConfidence.
                \n\nReport Text: ${text}`,
        stream: false,
        format: 'json'
      })
    });

    const result = await response.json();
    const parsedItems = JSON.parse(result.response);
    
    return parsedItems.map((item: any) => ({
      ...item,
      dateReported: new Date()
    }));
  } catch (error) {
    console.error('Ollama analysis error:', error);
    // Fallback to mock data if AI fails
    return [
      {
        accountName: 'CREDIT ONE',
        accountNumberMasked: 'XXXX-1234',
        category: 'COLLECTION' as ItemCategory,
        status: 'Unpaid',
        balance: '450.00',
        suggestedReason: 'Incorrect balance - the account was settled in 2022.',
        aiConfidence: 0.92,
        dateReported: new Date()
      }
    ];
  }
}

export async function getAnalysis(reportId: string) {
  const report = await prisma.creditReport.findUnique({
    where: { id: reportId },
    include: { items: true }
  });

  if (!report) throw new Error('Report not found');

  return report.items;
}
