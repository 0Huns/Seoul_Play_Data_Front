import Link from 'next/link';

export default function Login() {
  return (
    <Link
      prefetch={true}
      href={'/login'}
      className="flex items-center gap-2 px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white font-bold duration-300 ease-in-out"
    >
      로그인
    </Link>
  );
}
