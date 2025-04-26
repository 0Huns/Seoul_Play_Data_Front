import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../public/images/PickOn_Logo.png';
import NavClient from './NavClient';

export default function Nav() {
  const navLinks = [
    {
      name: '메인',
      path: '/',
    },
    {
      name: '커뮤니티',
      path: '/community',
    },
  ];

  return (
    <div className="w-full flex items-center justify-between">
      {/* 좌측: 로고 */}
      <Link href="/" className="flex items-center gap-2">
        <Image src={logo} alt="logo" priority className="w-[100px]" />
      </Link>

      {/* 중앙 및 모바일 네비게이션 */}
      <NavClient navLinks={navLinks} />

      {/* 로그인 버튼 */}
    </div>
  );
}
