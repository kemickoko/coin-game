import { useHighScoreSummary } from '@/hooks/useHighScoreSummary';
import { useNavigate } from 'react-router-dom';

export const HighScorePage = () => {
  const scores = useHighScoreSummary();
  const navigate = useNavigate();

  return (
    <main className="max-w-xl mx-auto py-8 px-4 space-y-4">
      <h1 className="text-2xl font-bold mb-6">ハイスコア一覧</h1>
      <table className="w-full border text-sm sm:text-base">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1 text-left">難易度</th>
            <th className="border px-2 py-1 text-center">3分チャレンジ</th>
            <th className="border px-2 py-1 text-center">連続正解</th>
          </tr>
        </thead>
        <tbody>
          {scores.map(({ difficulty, label, timerScore, streakScore }) => (
            <tr key={difficulty}>
              <td className="border px-2 py-1">{label}</td>
              <td className="border px-2 py-1 text-center">{timerScore}問</td>
              <td className="border px-2 py-1 text-center">{streakScore}回</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => navigate(-1)} // 1つ前のページに戻る
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
        ← 戻る
      </button>
    </main>
  );
};