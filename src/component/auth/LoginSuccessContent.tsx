// app/login/success/page.tsx

'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const login = async () => {
      const provider = searchParams.get('provider');
      const code = searchParams.get('code');
      const state = searchParams.get('state');

      if (!provider || !code) {
        router.replace('/login');
        return;
      }

      const res = await fetch('/login/success/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ provider, code, state }),
      });

      if (res.ok) {
        window.location.href = '/';
      } else {
        router.replace('/login');
      }
    };

    login();
  }, [searchParams, router]);

  return <p className="text-center mt-10">로그인 처리 중입니다...</p>;
}
