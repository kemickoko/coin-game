import { useState } from 'react';
import { useStreakChallenge } from '@/features/streakChallenge/hooks/useStreakChallenge';
import { checkAnswer } from '@/utils/checkAnswer';
import { CoinArea } from '@/components/CoinImageGenerator/CoinArea';
import { COIN_TYPES } from '@/components/CoinImageGenerator/constants/japaneseCoins';
import { type Difficulty, DifficultyConfig } from '@/components/DifficultySelector';

type Props = {
  difficulty: Difficulty;
};

export const StreakChallenge = ({ difficulty }: Props) => {
  const {
    coins,
    streak,
    maxStreak,
    reset,
    incrementStreak,
    streakHistory,
  } = useStreakChallenge(difficulty);

  const total = coins.reduce((sum, coin) => sum + COIN_TYPES[coin.type].value, 0);
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [mistakeCount, setMistakeCount] = useState(0);

  const handleCheck = () => {
    const res = checkAnswer(input, total, mistakeCount, false);
    setResult(res.message);

    switch (res.type) {
      case 'correct':
        incrementStreak();
        setInput('');
        setMistakeCount(0);
        break;
      case 'wrong':
        setResult(`不正解！連続正解は ${streak} 回で終了です`);
        reset();
        setInput('');
        setMistakeCount(0);
        break;
    }
  };

  return (
    <div className="text-center mt-8">
      <h2 className="text-xl font-bold mb-2">連続正解チャレンジ</h2>
      <p className="mb-1">現在の連続正解数: {streak}</p>
      <p className="mb-4">🏆 "{DifficultyConfig[difficulty].label}" の最高記録: {maxStreak} 問</p>

      <CoinArea coins={coins} />

      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        className="border rounded px-3 py-2 w-full text-base sm:text-lg mt-3"
        placeholder="合計金額を入力"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleCheck();
        }}
      />
      <button
        onClick={handleCheck}
        className="bg-green-600 text-white py-2 rounded w-full hover:bg-green-700 transition mt-2"
      >
        チェック
      </button>
      <button
        onClick={() => {
          reset();
          setInput('');
          setResult(null);
          setMistakeCount(0);
        }}
        className="bg-gray-500 text-white py-2 rounded w-full hover:bg-gray-600 transition mt-2"
      >
        リセット
      </button>
      {result && <p className="mt-2 font-semibold">{result}</p>}

      {streakHistory.length > 0 && (
        <div className="mt-6 text-left max-w-sm mx-auto">
          <h3 className="font-semibold mb-2">過去の連続正解記録</h3>
          <ul className="list-disc list-inside text-sm text-gray-700 max-h-48 overflow-auto">
            {streakHistory.map((count, i) => (
              <li key={i}>
                {i + 1} 回目: {count} 回連続正解
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};