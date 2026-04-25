'use client';

import React, { useEffect, useState } from 'react';
import { Shield, Users, FileText, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table } from '@/components/ui/table';

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'users' | 'reports'>('users');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const res = await fetch('/api/admin/users');
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 flex items-center gap-2 border-b border-slate-800">
          <Shield className="w-6 h-6 text-blue-400" />
          <span className="font-bold text-lg">Admin Panel</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Button 
            variant={activeTab === 'users' ? 'secondary' : 'ghost'} 
            className={`w-full justify-start gap-3 ${activeTab === 'users' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
            onClick={() => setActiveTab('users')}
          >
            <Users className="w-4 h-4" /> Users
          </Button>
          <Button 
            variant={activeTab === 'reports' ? 'secondary' : 'ghost'} 
            className={`w-full justify-start gap-3 ${activeTab === 'reports' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
            onClick={() => setActiveTab('reports')}
          >
            <FileText className="w-4 h-4" /> Reports
          </Button>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <Button variant="ghost" className="w-full justify-start gap-3 text-slate-400 hover:text-white hover:bg-slate-800">
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {activeTab === 'users' ? 'User Management' : 'Report Auditing'}
          </h1>
          <div className="flex items-center gap-3">
            <Badge className="bg-blue-600 text-white">Admin Mode</Badge>
          </div>
        </header>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          activeTab === 'users' ? (
            <Card className="bg-white shadow-sm rounded-xl border-0 overflow-hidden">
              <Table>
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left p-4 text-sm font-semibold text-gray-600">User</th>
                    <th className="text-left p-4 text-sm font-semibold text-gray-600">Status</th>
                    <th className="text-left p-4 text-sm font-semibold text-gray-600">Reports</th>
                    <th className="text-left p-4 text-sm font-semibold text-gray-600">Disputes</th>
                    <th className="text-right p-4 text-sm font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-900">{user.full_name}</span>
                          <span className="text-xs text-gray-500">{user.email}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant={user.subscriptionStatus === 'ACTIVE' ? 'default' : 'secondary'}>
                          {user.subscriptionStatus}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm text-gray-600">{user._count?.reports || 0}</td>
                      <td className="p-4 text-sm text-gray-600">{user._count?.disputes || 0}</td>
                      <td className="p-4 text-right">
                        <Button size="sm" variant="outline" className="text-xs">Edit Profile</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Report cards would go here similarly */}
              <div className="col-span-full text-center py-20 bg-white rounded-2xl border border-gray-200">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Report audit view is being populated...</p>
              </div>
            </div>
          )
        )}
      </main>
    </div>
  );
}
