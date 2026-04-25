import { NextResponse } from 'next/server';
import { createDispute } from '@/lib/dispute-handler';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { itemId, reason } = await req.json();
    
    // In real prod, use: const { userId } = await auth();
    const userId = 'mock-user-id'; 
    
    const dispute = await createDispute(itemId, reason, userId);
    
    return NextResponse.json({ 
      success: true, 
      disputeId: dispute.id 
    });
  } catch (error) {
    console.error('Dispute error:', error);
    return NextResponse.json({ error: 'Failed to create dispute' }, { status: 500 });
  }
}
