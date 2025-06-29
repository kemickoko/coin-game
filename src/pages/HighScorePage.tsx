import { useHighScoreSummary } from '@/hooks/useHighScoreSummary';
import { useNavigate } from 'react-router-dom';

export const HighScorePage = () => {
  const summary = useHighScoreSummary();
  const navigate = useNavigate();

  // 通貨ごとにグループ化
  const groupedByCurrency = summary.reduce((acc, row) => {
    if (!acc[row.currency]) acc[row.currency] = [];
    acc[row.currency].push(row);
    return acc;
  }, {} as Record<string, typeof summary>);

  return (
    <main className="max-w-xl mx-auto py-8 px-4 space-y-8">
      <h1 className="text-2xl font-bold mb-4 text-center">ハイスコア一覧</h1>

      {Object.entries(groupedByCurrency).map(([currency, rows]) => (
        <section key={currency}>
          <h2 className="text-xl font-semibold mb-2">{currency} の記録</h2>
          <table className="w-full border text-sm sm:text-base mb-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1 text-left">難易度</th>
                <th className="border px-2 py-1 text-center">3分チャレンジ</th>
                <th className="border px-2 py-1 text-center">連続正解</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td className="border px-2 py-1">{row.label}</td>
                  <td className="border px-2 py-1 text-center">{row.timerScore} 問</td>
                  <td className="border px-2 py-1 text-center">{row.streakScore} 回</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}

      <div className="text-center">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          ← 戻る
        </button>
      </div>
    </main>
  );
};