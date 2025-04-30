'use client';

import Image from 'next/image';
import kakaoLoginImage from '../../../public/images/kakao_login.png';

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
    <div>
      <span className="mx-2">카카오 로그인</span>
      <Image
        priority
        src={kakaoLoginImage}
        className="w-52 cursor-pointer"
        alt="카카오 로그인"
        onClick={() => handleOauthLogin('kakao')}
      />
      <span className="mx-2">네이버 로그인</span>
      <Image
        priority
        src={kakaoLoginImage}
        className="w-52 cursor-pointer"
        alt="네이버 로그인"
        onClick={() => handleOauthLogin('naver')}
      />
    </div>
  );
}
