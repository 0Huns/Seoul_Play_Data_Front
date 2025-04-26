'use client';

import Image from 'next/image';
import kakaoLoginImage from '../../../public/images/kakao_login.png';

async function getRedirectUrl() {
  try {
    const response = await fetch(`/api/accounts/kakao/login/start/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    return response;
  } catch (e) {
    throw new Error('Failed to fetch data from the server' + e);
  }
}

export default function Login() {
  const handleKakaoLogin = async () => {
    try {
      const res = await getRedirectUrl();
      console.log(res);
    } catch (error) {
      console.error('카카오 로그인 URL 요청 실패:', error);
      alert('로그인 요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <Image
        priority
        src={kakaoLoginImage}
        className="w-52 cursor-pointer"
        alt="카카오 로그인"
        onClick={handleKakaoLogin}
      />
    </div>
  );
}
