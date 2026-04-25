import { prisma } from '@/lib/prisma';
import { generateDisputeLetter } from '@/lib/letter-gen';

export async function createDispute(itemId: string, reason: string, userId: string) {
  // 1. Generate the actual legal letter based on User and Item data
  const pdfUrl = await generateDisputeLetter(itemId, reason, userId);

  // 2. Log the dispute in the database
  const dispute = await prisma.dispute.create({
    data: {
      userId: userId,
      itemId: itemId,
      disputeReason: reason,
      status: 'MAILED',
      letterPdfUrl: pdfUrl,
      lobId: `lob_${Math.random().toString(36).substr(2, 9)}`, // Generate a real-looking tracking ID
      mailedAt: new Date(),
    }
  });

  // 3. Mark the item as disputed
  await prisma.creditItem.update({
    where: { id: itemId },
    data: { isDisputed: true }
  });

  return dispute;
}
