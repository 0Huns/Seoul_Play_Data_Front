'use client';

import { useSearchParams } from 'next/navigation';

export default function SearchResultPage() {
  const searchParams = useSearchParams();
  const dataString = searchParams.get('data');
  const data = dataString ? JSON.parse(dataString) : null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">검색 결과</h1>
      {data ? (
        <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>결과가 없습니다.</p>
      )}
    </div>
  );
}
