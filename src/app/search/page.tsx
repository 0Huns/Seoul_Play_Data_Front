import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '검색 결과',
  description: '검색 결과 페이지입니다.',
};

async function fetchData(searchParams: Promise<URLSearchParams>) {
  const params = await searchParams;
  const decodedParams = Object.entries(params).reduce(
    (acc, [key, value]) => {
      if (value === 'null') {
        acc[key] = null;
      } else if (Array.isArray(value)) {
        acc[key] = value.map(decodeURIComponent);
      } else {
        acc[key] = decodeURIComponent(value);
      }
      return acc;
    },
    {} as Record<string, string | string[] | null>,
  );

  try {
    const response = await fetch(`${process.env.API_BASE_URL}/api/recommend/`, {
      method: 'POST',
      body: JSON.stringify(decodedParams),
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    return response.json();
  } catch (e) {
    throw new Error('Failed to fetch data from the server' + e);
  }
}

export default async function SearchResultPage({
  searchParams,
}: {
  searchParams: Promise<URLSearchParams>;
}) {
  const data = await fetchData(searchParams);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">검색 결과</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
