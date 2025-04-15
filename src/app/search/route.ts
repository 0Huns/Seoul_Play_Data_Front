import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await fetch('http://localhost:8000/api/recommend/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return NextResponse.redirect(
      new URL(`/search/result?data=${encodeURIComponent(JSON.stringify(data))}`, req.url),
    );
  } catch (error) {
    throw new Error('Error fetching data from the API: ' + error);
  }
}
