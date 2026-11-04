import { NextResponse } from 'next/server';
import { getCategories, saveCategory, deleteCategory } from '@/lib/db';

export async function GET() {
  return NextResponse.json(getCategories());
}

export async function POST(request: Request) {
  const data = await request.json();
  const saved = saveCategory(data);
  return NextResponse.json(saved);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  if (slug) deleteCategory(slug);
  return NextResponse.json({ success: true });
}
