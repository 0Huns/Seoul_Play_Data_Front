import { Metadata } from 'next';
import { cookies } from 'next/headers';
import InfoCard from '@/component/result/InfoCard';
import ListCard from '@/component/result/ListCard';
import ReportCard from '@/component/result/ReportCard';

type AreaItem = {
  행정동_코드_명: string;
  성공확률: number;
};

type CategoryItem = {
  서비스_업종_코드_명: string;
  성공확률: number;
};

export const metadata: Metadata = {
  title: '검색 결과',
  description: '검색 결과 페이지입니다.',
};

async function fetchData(searchParams: Promise<URLSearchParams>) {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get('access')?.value;
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
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    });

    return response.json();
  } catch (e) {
    throw new Error('Failed to fetch data from the server: ' + e);
  }
}

export default async function SearchResultPage({
  searchParams,
}: {
  searchParams: Promise<URLSearchParams>;
}) {
  const result = await fetchData(searchParams);

  const current = result?.data?.현재조건;
  const areaList = result?.data?.행정동추천;
  const categoryList = result?.data?.업종추천;
  const report = result?.report;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">검색 결과</h1>

      {current && (
        <InfoCard
          title="🔍 현재 조건 분석"
          successRate={current.success_prob * 100}
          recommendation={current.recommendation}
        />
      )}

      {areaList && (
        <ListCard
          title="📍 추천 행정동"
          items={areaList.map((a: AreaItem) => ({
            name: a.행정동_코드_명,
            successRate: a.성공확률,
          }))}
          colorClass="text-blue-600"
        />
      )}

      {categoryList && (
        <ListCard
          title="🏷️ 추천 업종"
          items={categoryList.map((c: CategoryItem) => ({
            name: c.서비스_업종_코드_명,
            successRate: c.성공확률,
          }))}
          colorClass="text-green-600"
        />
      )}

      {report && <ReportCard report={report} />}
    </div>
  );
}
