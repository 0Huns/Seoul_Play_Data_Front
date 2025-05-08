'use client';

import Image from 'next/image';
import kakaoLoginImage from '../../../public/images/kakao_login.png';
import naverLoginImage from '../../../public/images/naver_login.png';

export default function OauthLoginBtn() {
  const handleOauthLogin = async (platform: string) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/accounts/${platform}/login/start/`;
      window.location.replace(url);
    } catch (error) {
      console.error('로그인 리다이렉트 요청 실패:', error);
      alert('로그인 요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-10 bg-white rounded-2xl shadow-md w-full max-w-sm mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800">SNS로 로그인</h2>

      <div onClick={() => handleOauthLogin('kakao')}>
        <Image
          src={kakaoLoginImage}
          alt="카카오 로그인"
          width={250}
          height={50}
          className="object-contain cursor-pointer"
        />
      </div>

      <div onClick={() => handleOauthLogin('naver')}>
        <Image
          src={naverLoginImage}
          alt="네이버 로그인"
          width={250}
          height={50}
          className="object-contain cursor-pointer"
        />
      </div>
    </div>
  );
}
