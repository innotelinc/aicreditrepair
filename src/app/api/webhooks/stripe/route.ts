import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma'; // Assuming prisma client is initialized here

export async function POST(req: Request) {
  const payload = await req.json();
  const sig = req.headers.get('stripe-signature');

  let event;

  try {
    // In a real app, you'd verify the signature using stripe.webhooks.constructEvent
    event = payload; 
  } catch (err) {
    return new NextResponse('Webhook Error', { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      const userId = session.client_reference_id;
      
      // Update user subscription status in DB
      await prisma.user.update({
        where: { id: userId },
        data: { subscriptionStatus: 'ACTIVE' },
      });
      break;

    case 'customer.subscription.deleted':
      const subscription = event.data.object;
      // Logic to find user by stripe customer ID and set status to CANCELED
      break;
  }

  return NextResponse.json({ received: true });
}
