import { prisma } from '@/lib/prisma';

export async function getAnalysis(reportId: string) {
  const report = await prisma.creditReport.findUnique({
    where: { id: reportId },
    include: { items: true }
  });

  if (!report) return [];

  return report.items.map((item: any) => {
    // AI Ruleset for FCRA Errors
    let reason = "General inaccuracy";
    let confidence = 0.5;

    if (item.category === 'COLLECTION' && item.balance > 0) {
      reason = "Incorrect balance reporting or unverified debt";
      confidence = 0.85;
    } else if (item.category === 'INQUIRY') {
      reason = "Unauthorized hard inquiry";
      confidence = 0.9;
    } else if (item.category === 'LATE_PAYMENT') {
      reason = "Payment was made on time, reporting error";
      confidence = 0.7;
    }

    return {
      ...item,
      suggestedReason: reason,
      aiConfidence: confidence
    };
  });
}
