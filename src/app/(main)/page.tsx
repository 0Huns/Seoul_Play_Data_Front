import Background from '@/component/Background';
import SearchBar from '@/component/SearchBar';

export default function Home() {
  return (
    <main className="h-[97vh]">
      <section className="h-[30%]">
        <Background />
      </section>
      <section className="pt-8 z-10 rounded-t-1xl shadow-[0px_-40px_30px_-50px_#00000059]">
        <SearchBar />
      </section>
    </main>
  );
}
