'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const path = usePathname();

  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Seoul-Play</Link> {path === '/' ? '⭐' : ''}
        </li>
      </ul>
    </nav>
  );
}
