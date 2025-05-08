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
      path: '/board',
    },
    {
      name: '상권분석',
      path: 'https://golmok.seoul.go.kr/intendedOwner/intendedOwner.do',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  ];

  return (
    <div className="w-full flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <Image src={logo} alt="logo" priority width={100} />
      </Link>

      <NavClient navLinks={navLinks} />
    </div>
  );
}
