import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    if (username === 'admin' && (password === 'yalcin2026admin' || password === 'admin')) {
      const response = NextResponse.json({ success: true, message: 'Giriş başarılı' });
      response.cookies.set('admin_session', 'authenticated_user_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });
      return response;
    }
    return NextResponse.json({ success: false, message: 'Kullanıcı adı veya şifre hatalı' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Sunucu hatası' }, { status: 500 });
  }
}
