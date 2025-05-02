interface ReportSummaryProps {
  report: string;
}

export default function ReportCard({ report }: ReportSummaryProps) {
  const tags = [...report.matchAll(/\[(.*?)\]/g)].map((match) => match[1]);

  const lines = report
    .replace(/\[.*?\]/g, '')
    .trim()
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const details = lines.slice(0, -1);
  const finalSentence = lines[lines.length - 1];

  return (
    <div className="p-5 bg-yellow-50 border border-yellow-200 rounded-lg space-y-2 text-sm text-gray-800">
      <h2 className="font-semibold text-yellow-800">📄 리포트 요약</h2>

      {report.includes('상권명') ? (
        <>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          <ul className="list-disc list-inside space-y-1 mt-2">
            {details.map((line, idx) => (
              <li key={idx}>{line}</li>
            ))}
          </ul>

          <p className="mt-3 text-yellow-900 font-medium border-t border-yellow-200 pt-2">
            {finalSentence}
          </p>
        </>
      ) : (
        <p>{report}</p>
      )}
    </div>
  );
}
