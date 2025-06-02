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
  ];

  // id가 있으면 해당 게시글 반환, 없으면 전체 배열 반환
  if (id && id !== 'board') {
    const post = posts.find((p) => String(p.id) === id);
    if (post) return NextResponse.json(post);
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(posts);
}
