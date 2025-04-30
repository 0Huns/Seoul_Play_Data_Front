// app/error.tsx
'use client';

import { useRouter } from 'next/navigation';

export default function ErrorPage() {
  const router = useRouter();
  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 bg-white opacity-25"></div>
      <div className="container relative z-10 flex items-center px-6 py-32 mx-auto md:px-12 xl:py-40">
        <div className="relative z-10 flex flex-col items-center w-full font-mono">
          <h1 className="mt-4 text-5xl font-extrabold leading-tight text-center text-black">
            로그인 중 에러가 발생했습니다.
          </h1>
          <p className="font-extrabold text-black text-8xl my-44 animate-bounce">404</p>
          <button onClick={() => router.push('/')}>Back To Home</button>
        </div>
      </div>
    </div>
  );
}
