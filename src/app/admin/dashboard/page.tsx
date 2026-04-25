'use client';

import React, { useEffect, useState } from 'react';
import { Users, FileText, ShieldCheck, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [usersRes, reportsRes] = await Promise.all([
          fetch('/api/admin/users'),
          fetch('/api/admin/reports')
        ]);
        setUsers(await usersRes.json());
        setReports(await reportsRes.json());
      } catch (err) {
        console.error('Failed to load admin data', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50">Loading Admin Portal...</div>;

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">System Administration</h1>
            <p className="text-slate-500">Manage users, reports, and AI configurations.</p>
          </div>
          <Button variant="outline" onClick={() => window.location.href = '/admin/login'} className="gap-2">
            <LogOut className="w-4 h-4" /> Sign Out
          </Button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="p-6 bg-white rounded-2xl shadow-sm border-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <Users className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">User Management</h2>
            </div>
            <div className="space-y-4">
              {users.map((user: any) => (
                <div key={user.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-800">{user.full_name}</span>
                    <span className="text-xs text-slate-500">{user.email}</span>
                  </div>
                  <Badge variant="outline" className="text-[10px] font-bold uppercase">{user.role}</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-white rounded-2xl shadow-sm border-0 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                <FileText className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Recent Credit Reports</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-400 text-xs uppercase tracking-widest border-b border-slate-100">
                    <th className="pb-4 font-medium">User</th>
                    <th className="pb-4 font-medium">Bureau</th>
                    <th className="pb-4 font-medium">Items</th>
                    <th className="pb-4 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {reports.map((report: any) => (
                    <tr key={report.id} className="border-b border-slate-50 last:border-0">
                      <td className="py-4 font-medium text-slate-800">{report.user?.full_name || report.userId}</td>
                      <td className="py-4">
                        <Badge variant="secondary">{report.bureau}</Badge>
                      </td>
                      <td className="py-4">{report.items?.length || 0} items</td>
                      <td className="py-4 text-slate-500">{new Date(report.pulledAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="p-6 bg-blue-600 text-white rounded-2xl shadow-lg border-0 lg:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-6 h-6" />
              <h2 className="text-xl font-bold">System Health</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-blue-500/30 rounded-xl backdrop-blur-sm border border-blue-400/20">
                <p className="text-blue-100 text-xs uppercase font-bold mb-1">AI Domain</p>
                <p className="font-mono text-sm">llama.innotel.us</p>
              </div>
              <div className="p-4 bg-blue-500/30 rounded-xl backdrop-blur-sm border border-blue-400/20">
                <p className="text-blue-100 text-xs uppercase font-bold mb-1">DB Status</p>
                <p className="font-mono text-sm text-green-300">CONNECTED</p>
              </div>
              <div className="p-4 bg-blue-500/30 rounded-xl backdrop-blur-sm border border-blue-400/20">
                <p className="text-blue-100 text-xs uppercase font-bold mb-1">Build Mode</p>
                <p className="font-mono text-sm">Turbopack Production</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
