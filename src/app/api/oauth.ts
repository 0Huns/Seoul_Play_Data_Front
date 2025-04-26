import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/api/accounts/kakao/login/start/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('카카오 로그인 시작 API 응답:', response);
    // const data = await response.json(); // or response.text() 등 적절히
    // return NextResponse.json(data);
  } catch (error) {
    console.error('카카오 로그인 시작 API 실패:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
