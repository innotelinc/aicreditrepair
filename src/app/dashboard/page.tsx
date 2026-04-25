import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LayoutDashboard, CreditCard, Mail, Settings, User } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-blue-600">CreditFix AI</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <NavItem icon={<LayoutDashboard size={20} />} label="Overview" active />
          <NavItem icon={<CreditCard size={20} />} label="My Reports" />
          <NavItem icon={<Mail size={20} />} label="Disputes" />
          <NavItem icon={<User size={20} />} label="Profile" />
          <NavItem icon={<Settings size={20} />} label="Settings" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Dashboard Overview</h2>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-green-100 text-green-700">Subscription: Active</Badge>
            <div className="w-10 h-10 rounded-full bg-gray-200" />
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Current Score" value="620" change="+15 pts" color="text-blue-600" />
          <StatCard title="Active Disputes" value="12" change="3 pending" color="text-orange-600" />
          <StatCard title="Items Removed" value="4" change="Goal: 20" color="text-green-600" />
        </div>

        {/* Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Active Dispute Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Account</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Chase Bank (Late PMT)</TableCell>
                    <TableCell><Badge>Mailed</Badge></TableCell>
                    <TableCell><Progress value={60} className="w-24" /></TableCell>
                    <TableCell className="text-blue-600 cursor-pointer hover:underline">Details</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Verizon Wireless</TableCell>
                    <TableCell><Badge variant="outline">Draft</Badge></TableCell>
                    <TableCell><Progress value={10} className="w-24" /></TableCell>
                    <TableCell className="text-blue-600 cursor-pointer hover:underline">Details</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 border rounded-lg">
                <p className="text-sm font-semibold">Upload New Report</p>
                <p className="text-xs text-gray-500">Due in 3 days for monthly update</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="text-sm font-semibold">Review Response</p>
                <p className="text-xs text-gray-500">Experian response received for Item #42</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) => (
  <div className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${active ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}>
    {icon}
    <span>{label}</span>
  </div>
);

const StatCard = ({ title, value, change, color }: { title: string; value: string; change: string; color: string }) => (
  <Card>
    <CardHeader className="pb-2">
      <p className="text-sm text-gray-500 font-medium">{title}</p>
    </CardHeader>
    <CardContent>
      <h3 className={`text-4xl font-bold ${color}`}>{value}</h3>
      <p className="text-xs text-gray-400 mt-1">{change}</p>
    </CardContent>
  </Card>
);

export default Dashboard;
