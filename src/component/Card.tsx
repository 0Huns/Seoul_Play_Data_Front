import { JSX } from 'react';
import { FaMapMarkerAlt, FaCity, FaList, FaVenusMars, FaUserFriends } from 'react-icons/fa';

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

const iconMap: Record<string, JSX.Element> = {
  '인기 구': <FaMapMarkerAlt className="text-red-500" />,
  '인기 동': <FaCity className="text-yellow-500" />,
  '인기 카테고리': <FaList className="text-blue-500" />,
  '인기 성별': <FaVenusMars className="text-purple-500" />,
  '인기 연령대': <FaUserFriends className="text-green-500" />,
};

export default function Card({ data }: Props) {
  const sections = [
    { title: '인기 구', items: data.hot_gu },
    { title: '인기 동', items: data.hot_dong },
    { title: '인기 카테고리', items: data.hot_category },
    { title: '인기 성별', items: data.hot_gender },
    { title: '인기 연령대', items: data.hot_age },
  ];

  return (
    <div className="w-full grid grid-cols-1 min-[480px]:grid-cols-2 sm:grid-cols-3 min-[850px]:grid-cols-4 min-[1035px]:grid-cols-5 gap-6 px-6">
      {sections.map((section, idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition-shadow duration-200"
        >
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            {iconMap[section.title]} {section.title}
          </h2>
          <ul className="space-y-2">
            {section?.items?.slice(0, 3).map((item, i) => (
              <li
                key={i}
                className="flex justify-between items-center px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <span className="text-sm text-blue-600 font-semibold">{item.count}건</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
