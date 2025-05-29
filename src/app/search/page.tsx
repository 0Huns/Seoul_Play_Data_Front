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

type MetadataProps = {
  query?: {
    gu?: string;
    category?: string;
    area_type?: string;
    dong?: string;
    age?: string;
    gender?: string;
  };
};

export function generateMetadata({ query }: MetadataProps): Metadata {
  const { gu, dong, category, area_type, age, gender } = query || {};

  const titleParts = [
    dong || gu,
    category,
    area_type,
    age ? `${age}세` : null,
    gender === 'male' ? '남성' : gender === 'female' ? '여성' : null,
  ].filter(Boolean);

  const title = titleParts.join(' · ') || '검색 결과';

  const description = `조건에 맞는 상권 추천 결과를 확인해보세요: ${title}`;

  const keywordParts = [
    dong,
    gu,
    category,
    area_type,
    age ? `${age}대` : null,
    gender === 'male' ? '남성' : gender === 'female' ? '여성' : null,
    '상권분석',
    '상권추천',
    '창업',
    '서울창업',
    'Pick-On',
  ].filter(Boolean);

  const keywords = keywordParts.join(', ');

  return {
    title,
    description,
    keywords,
  };
}

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
  const params = await searchParams;

  const selectedConditions = Object.entries(params)
    .filter(([, value]) => value && value !== 'null')
    .map(([, value]) => {
      const decoded = decodeURIComponent(value.toString());
      return `${decoded}`;
    });

  const current = result?.data?.현재조건;
  const areaList = result?.data?.행정동추천;
  const categoryList = result?.data?.업종추천;
  const report = result?.report;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {process.env.VERCEL ? (
        <h1 className="text-2xl font-bold text-gray-800">아래는 결과 예시입니다(MOCK 데이터)</h1>
      ) : (
        <h1 className="text-2xl font-bold text-gray-800">검색 결과</h1>
      )}

      {selectedConditions.length > 0 && (
        <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 p-3 rounded-lg border border-yellow-200">
          <span className="text-xl">🔎</span>
          <span className="font-medium">선택 조건:</span>
          <div className="flex flex-wrap gap-2">
            {selectedConditions.map((condition, index) => (
              <span
                key={index}
                className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {condition}
              </span>
            ))}
          </div>
        </div>
      )}

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
