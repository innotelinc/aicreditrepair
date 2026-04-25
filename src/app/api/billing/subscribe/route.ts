import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { email, paymentMethodId } = await req.json();

    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: { 
          email, 
          full_name: 'New User', 
          address: 'N/A', 
          ssn_encrypted: 'N/A', 
          dob: new Date(), 
          subscriptionStatus: 'CANCELED' 
        }
      });
    }

    const mockCustomerId = 'cus_mock_123456789';

    const subscription = await stripe.subscriptions.create({
      customer: mockCustomerId,
      items: [{ price: 'price_H123456789' }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { subscriptionStatus: 'ACTIVE' }
    });

    return NextResponse.json({ success: true, subscriptionId: subscription.id });
  } catch (error) {
    console.error('Billing error:', error);
    return NextResponse.json({ error: 'Payment failed' }, { status: 500 });
  }
}
