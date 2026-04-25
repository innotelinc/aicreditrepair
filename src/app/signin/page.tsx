'use client';

import React from 'react';
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import { Shield, Lock, Mail, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <Card className="max-w-md w-full p-10 bg-white shadow-2xl rounded-3xl border-0">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-600/20">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Access your AI-powered credit repair dashboard</p>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col gap-3">
            <SignInButton mode="modal">
              <Button className="w-full py-6 text-lg font-semibold bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center gap-2">
                Sign In with Clerk <ArrowRight className="w-5 h-5" />
              </Button>
            </SignInButton>
            
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-400 font-medium">Or create an account</span>
              </div>
            </div>

            <SignUpButton mode="modal">
              <Button variant="outline" className="w-full py-6 text-lg font-semibold border-gray-200 hover:bg-gray-50 rounded-xl">
                Create Free Account
              </Button>
            </SignUpButton>
          </div>

          <div className="pt-8 flex items-center justify-center gap-2 text-sm text-gray-400">
            <Lock className="w-3 h-3" />
            <span>Bank-level AES-256 encryption active</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
