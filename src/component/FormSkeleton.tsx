'use client';

export default function FormSkeleton() {
  return (
    <div className="w-full max-w-5xl mx-auto px-8 py-6 bg-white/70 backdrop-blur-md rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-gray-300 flex flex-col gap-6 animate-pulse">
      {/* 제목 스켈레톤 */}
      <div className="flex items-center justify-between">
        <div className="h-5 w-32 bg-gray-300 rounded" />
      </div>

      {/* 필수 필드 스켈레톤 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, idx) => (
          <div
            key={idx}
            className="z-10 bg-white rounded-xl shadow-md border border-gray-400 px-4 py-7 flex flex-col gap-2"
          >
            <div className="h-4 w-24 bg-gray-300 rounded" />
            <div className="h-8 bg-gray-200 rounded" />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="h-5 w-32 bg-gray-300 rounded" />
      </div>

      {/* 검색 버튼 스켈레톤 */}
      <div className="flex justify-end">
        <div className="h-10 w-28 bg-gray-400 rounded-full" />
      </div>
    </div>
  );
}
