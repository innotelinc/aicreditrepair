'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Shield, Trash2, FileText, CheckCircle2, ArrowRight, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAnalysis } from '@/lib/ai-analysis'; // This is a client-side call in our design, so we need a wrapper

async function fetchAnalysis(reportId: string) {
  const res = await fetch(`/api/analysis?reportId=${reportId}`);
  if (!res.ok) throw new Error('Failed to fetch analysis');
  return res.json();
}

export default function Dashboard() {
  const searchParams = useSearchParams();
  const reportId = searchParams.get('reportId');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [disputeId, setDisputeId] = useState<string | null>(null);

  useEffect(() => {
    if (reportId) {
      fetch('/api/analysis?reportId=' + reportId)
        .then(res => res.json())
        .then(data => {
          setItems(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [reportId]);

  const handleDispute = async (item: any) => {
    try {
      const res = await fetch('/api/disputes/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          itemId: item.id, 
          reason: item.suggestedReason 
        }),
      });
      const data = await res.json();
      if (data.success) {
        setDisputeId(data.disputeId);
        // Update items to mark this one as disputed
        setItems(prev => prev.map(i => i.id === item.id ? { ...i, isDisputed: true } : i));
      }
    } catch (e) {
      alert('Dispute failed');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Processing your credit report...</p>
        </div>
      </div>
    );
  }

  if (!reportId) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
        <Card className="max-w-md w-full p-8 text-center bg-white shadow-xl rounded-2xl border-0">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-900 mb-2">No Report Selected</h1>
          <p className="text-gray-600 mb-6">Please upload a report to start the analysis.</p>
          <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
            <Link href="/upload">Upload Report Now</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI Analysis Dashboard</h1>
            <p className="text-gray-600">Review the items identified by our AI and start the dispute process.</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="px-4 py-1 text-sm font-medium text-gray-600 bg-white border-gray-200">
              Bureau: ALL
            </Badge>
            <Badge className="px-4 py-1 text-sm font-medium text-white bg-blue-600">
              Status: Analysis Complete
            </Badge>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Item List */}
          <div className="lg:col-span-2 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No negative items found in your report. Your credit looks clean!</p>
              </div>
            ) : (
              items.map((item: any) => (
                <Card key={item.id} className="p-6 bg-white shadow-sm rounded-xl border border-gray-100 hover:border-blue-300 transition-all">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${
                        item.category === 'COLLECTION' ? 'bg-red-100 text-red-600' : 
                        item.category === 'LATE_PAYMENT' ? 'bg-orange-100 text-orange-600' : 
                        'bg-blue-100 text-blue-600'
                      }`}>
                        <Shield className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{item.accountName}</h3>
                        <p className="text-sm text-gray-500 font-mono">{item.accountNumberMasked}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                          <Badge variant="outline" className="text-xs">{item.status}</Badge>
                          <Badge variant="outline" className="text-xs text-blue-600 font-semibold">
                            ${item.balance}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {item.isDisputed ? (
                        <div className="flex items-center gap-2 text-green-600 font-semibold text-sm">
                          <CheckCircle2 className="w-4 h-4" />
                          Dispute Sent
                        </div>
                      ) : (
                        <Button 
                          onClick={() => handleDispute(item)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                        >
                          Dispute This Item
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-50">
                    <div className="flex items-start gap-3 bg-blue-50 p-3 rounded-lg">
                      <div className="p-1 bg-blue-100 rounded-full">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">AI Suggested Reason</p>
                        <p className="text-sm text-blue-900 leading-relaxed">
                          {item.suggestedReason || "Based on the report, this item is disputable due to incorrect balance or lack of verification."}
                        </p>
                        <p className="text-[10px] text-blue-500 mt-1 font-medium">
                          AI Confidence: {(item.aiConfidence * 100).toFixed(0)}%
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Side Panel: Summary & Stats */}
          <div className="space-y-6">
            <Card className="p-6 bg-white shadow-sm rounded-xl border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Report Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Negative Items</span>
                  <span className="font-bold text-gray-900">{items.length}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Potential Gain</span>
                  <span className="font-bold text-green-600">+$40-100 pts</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">AI Accuracy</span>
                  <span className="font-bold text-blue-600">94%</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-blue-600 text-white shadow-lg rounded-xl border-0">
              <h2 className="text-lg font-bold mb-2">Pro Tip</h2>
              <p className="text-blue-100 text-sm leading-relaxed mb-4">
                Disputing items with "Incorrect Balance" usually has the highest success rate for rapid score increases.
              </p>
              <Button variant="secondary" className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold">
                Learn More
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
