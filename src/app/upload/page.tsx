'use client';

import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [reportId, setReportId] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/reports/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setReportId(data.reportId);
      } else {
        alert('Upload failed: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      alert('Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  if (reportId) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
        <Card className="max-w-md w-full p-8 text-center bg-white shadow-xl rounded-2xl border-0">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Report Analyzed!</h1>
          <p className="text-gray-600 mb la-8">Our AI has scanned your report and found disputable items.</p>
          <Link href={`/dashboard?reportId=${reportId}`}>
            <Button className="w-full py-6 text-lg font-semibold bg-blue-600 hover:bg-blue-700 rounded-xl">
              View Analysis & Start Disputes
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
      <div className="max-w-2xl w-full text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Upload Your Credit Report</h1>
        <p className="text-gray-600 text-lg">
          Upload your PDF report from Experian, Equifax, or TransUnion. 
          Our AI will instantly find errors.
        </p>
      </div>

      <Card className="max-w-xl w-full p-8 bg-white shadow-xl rounded-2xl border-0">
        <div 
          className={`border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center transition-colors ${
            file ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
          }`}
        >
          <Upload className={`w-12 h-12 mb-4 ${file ? 'text-blue-600' : 'text-gray-400'}`} />
          <p className="text-gray-600 mb-6">
            {file ? `Selected: ${file.name}` : 'Drag and drop your PDF here or click to browse'}
          </p>
          <input 
            type="file" 
            accept=".pdf" 
            onChange={handleFileChange} 
            className="hidden" 
            id="file-upload" 
          />
          <Button 
            variant="outline" 
            onClick={() => document.getElementById('file-upload')?.click()}
            className="px-8 py-2 rounded-lg"
          >
            Browse Files
          </Button>
        </div>

        <div className="mt-8 flex flex-col gap-4">
          <Button 
            onClick={handleUpload} 
            disabled={!file || uploading}
            className="w-full py-6 text-lg font-semibold bg-blue-600 hover:bg-blue-700 rounded-xl"
          >
            {uploading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                AI is analyzing your report...
              </>
            ) : (
              'Start AI Analysis'
            )}
          </Button>
          
          <div className="flex items-center gap-2 text-sm text-gray-500 justify-center">
            <AlertCircle className="w-4 h-4" />
            <span>Your data is encrypted and secure.</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
