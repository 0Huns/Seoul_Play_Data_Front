import { FiLogOut } from 'react-icons/fi';

export default function Logout() {
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        window.location.href = '/';
      } else {
        console.error('로그아웃 실패');
      }
    } catch (error) {
      console.error('로그아웃 요청 중 오류 발생:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="inline-flex items-center gap-2 px-4 py-2 border-2 border-yellow-500 text-neutral-800 bg-white hover:bg-yellow-400 hover:text-black font-medium rounded-full transition duration-200"
    >
      <FiLogOut className="w-5 h-5" />
      로그아웃
    </button>
  );
}
