import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { email, paymentMethodId } = await req.json();

    // 1. Find or create user
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // In real app, this would be a full sign-up flow
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

    // 2. Create Stripe Subscription
    const subscription = await stripe.subscriptions.create({
      customer: user.stripeCustomerId, // Assume we have this stored
      items: [{ price: 'price_H123456789' }], // Replace with real Price ID from Stripe
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });

    // 3. Update User Status
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
