import HotTopic from '@/component/hotTopic/HotTopic';
import SearchBar from '@/component/selectForm/SearchBar';
import { Suspense } from 'react';
import LoadingCP from '@/component/LoadingCP';

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
