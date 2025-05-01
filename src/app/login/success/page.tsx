'use client';

import { Suspense } from 'react';
import LoginSuccessContent from '../../../component/auth/LoginSuccessContent';

export default function LoginSuccessPage() {
  return (
    <Suspense fallback={<p>로딩 중...</p>}>
      <LoginSuccessContent />
    </Suspense>
  );
}
