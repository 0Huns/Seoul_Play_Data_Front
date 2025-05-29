import { NextResponse } from 'next/server';

//프론트 배포용 mock 데이터

export async function GET() {
  return NextResponse.json({
    data: {
      hot_gu: [
        { name: '강남구', count: 3 },
        { name: '강북구', count: 2 },
        { name: '강동구', count: 2 },
        { name: '관악구', count: 1 },
      ],
      hot_dong: [
        { name: '수유1동', count: 1 },
        { name: '삼성1동', count: 1 },
        { name: '남현동', count: 1 },
        { name: '개포2동', count: 1 },
      ],
      hot_category: [
        { name: 'PC방', count: 3 },
        { name: '가전제품', count: 2 },
        { name: '가전제품수리', count: 1 },
        { name: '가방', count: 1 },
        { name: '가구', count: 1 },
      ],
      hot_gender: [
        { name: '여성', count: 2 },
        { name: '남성', count: 2 },
      ],
      hot_age: [
        { name: '10대', count: 2 },
        { name: '40대', count: 1 },
        { name: '30대', count: 1 },
      ],
    },
  });
}
