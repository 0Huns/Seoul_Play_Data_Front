interface ListCardProps {
  title: React.ReactNode | string;
  items: { name: string; successRate: number }[];
  colorClass: string;
}

export default function ListCard({ title, items, colorClass }: ListCardProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-3">{title}</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item, idx) => (
          <li
            key={idx}
            className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border"
          >
            <span className="font-medium">{item.name}</span>
            <span className={`${colorClass} font-semibold`}>
              {(item.successRate * 100).toFixed(2)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
