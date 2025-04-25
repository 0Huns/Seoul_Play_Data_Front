type HotItem = {
  name: string;
  count: number;
};

type HotTopicData = {
  hot_gu: HotItem[];
  hot_dong: HotItem[];
  hot_category: HotItem[];
  hot_gender: HotItem[];
  hot_age: HotItem[];
};

type Props = {
  data: HotTopicData;
};

export default function Card({ data }: Props) {
  const sections = [
    { title: '🔥 인기 구', items: data.hot_gu },
    { title: '📍 인기 동', items: data.hot_dong },
    { title: '🛒 인기 카테고리', items: data.hot_category },
    { title: '🙋‍♂️ 인기 성별', items: data.hot_gender },
    { title: '👶 인기 연령대', items: data.hot_age },
  ];

  return (
    <div className="grid grid-cols-1 min-[480px]:grid-cols-2 sm:grid-cols-3 min-[850px]:grid-cols-4 lg:grid-cols-5 gap-6 px-6">
      {sections.map((section, idx) => (
        <div key={idx} className="bg-white rounded-2xl shadow-lg p-4">
          <h2 className="text-lg font-semibold mb-3">{section.title}</h2>
          <ul className="space-y-2">
            {section?.items?.slice(0, 3).map((item, i) => (
              <li
                key={i}
                className="flex justify-between items-center px-3 py-2 bg-gray-100 rounded-lg"
              >
                <span className="text-sm font-medium">{item.name}</span>
                <span className="text-sm text-blue-600 font-semibold">{item.count}건</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
