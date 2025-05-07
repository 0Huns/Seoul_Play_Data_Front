import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { provider, code, state } = await req.json();

    if (!provider || !code) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    // 외부 API로 토큰 요청
    const response = await fetch(`${process.env.API_BASE_URL}/api/accounts/social/token/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provider, code, ...(state && { state }) }),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json({ error: error.message || '토큰 요청 실패' }, { status: 400 });
    }

    const data = await response.json();
    const res = NextResponse.json({ success: true });

    res.cookies.set('access', data.access, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 3600,
      path: '/',
    });

    res.cookies.set('refresh', data.refresh, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    res.cookies.set(
      'auth',
      JSON.stringify({
        isLoggedIn: true,
        userId: data.user.username,
      }),
      {
        httpOnly: false,
        secure: false,
        sameSite: 'strict',
        maxAge: 3600,
        path: '/',
      },
    );

    return res;
  } catch (error) {
    console.error('Error in /login/success/api:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
