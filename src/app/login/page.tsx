import OauthLoginBtn from '@/component/auth/OauthLoginBtn';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로그인',
  description: 'Pick-On에 로그인하여 서울 창업 입지 추천 서비스를 이용해보세요.',
  keywords: [
    '로그인',
    '카카오 로그인',
    '네이버 로그인',
    'Pick-On',
    '서울 창업',
    '점포 추천',
    '서울 상권 분석',
  ],
  creator: 'Pick-On',
};

export default function login() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <OauthLoginBtn />
    </div>
  );
}
