'use client';
import { useEffect, useState } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function ReportUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('idle'); // idle, uploading, parsing, complete

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    
    setUploading(true);
    setStage('uploading');
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress(prev => (prev < 90 ? prev + 10 : prev));
    }, 300);

    try {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);

      const res = await fetch('/api/reports/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setStage('parsing');
        // Simulate parsing time
        setTimeout(() => {
          clearInterval(interval);
          setProgress(100);
          setStage('complete');
        }, 2000);
      }
    } catch (err) {
      setStage('error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6">
      <Card className="border-2 border-dashed border-gray-300 bg-white">
        <CardContent className="flex flex-col items-center justify-center p-12 space-y-6">
          <div className="p-4 bg-blue-50 rounded-full text-blue-600">
            <Upload size={48} />
          </div>
          <div className="text-center">
            <CardTitle className="text-2xl mb-2">Upload Your Credit Report</CardTitle>
            <p className="text-gray-500">Upload your PDF report from Experian, Equifax, or TransUnion</p>
          </div>

          {stage === 'idle' && (
            <label className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all">
              Select PDF Report
              <input type="file" className="hidden" accept=".pdf" onChange={handleUpload} />
            </label>
          )}

          {stage === 'uploading' && (
            <div className="w-full max-w-xs space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading Report...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {stage === 'parsing' && (
            <div className="w-full max-w-xs space-y-2">
              <div className="flex justify-between text-sm">
                <span>AI is analyzing your report...</span>
                <span>Scanning...</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {stage === 'complete' && (
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="p-3 bg-green-100 text-green-600 rounded-full">
                <CheckCircle2 size={32} />
              </div>
              <div>
                <p className="font-bold text-lg">Analysis Complete!</p>
                <p className="text-gray-500 text-sm">We found items that can be disputed.</p>
              </div>
              <Button onClick={() => window.location.href = '/dashboard'}>
                Go to Dashboard
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
