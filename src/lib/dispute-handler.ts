import { prisma } from '@/lib/prisma';
import { generateDisputeLetter } from '@/lib/letter-gen';

export async function createDispute(itemId: string, reason: string, userId: string) {
  // 1. Generate the PDF letter using our template system
  const pdfUrl = await generateDisputeLetter(itemId, reason);

  // 2. Save to Database
  const dispute = await prisma.dispute.create({
    data: {
      userId: userId,
      itemId: itemId,
      disputeReason: reason,
      status: 'MAILED',
      letterPdfUrl: pdfUrl,
      lobId: 'lob_mock_123456789', // Real integration would use Lob API
      mailedAt: new Date(),
    }
  });

  return dispute;
}
