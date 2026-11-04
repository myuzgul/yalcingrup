import { NextResponse } from 'next/server';
import { getSettings, updateSettings } from '@/lib/db';

export async function GET() {
  return NextResponse.json(getSettings());
}

export async function POST(request: Request) {
  const data = await request.json();
  const updated = updateSettings(data);
  return NextResponse.json(updated);
}
