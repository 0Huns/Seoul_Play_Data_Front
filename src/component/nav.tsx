'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaHome, FaComments } from 'react-icons/fa';
import Image from 'next/image';
import logo from '../../public/images/PickOn_Logo.png';

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    {
      name: '메인',
      path: '/',
      icon: <FaHome />,
    },
    {
      name: '커뮤니티',
      path: '/community',
      icon: <FaComments />,
    },
  ];

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <div className="w-full flex items-center justify-between">
      {/* 좌측: 로고 */}
      <Link href="/" className="flex items-center gap-2">
        <Image src={logo} alt="logo" priority className="w-[100px]" />
      </Link>

      {/* 중앙: 데스크탑 네비게이션 */}
      <nav className="hidden md:flex gap-8 items-center absolute left-1/2 transform -translate-x-1/2">
        {navLinks.map(({ name, path, icon }) => (
          <Link
            key={name}
            href={path}
            className={`flex items-center gap-2 px-3 py-2 rounded-md font-medium transition-all duration-300 relative
          ${isActive(path) ? 'text-red-600 bg-white shadow-sm' : 'text-white hover:text-red-300'}
        `}
          >
            {icon}
            <span>{name}</span>
            {isActive(path) && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-red-600 rounded-full animate-slideIn" />
            )}
          </Link>
        ))}
      </nav>

      {/* 모바일 메뉴 버튼 */}
      <button
        className="md:hidden text-white text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu Toggle"
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* 모바일 드롭다운 메뉴 */}
      {menuOpen && (
        <div className="absolute top-[72px] right-6 bg-white shadow-lg rounded-lg p-4 z-50 w-48 flex flex-col gap-3 md:hidden">
          {navLinks.map(({ name, path, icon }) => (
            <Link
              key={name}
              href={path}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-2 text-sm px-2 py-2 rounded-md transition-colors
                ${
                  isActive(path)
                    ? 'bg-red-100 text-red-600 font-semibold'
                    : 'text-gray-800 hover:bg-gray-100'
                }
              `}
            >
              {icon}
              {name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
