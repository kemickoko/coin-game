import { useState } from 'react';
import { useStreakChallenge } from '@/features/streak-challenge/hooks/useStreakChallenge';
import { CoinDisplay } from '@/components/coin-image-generator/CoinDisplay';
import { AnswerInput } from '@/components/AnswerInput';
import { checkAnswer } from '@/utils/checkAnswer';
import { useInputFocusControl } from '@/hooks/useInputFocusControl';
import { type Coin } from '@/components/coin-image-generator/types';
import { type Difficulty, DifficultyConfig } from '@/components/difficulty-selector';
import { type Currency } from '@/components/coin-image-generator/constants';


type Props = {
  difficulty: Difficulty;
  currency: Currency;
};

export const StreakChallenge = ({ difficulty, currency }: Props) => {

  useInputFocusControl();

  const {
    streak,
    maxStreak,
    reset,
    incrementStreak,
    streakHistory,
  } = useStreakChallenge(difficulty, currency);

  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [coinDisplayKey, setCoinDisplayKey] = useState(0);

  const total = coins.reduce((sum, coin) => sum + coin.value, 0);

  const regenerateCoins = () => {
    setCoinDisplayKey((prev) => prev + 1);
  };

  const handleCheck = () => {
    const res = checkAnswer(input, total, mistakeCount, false);
    setResult(res.message);

    switch (res.type) {
      case 'correct':
        incrementStreak();
        setInput('');
        setMistakeCount(0);
        regenerateCoins();
        break;
      case 'wrong':
        setResult(`不正解！連続正解は ${streak} 回で終了です`);
        reset();
        setInput('');
        setMistakeCount(0);
        regenerateCoins();
        break;
    }
  };

  return (
    <div className="text-center mt-8">
      <h2 className="text-xl font-bold mb-2">連続正解チャレンジ</h2>
      <p className="mb-1">現在の連続正解数: {streak}</p>
      <p className="mb-4">🏆 "{DifficultyConfig[difficulty].label}" の{currency} での最高記録: {maxStreak} 問</p>

      <CoinDisplay
        key={coinDisplayKey}
        difficulty={difficulty}
        currency={currency}
        onCoinsChange={setCoins}
      />

      <AnswerInput
        input={input}
        onChange={setInput}
        onSubmit={handleCheck}
      />

      <button
        onClick={() => {
          reset();
          setInput('');
          setResult(null);
          setMistakeCount(0);
          regenerateCoins();
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