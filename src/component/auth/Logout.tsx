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
      className="flex items-center gap-2 px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white font-bold duration-300 ease-in-out"
    >
      로그아웃
    </button>
  );
}
