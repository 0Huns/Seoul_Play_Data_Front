import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/component/nav/Nav';

export const metadata: Metadata = {
  title: {
    default: 'Pick-On',
    template: '%s | Pick-On',
  },
  description:
    '서울에서 가게를 열고 싶다면? Pick-On이 상권 분석을 바탕으로 최적의 입지를 추천해드립니다.',
  keywords: ['서울 상권 분석', '가게 입지 추천', '창업 상권', 'Pick-On', '서울 창업', '점포 추천'],
  creator: 'Pick-On',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-[#f5f5f5] text-gray-800 w-full max-w-7xl mx-auto min-h-screen flex flex-col">
        <header className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-5 rounded-b-[30px] shadow-md px-6">
          <Nav />
        </header>
        <main className="flex-1 px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
