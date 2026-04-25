'use client';

import React, { useState } from 'react';
import { CreditCard, CheckCircle2, Lock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function PricingPage() {
  const [billingState, setBillingState] = useState<'idle' | 'processing' | 'success'>('idle');

  const handleSubscribe = async () => {
    setBillingState('processing');
    try {
      const res = await fetch('/api/billing/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: 'user@example.com', 
          paymentMethodId: 'pm_card_visa' 
        }),
      });
      const data = await res.json();
      if (data.success) setBillingState('success');
    } catch (e) {
      alert('Payment failed');
      setBillingState('idle');
    }
  };

  if (billingState === 'success') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
        <Card className="max-w-md w-full p-12 text-center bg-white shadow-xl rounded-3xl border-0">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">You're All Set!</h1>
          <p className="text-gray-600 mb-10">Your subscription is now active. You can now upload and dispute as many items as you need.</p>
          <Button asChild className="w-full py-6 text-lg font-semibold bg-blue-600 hover:bg-blue-700 rounded-xl">
            <Link href="/dashboard">Go to Analysis Dashboard</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
            Get Your Credit <br />
            <span className="text-blue-600">Back to Green.</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Unlimited AI analysis and professional dispute letter generation. 
            Remove negative items and watch your score climb.
          </p>
          <div className="flex flex-col gap-4 pt-4">
            <div className="flex items-center gap-3 text-gray-700 font-medium">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>Unlimited AI Report Scanning</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700 font-medium">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>Professional FCRA-Compliant Letters</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700 font-medium">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>Direct Integration with Mailing Services</span>
            </div>
          </div>
        </div>

        <Card className="bg-white shadow-2xl rounded-3xl p-8 border-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-blue-600 text-white px-6 py-2 rounded-bl-2xl text-xs font-bold uppercase tracking-widest">
            Best Value
          </div>
          <div className="mb-8">
            <span className="text-gray-500 text-sm font-medium">Monthly Plan</span>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black text-gray-900">$49</span>
              <span className="text-gray-500">/mo</span>
            </div>
          </div>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Zap className="w-4 h-4 text-blue-500" />
              <span>Instant AI Processing</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Lock className="w-4 h-4 text-blue-500" />
              <span>Encrypted Data Storage</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <CreditCard className="w-4 h-4 text-blue-500" />
              <span>Secure Stripe Payments</span>
            </div>
          </div>

          <Button 
            onClick={handleSubscribe}
            disabled={billingState === 'processing'}
            className="w-full py-8 text-xl font-bold bg-blue-600 hover:bg-blue-700 rounded-2xl transition-all"
          >
            {billingState === 'processing' ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </div>
            ) : (
              'Activate Subscription'
            )}
          </Button>
          <p className="text-center text-gray-400 text-xs mt-4">
            Secure payment processed by Stripe. Cancel anytime.
          </p>
        </Card>
      </div>
    </div>
  );
}
