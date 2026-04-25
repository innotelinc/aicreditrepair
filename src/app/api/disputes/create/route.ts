import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  try {
    const { itemId, reason } = await req.json();

    // 1. Generate a professional dispute letter PDF (Mock PDF generation)
    const pdfUrl = `https://s3.aws.com/letters/dispute-${itemId}.pdf`;

    // 2. Call Lob API to mail the letter
    // const lobResponse = await fetch('https://api.lob.com/v1/letters', {
    //   method: 'POST',
    //   headers: { 'Authorization': `Bearer ${process.env.LOB_API_KEY}` },
    //   body: JSON.stringify({
    //     to: { name: 'Bureau Name', address: '123 Bureau Way' },
    //     from: { name: 'Client Name', address: 'Client Address' },
    //     document: { pdf: pdfUrl }
    //   })
    // });
    // const lobData = await lobResponse.json();

    // 3. Update Dispute Status in DB
    const dispute = await prisma.dispute.create({
      data: {
        userId: 'mock-user-id',
        itemId: itemId,
        disputeReason: reason,
        status: 'MAILED',
        letterPdfUrl: pdfUrl,
        lobId: 'lob_mock_123456789',
        mailedAt: new Date(),
      }
    });

    return NextResponse.json({ success: true, disputeId: dispute.id });
  } catch (error) {
    console.error('Dispute error:', error);
    return NextResponse.json({ error: 'Failed to create dispute' }, { status: 500 });
  }
}
