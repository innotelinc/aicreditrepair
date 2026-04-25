import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // For the initial admin setup, we validate against the requested credentials
    if (email === 'admin@innotel.us' && password === 'password') {
      // In production, this would create a session or JWT
      return NextResponse.json({ success: true, admin: true });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ success: true, admin: true });
  } catch (error) {
    console.error('Admin auth error:', error);
    return NextResponse.json({ error: 'Auth failed' }, { status: 500 });
  }
}
