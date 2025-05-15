// app/board/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { cookies } from 'next/headers';
import Login from '@/component/auth/Login';

export const metadata: Metadata = {
  title: '커뮤니티',
  description: '서울 창업자들과 소통하세요. Pick-On 커뮤니티에서 정보와 경험을 나눠보세요.',
  keywords: [
    '커뮤니티',
    '서울 상권 분석',
    '가게 입지 추천',
    '창업 상권',
    'Pick-On',
    '서울 창업',
    '점포 추천',
  ],
  creator: 'Pick-On',
};

async function getPosts() {
  const res = await fetch(`${process.env.API_BASE_URL}/api/board/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('서버 응답 오류: ' + res.status);
  }

  return res.json();
}

export default async function BoardPage() {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get('access')?.value;
  const posts = await getPosts();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📋 게시판</h1>
        {accessToken ? (
          <Link
            href="/board/write"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            글쓰기
          </Link>
        ) : (
          <Login />
        )}
      </div>

      <ul className="space-y-4">
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.id} className="border p-4 rounded hover:bg-gray-50">
              <Link href={`/board/${post.id}`}>
                <h2 className="text-xl font-semibold text-blue-600 hover:underline">
                  {post.title}
                </h2>
              </Link>
              <p className="text-gray-700 mt-1">{post.content}</p>
              <p className="text-sm text-gray-400 mt-2">
                작성일:{' '}
                {new Date(post.created_at).toLocaleString('ko-KR', {
                  timeZone: 'Asia/Seoul',
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })}
              </p>
            </li>
          ))
        ) : (
          <li className="text-gray-500">게시글이 없습니다.</li>
        )}
      </ul>
    </div>
  );
}
