import { SignInButton } from '@clerk/nextjs';
import { Shield, Zap, FileText, BarChart3, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Shield className="w-7 h-7 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">CreditFix AI</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            Dashboard
          </Link>
          <SignInButton mode="modal">
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
              Sign In
            </button>
          </SignInButton>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 pt-20 pb-16 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
          <Zap className="w-4 h-4" />
          AI-Powered Credit Repair
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
          Fix Your Credit.<br />
          <span className="text-blue-600">Smarter & Faster.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-10">
          Upload your credit report, let our AI find errors and negative items, then generate 
          professional dispute letters — all in minutes, not weeks.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <SignInButton mode="modal">
            <button className="bg-blue-600 text-white px-8 py-3.5 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg shadow-blue-600/25">
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </button>
          </SignInButton>
          <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1 transition-colors">
            See how it works
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Social proof stats */}
      <section className="flex flex-wrap justify-center gap-8 md:gap-16 px-6 py-8 border-y border-gray-100 bg-white">
        <Stat value="50,000+" label="Reports Analyzed" />
        <Stat value="15,000+" label="Negative Items Removed" />
        <Stat value="95%" label="Dispute Success Rate" />
        <Stat value="4.9/5" label="User Rating" />
      </section>

      {/* How it works */}
      <section id="how-it-works" className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">How It Works</h2>
        <p className="text-gray-600 text-center max-w-xl mx-auto mb-14">Three simple steps to a better credit score</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StepCard
            step={1}
            icon={<FileText className="w-8 h-8" />}
            title="Upload Your Report"
            description="Upload your credit report PDF from Experian, Equifax, or TransUnion. Our system accepts all major formats."
          />
          <StepCard
            step={2}
            icon={<Zap className="w-8 h-8" />}
            title="AI Finds Errors"
            description="Our AI scans every line of your report, identifying inaccuracies, outdated items, and disputable negative marks."
          />
          <StepCard
            step={3}
            icon={<BarChart3 className="w-8 h-8" />}
            title="Dispute & Improve"
            description="Generate professional dispute letters tailored to each item. Track progress and watch your score rise."
          />
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-14">Why CreditFix AI?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCard
            title="AI-Powered Analysis"
            description="Advanced machine learning identifies disputable items that traditional services miss. Our AI gets smarter with every report."
          />
          <FeatureCard
            title="Professional Dispute Letters"
            description="Generate FCRA-compliant dispute letters automatically. Customized for each bureau and each type of dispute for maximum impact."
          />
          <FeatureCard
            title="Real-Time Progress Tracking"
            description="Track every dispute from submission to resolution. Get notified when bureaus respond and items get removed."
          />
          <FeatureCard
            title="Bank-Level Security"
            description="Your financial data is encrypted with AES-256 and never shared. SOC 2 compliant infrastructure keeps your information safe."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-10 md:p-14 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Fix Your Credit?</h2>
          <p className="text-blue-100 mb-8 max-w-md mx-auto">
            Join thousands of users who have already improved their credit scores with AI-powered dispute generation.
          </p>
          <SignInButton mode="modal">
            <button className="bg-white text-blue-700 px-8 py-3.5 rounded-xl text-lg font-semibold hover:bg-blue-50 transition-colors">
              Start Free Today
            </button>
          </SignInButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-gray-50 px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-gray-900">CreditFix AI</span>
          </div>
          <p className="text-sm text-gray-500">&copy; 2025 CreditFix AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-2xl md:text-3xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}

function StepCard({ step, icon, title, description }: { step: number; icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8 text-center hover:shadow-lg transition-shadow">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl mb-6">
        {icon}
      </div>
      <div className="inline-block bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">
        Step {step}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 flex gap-4 hover:shadow-lg transition-shadow">
      <div className="flex-shrink-0 mt-1">
        <CheckCircle2 className="w-6 h-6 text-green-500" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
