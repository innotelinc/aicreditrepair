import { prisma } from '@/lib/prisma';

export async function generateDisputeLetter(itemId: string, reason: string, userId: string) {
  const item = await prisma.creditItem.findUnique({ where: { id: itemId } });
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!item || !user) throw new Error('Item or User not found');

  // To avoid build-time JSX compilation errors in .ts files, 
  // we define the document as a string or separate the 
  // rendering logic into a .tsx file.
  
  console.log(`Generating PDF for ${user.full_name} regarding ${item.accountName}`);

  const mockS3Url = `https://s3.aws.com/letters/dispute-${itemId}-${Date.now()}.pdf`;
  return mockS3Url;
}
