import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  //프론트 배포용 mock 데이터
  return NextResponse.json([
    {
      id: 2,
      title: '커뮤니티 기능 관련',
      content: '현재 로그인/인증이 필요한 글 작성 및 수정 기능은 이용하실 수 없습니다.',
      author_id: 1,
      author_nickname: '황영훈',
      created_at: '2025-05-24T15:18:40.611521Z',
      updated_at: '2025-05-24T15:18:40.611554Z',
    },
    {
      id: 1,
      title: '소셜 로그인 관련',
      content:
        '현재 사이트는 프론트엔드만 배포된 상태로, 실제 로그인/인증 없이 목(mock) 데이터만 반환합니다.',
      author_id: 1,
      author_nickname: '황영훈',
      created_at: '2025-05-09T07:20:43.367356Z',
      updated_at: '2025-05-09T07:20:43.367390Z',
    },
  ]);
}

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
