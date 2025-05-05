import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get('access')?.value;
  const refreshToken = (await cookieStore).get('refresh')?.value;

  try {
    const res = NextResponse.json({ success: true });

    const apiResponse = await fetch(`${process.env.API_BASE_URL}/api/accounts/logout/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      console.error('API 로그아웃 실패:', errorData);
      return NextResponse.json({ error: '로그아웃 처리 실패' }, { status: 500 });
    }

    res.cookies.set('access', '', {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 0,
      path: '/',
    });

    res.cookies.set('refresh', '', {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 0,
      path: '/',
    });

    res.cookies.set('auth', '', {
      httpOnly: false,
      secure: false,
      sameSite: 'strict',
      maxAge: 0,
      path: '/',
    });

    return res;
  } catch (error) {
    console.error('Error in /logout/api:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
