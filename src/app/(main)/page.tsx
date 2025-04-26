import HotTopic from '@/component/HotTopic';
import SearchBar from '@/component/SearchBar';
import { Suspense } from 'react';
import LoadingCP from '@/component/LoadingCP';

export default function Home() {
  return (
    <main className="h-[97vh]">
      <section className="pt-8 z-10 rounded-t-1xl shadow-[0px_-40px_30px_-50px_#00000059]">
        <SearchBar />
        <Suspense fallback={<LoadingCP />}>
          <HotTopic />
        </Suspense>
      </section>
    </main>
  );
}
