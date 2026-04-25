import { NextResponse } from 'next/server';
import { createDispute } from '@/lib/dispute-handler';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { itemId, reason } = await req.json();
    
    // In production, replace with: const { userId } = await auth();
    const userId = 'mock-user-id'; 
    
    const dispute = await createDispute(itemId, reason, userId);
    
    return NextResponse.json({ 
      success: true, 
      disputeId: dispute.id,
      pdfUrl: dispute.letterPdfUrl
    });
  } catch (error) {
    console.error('Dispute creation error:', error);
    return NextResponse.json({ error: 'Failed to create dispute: ' + (error as Error).message }, { status: 500 });
  }
}
