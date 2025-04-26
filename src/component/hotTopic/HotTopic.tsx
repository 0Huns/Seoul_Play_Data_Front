import Card from './Card';

async function fetchData() {
  const response = await fetch(`${process.env.API_BASE_URL}/api/hot_topics/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('서버 응답 오류: ' + response.status);
  }

  return response.json();
}

export default async function HotTopic() {
  try {
    const data = await fetchData();

    return (
      <div className="flex flex-col items-center justify-center w-full h-full max-w-5xl mx-auto px-4 py-8 mt-6">
        <div className="max-w-7xl mx-auto text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            🎯 Today’s Hot Topics
          </h1>
          <p className="text-gray-500 text-base md:text-lg">
            서울에서 지금 가장 주목받는 동네와 키워드를 확인해보세요!
          </p>
        </div>
        <Card data={data.data} />
      </div>
    );
  } catch (error) {
    console.error('🔥 HotTopic 에러:', error);

    return (
      <div className="flex flex-col items-center justify-center h-96">
        <p className="text-lg text-gray-600">데이터를 불러오는 데 실패했습니다. 😥</p>
        <p className="text-sm text-gray-400 mt-2">{(error as Error).message}</p>
      </div>
    );
  }
}
