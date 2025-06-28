import { useState } from 'react';
import { useStreakChallenge } from '@/features/streakChallenge/hooks/useStreakChallenge';
import { checkAnswer } from '@/utils/checkAnswer';
import { CoinArea } from '@/components/CoinArea';
import { COIN_TYPES } from '@/constants/coins';
import type { Difficulty } from '@/components/DifficultySelector';

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
        if (typeof res.newMistakeCount === 'number') {
          setMistakeCount(res.newMistakeCount);
        }
        setInput('');
        break;
      case 'maxAttempts':
        reset();
        setResult(`不正解！連続正解は ${streak} 回で終了です`);
        setInput('');
        setMistakeCount(0);
        break;
    }
  };

  return (
    <div className="text-center mt-8">
      <h2 className="text-xl font-bold mb-2">連続正解チャレンジ</h2>
      <p className="mb-1">現在の連続正解数: {streak}</p>
      <p className="mb-4">過去の最高記録: {maxStreak}</p>

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
    </div>
  );
};