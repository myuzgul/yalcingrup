import { NextResponse } from 'next/server';
import { getPosts, savePost, deletePost } from '@/lib/db';

export async function GET() {
  return NextResponse.json(getPosts());
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    if (!data.title || !data.slug) {
      return NextResponse.json({ error: 'Başlık ve slug zorunludur' }, { status: 400 });
    }
    const saved = savePost(data);
    return NextResponse.json(saved);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID gereklidir' }, { status: 400 });
    deletePost(id);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
