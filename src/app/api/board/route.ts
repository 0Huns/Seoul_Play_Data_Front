import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get('access')?.value;
  const { title, content } = await req.json();

  try {
    const res = NextResponse.json({ success: true });

    const apiResponse = await fetch(`${process.env.API_BASE_URL}/api/board/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ title: title, content: content }),
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      console.error('API 로그아웃 실패:', errorData);
      return NextResponse.json({ error: '로그아웃 처리 실패' }, { status: 500 });
    }

    return res;
  } catch (error) {
    console.error('Error in /logout/api:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get('access')?.value;
  const { title, content, id } = await req.json();

  try {
    const res = NextResponse.json({ success: true });

    const apiResponse = await fetch(`${process.env.API_BASE_URL}/api/board/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ title: title, content: content }),
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      console.error('API 로그아웃 실패:', errorData);
      return NextResponse.json({ error: '로그아웃 처리 실패' }, { status: 500 });
    }

    return res;
  } catch (error) {
    console.error('Error in /logout/api:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get('access')?.value;
  const { id } = await req.json();

  try {
    const res = NextResponse.json({ success: true });

    const apiResponse = await fetch(`${process.env.API_BASE_URL}/api/board/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      console.error('API 로그아웃 실패:', errorData);
      return NextResponse.json({ error: '로그아웃 처리 실패' }, { status: 500 });
    }

    return res;
  } catch (error) {
    console.error('Error in /logout/api:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
