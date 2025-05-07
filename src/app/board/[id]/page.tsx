// app/board/[id]/page.tsx
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import Link from 'next/link';

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const res = await fetch(`${process.env.API_BASE_URL}/api/board/${params.id}/`);
  const post = await res.json();
  return {
    title: post.title,
    description: post.content.slice(0, 150),
  };
}

export default async function BoardDetailPage({ params }: Props) {
  const cookieStore = cookies();
  const authAccess = (await cookieStore).get('auth')?.value;
  const editAccess = authAccess ? JSON.parse(authAccess) : null;
  const id = await Promise.resolve(params.id);
  const res = await fetch(`${process.env.API_BASE_URL}/api/board/${id}/`, {
    cache: 'no-store',
  });
  const post = await res.json();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 text-sm mb-2">
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
      <p className="whitespace-pre-line">{post.content}</p>
      {editAccess?.isLoggedIn && editAccess?.userId === post.author_username ? (
        <div className="mt-6 flex gap-4">
          <Link
            href={`/board/edit/${post.id}?id=${post.id}`}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            수정
          </Link>
        </div>
      ) : null}
    </div>
  );
}
