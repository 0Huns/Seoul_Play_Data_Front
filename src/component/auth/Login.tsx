import Link from 'next/link';
import { FiLogIn } from 'react-icons/fi';

export default function Login() {
  return (
    <Link
      href="/login"
      className="inline-flex items-center gap-2 px-4 py-2 border-2 border-yellow-500 text-neutral-800 bg-white hover:bg-yellow-400 hover:text-black font-medium rounded-full transition duration-200"
    >
      <FiLogIn className="w-5 h-5" />
      로그인
    </Link>
  );
}
