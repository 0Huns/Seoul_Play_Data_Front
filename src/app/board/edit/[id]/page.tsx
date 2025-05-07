'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function BoardWritePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [title, setTitle] = useState('불러오는 중...');
  const [content, setContent] = useState('불러오는 중...');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/board/${id}/`, {
          cache: 'no-store',
        });
        if (res.ok) {
          const data = await res.json();
          setTitle(data.title || '');
          setContent(data.content || '');
        }
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/board', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content, id }),
    });

    if (res.ok) {
      router.push('/board');
    } else {
      alert('글 수정 실패');
    }
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/board', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      router.push('/board');
    } else {
      alert('글 삭제 실패');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow space-y-4">
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <textarea
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-48 border p-2 rounded resize-none"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        수정하기
      </button>
      <button
        onClick={handleDelete}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        삭제하기
      </button>
    </div>
  );
}
