'use client';

import { usePathname } from 'next/navigation';
import { JSX, useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaHome, FaComments } from 'react-icons/fa';
import Login from '../auth/Login';
import Logout from '../auth/Logout';

interface NavLink {
  name: string;
  path: string;
  target?: string;
  rel?: string;
}

interface NavClientProps {
  navLinks: NavLink[];
}

const icons: Record<string, JSX.Element> = {
  메인: <FaHome />,
  커뮤니티: <FaComments />,
};

export default function NavClient({ navLinks }: NavClientProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('사용자');

  useEffect(() => {
    const authCookie = Cookies.get('auth');

    if (authCookie) {
      try {
        const authData = JSON.parse(authCookie);
        setIsLoggedIn(authData.isLoggedIn === true);
        setName(authData.userId || '사용자');
      } catch (error) {
        console.error('쿠키 파싱 오류:', error);
      }
    }
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <>
      {/* 데스크탑 네비 */}
      <nav className="hidden md:flex gap-8 items-center absolute left-1/2 transform -translate-x-1/2">
        {navLinks.map(({ name, path, target, rel }) => (
          <Link
            key={name}
            href={path}
            target={target}
            rel={rel}
            className={`flex items-center gap-2 px-3 py-2 rounded-md font-medium transition-all duration-300 relative
              ${isActive(path) ? 'text-red-600 bg-white shadow-sm' : 'text-white hover:text-red-300'}
            `}
          >
            {icons[name]}
            <span>{name}</span>
            {isActive(path) && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-red-600 rounded-full animate-slideIn" />
            )}
          </Link>
        ))}
      </nav>

      <div className="hidden md:flex gap-8 items-center">
        {isLoggedIn && (
          <div className="hidden lg:flex text-white text-sm font-semibold truncate break-words max-w-[300px]">
            👋 <span className="text-red-300">{name}</span> 님
          </div>
        )}
        {isLoggedIn ? <Logout /> : <Login />}
      </div>

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
          {isLoggedIn && (
            <div className="text-gray-800 text-sm font-medium mb-2 border-b pb-2 break-words max-w-full">
              👋 <span className="text-red-500 break-words max-w-full inline-block">{name}</span>
            </div>
          )}

          {navLinks.map(({ name, path, target, rel }) => (
            <Link
              key={name}
              href={path}
              target={target}
              rel={rel}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-2 text-sm px-2 py-2 rounded-md transition-colors
                ${
                  isActive(path)
                    ? 'bg-red-100 text-red-600 font-semibold'
                    : 'text-gray-800 hover:bg-gray-100'
                }
              `}
            >
              {icons[name]}
              {name}
            </Link>
          ))}
          {isLoggedIn ? <Logout /> : <Login />}
        </div>
      )}
    </>
  );
}
