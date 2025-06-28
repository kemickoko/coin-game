import { useState } from 'react';
import { useTimerChallenge } from '@/features/timerChallenge/hooks/useTimerChallenge';
import { checkAnswer } from '@/utils/checkAnswer';
import { CoinArea } from '@/components/CoinArea';
import { COIN_TYPES } from '@/constants/coins';
import type { Difficulty } from '@/constants/coins';

type Props = {
  difficulty: Difficulty;
};

export const TimerChallenge = ({ difficulty }: Props) => {
  const {
    isPlaying,
    timeLeft,
    correctCount,
    coins,
    regenerateCoins,
    start,
    stop,
    incrementCorrect,
  } = useTimerChallenge(difficulty);

  const total = coins.reduce((sum, coin) => sum + COIN_TYPES[coin.type].value, 0);
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [mistakeCount, setMistakeCount] = useState(0);

  const handleCheck = () => {
    const res = checkAnswer(input, total, mistakeCount, true);
    setResult(res.message);

    switch (res.type) {
      case 'correct':
        incrementCorrect();
        setInput('');
        setMistakeCount(0);
        regenerateCoins();
        break;
      case 'wrong':
        if (typeof res.newMistakeCount === 'number') {
          setMistakeCount(res.newMistakeCount);
        }
        setInput('');
        break;
      case 'maxAttempts':
        setMistakeCount(0);
        setInput('');
        break;
    }
  };

  return (
    <div className="text-center mt-8">
      <h2 className="text-xl font-bold mb-2">3分チャレンジ</h2>

      {!isPlaying ? (
        <button
          onClick={start}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          スタート
        </button>
      ) : (
        <>
          <p className="text-lg font-medium mb-2">残り時間: {timeLeft} 秒</p>
          <p className="mb-2">正解数: {correctCount} 問</p>

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
              stop();
              setInput('');
              setResult(null);
              setMistakeCount(0);
            }}
            className="bg-red-600 text-white py-2 rounded w-full hover:bg-red-700 transition mt-2"
          >
            終了してリセット
          </button>

          {result && <p className="mt-2 font-semibold">{result}</p>}
        </>
      )}
    </div>
  );
};