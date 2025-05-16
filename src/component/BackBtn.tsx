'use client';

import { useRouter } from 'next/navigation';
import { FiArrowLeft } from 'react-icons/fi';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center text-sm text-gray-600 hover:text-gray-800 transition mb-6"
    >
      <FiArrowLeft className="w-4 h-4 mr-2" />
      뒤로가기
    </button>
  );
}
