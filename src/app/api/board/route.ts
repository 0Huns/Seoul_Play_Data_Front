import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  //프론트 배포용 mock 데이터
  // id 파라미터 추출
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop();

  // mock 데이터
  const posts = [
    {
      id: 2,
      title: '네이버 로그인 관련',
      content: '네이버 로그인 정상적으로 작동가능합니다.',
      author_id: 1,
      author_username: 'naver_Q8xjSru0inZE1M4ILhpXSOZrOs1ABml_RcUofJ4Y4O8',
      author_nickname: '곽도영',
      created_at: '2025-05-24T15:18:40.611521Z',
      updated_at: '2025-05-24T15:18:40.611554Z',
    },
    {
      id: 1,
      title: '네이버 로그인 관련',
      content: '현재 네이버 로그인의 경우 검수 대기중으로 사용이 불가능 하실수 있습니다.',
      author_id: 1,
      author_username: 'naver_Q8xjSru0inZE1M4ILhpXSOZrOs1ABml_RcUofJ4Y4O8',
      author_nickname: '곽도영',
      created_at: '2025-05-09T07:20:43.367356Z',
      updated_at: '2025-05-09T07:20:43.367390Z',
    },
  ];

  // id가 있으면 해당 게시글 반환, 없으면 전체 배열 반환
  if (id && id !== 'board') {
    const post = posts.find((p) => String(p.id) === id);
    if (post) return NextResponse.json(post);
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(posts);
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
