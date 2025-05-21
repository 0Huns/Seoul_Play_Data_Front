import HotTopic from '@/component/hotTopic/HotTopic';
import SearchBar from '@/component/selectForm/SearchBar';
import { Suspense } from 'react';
import LoadingCP from '@/component/common/LoadingCP';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '서울 창업 입지 추천 서비스',
  description:
    '서울에서 가게를 열고 싶다면? Pick-On이 상권 분석을 바탕으로 최적의 입지를 추천해드립니다.',
  keywords: ['서울 상권 분석', '가게 입지 추천', '창업 상권', 'Pick-On', '서울 창업', '점포 추천'],
  creator: 'Pick-On',
};

export default function Home() {
  return (
    <main>
      <section className="pt-8 z-10 rounded-t-1xl">
        <SearchBar />
        <Suspense fallback={<LoadingCP />}>
          <HotTopic />
        </Suspense>
      </section>
    </main>
  );
}
