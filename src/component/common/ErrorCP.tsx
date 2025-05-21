'use client';

import Link from 'next/link';

export default function ErrorCP() {
  return (
    <div className="relative w-full bg-transparent flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center font-sans bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-10 border border-gray-200">
        <h1 className="text-7xl font-extrabold text-gray-900 mb-4">404</h1>
        <p className="text-xl font-semibold text-gray-700 mb-2">페이지를 찾을 수 없습니다.</p>
        <p className="text-sm text-gray-500 mb-8">
          요청하신 페이지가 존재하지 않거나, 이동되었을 수 있습니다.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-2.5 bg-yellow-500 text-white font-medium text-sm font-semibold rounded-full shadow hover:bg-yellow-600 transition"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
