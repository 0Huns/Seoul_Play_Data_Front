interface InfoCardProps {
  title: React.ReactNode | string;
  successRate: number;
  recommendation: string;
}

export default function InfoCard({ title, successRate, recommendation }: InfoCardProps) {
  return (
    <div className="p-5 bg-white shadow rounded-lg border">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-sm text-gray-700">
        <span className="font-medium text-gray-900">성공 확률:</span> {successRate.toFixed(2)}%
      </p>
      <p className="text-sm">
        <span className="font-medium">추천 여부:</span>{' '}
        <span
          className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
            recommendation === '추천' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {recommendation}
        </span>
      </p>
    </div>
  );
}
