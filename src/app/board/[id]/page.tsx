import BackButton from '@/component/BackBtn';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { FiCalendar } from 'react-icons/fi';

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;
  const res = await fetch(`${process.env.API_BASE_URL}/api/board/${id}/`);
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

  const id = (await params).id;
  const res = await fetch(`${process.env.API_BASE_URL}/api/board/${id}/`, {
    cache: 'no-store',
  });
  const post = await res.json();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <BackButton />
      <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-200">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{post.title}</h1>

        <div className="flex items-center text-sm text-gray-500 mb-6">
          <FiCalendar className="w-4 h-4 mr-2" />
          {new Date(post.created_at).toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })}
        </div>

        <div className="prose max-w-none prose-gray text-gray-800 whitespace-pre-wrap">
          {post.content}
        </div>

        {editAccess?.isLoggedIn && editAccess?.userId === post.author_username && (
          <div className="mt-8 flex justify-end">
            <Link
              href={`/board/edit/${post.id}?id=${post.id}`}
              className="px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium text-sm rounded-full transition"
            >
              수정하기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
