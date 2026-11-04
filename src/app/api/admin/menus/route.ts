import { NextResponse } from 'next/server';
import { getMenus, updateMenus } from '@/lib/db';

export async function GET() {
  return NextResponse.json(getMenus());
}

export async function POST(request: Request) {
  const data = await request.json();
  updateMenus(data);
  return NextResponse.json({ success: true });
}
