import { useState } from 'react';
import { useTimerChallenge } from '@/features/timer-challenge/hooks/useTimerChallenge';
import { AnswerInput } from '@/components/ui/AnswerInput';
import { checkAnswer } from '@/utils/checkAnswer';
import { CoinDisplay } from '@/components/coin-image-generator/CoinDisplay';
import { useInputFocusControl } from '@/hooks/useInputFocusControl';
import { type Difficulty, DifficultyConfig } from '@/components/difficulty-selector';
import { type Currency } from '@/components/coin-image-generator/constants';



type Props = {
  difficulty: Difficulty;
  currency: Currency;
};

export const TimerChallenge = ({ difficulty, currency }: Props) => {

  useInputFocusControl();

  const {
    isPlaying,
    timeLeft,
    correctCount,
    highScore,
    timerHistory,
    coins,
    setCoins,
    start,
    stop,
    incrementCorrect,
  } = useTimerChallenge(difficulty, currency);

  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [regenerateKey, setRegenerateKey] = useState(0);

  const total = coins.reduce((sum, coin) => sum + coin.value, 0);

  const handleCheck = () => {
    if (!isPlaying) return;

    const res = checkAnswer(input, total, mistakeCount, true);
    setResult(res.message);

    switch (res.type) {
      case 'correct':
        incrementCorrect();
        setInput('');
        setMistakeCount(0);
        setRegenerateKey((prev) => prev + 1);
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
    <div className="text-center mt-8 max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">3分チャレンジ</h2>

      {!isPlaying ? (
        <button
          onClick={() => {
            setRegenerateKey((prev) => prev + 1);
            start();
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          スタート
        </button>
      ) : (
        <>
          <p className="text-lg font-medium mb-2">残り時間: {timeLeft} 秒</p>
          <p className="mb-2">正解数: {correctCount} 問</p>
          <p className="mb-4">
            🏆 "{DifficultyConfig[difficulty].label}" の{currency} での最高記録: {highScore} 問
          </p>

          <CoinDisplay
           difficulty={difficulty}
           currency={currency}
           onCoinsChange={(newCoins) => setCoins(newCoins)}
           regenerateTrigger={regenerateKey}
          />

          <AnswerInput
            input={input}
            onChange={setInput}
            onSubmit={handleCheck}
          />

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

          {timerHistory.length > 0 && (
            <div className="mt-6 text-left max-w-sm mx-auto">
              <h3 className="font-semibold mb-2">過去の正解数記録</h3>
              <ul className="list-disc list-inside text-sm text-gray-700 max-h-48 overflow-auto">
                {timerHistory.map((count, i) => (
                  <li key={i}>
                    {i + 1} 回目: {count} 問正解
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};