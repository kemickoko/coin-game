import React, { useState } from 'react';
import { COIN_TYPES } from './constants/coins';
import { checkAnswer } from './utils/checkAnswer';
import { useTimerChallenge } from './hooks/useTimerChallenge';
import { CoinArea } from './components/CoinArea';
import { DifficultySelector } from './components/DifficultySelector';
import { AnswerInput } from './components/AnswerInput';
import { ResultMessage } from './components/ResultMessage';
import { TimerDisplay } from './components/TimerDisplay';
import { StartButton } from './components/StartButton';
import type { Difficulty } from './constants/coins';

export const App: React.FC = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>('normal');
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

  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [streak, setStreak] = useState(0);

  const total = coins.reduce((acc, c) => acc + COIN_TYPES[c.type].value, 0);

  const handleCheck = () => {
    const resultObj = checkAnswer(input, total, mistakeCount);
    setResult(resultObj.message);

    switch (resultObj.type) {
      case 'correct':
        setStreak((prev) => prev + 1);
        setMistakeCount(0);
        setInput('');
        regenerateCoins();
        if (isPlaying) incrementCorrect();
        break;
      case 'wrong':
        setMistakeCount(resultObj.newMistakeCount);
        setInput('');
        setStreak(0);
        break;
      case 'maxAttempts':
        setMistakeCount(0);
        setInput('');
        setStreak(0);
        break;
      case 'invalid':
        break;
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">硬貨の合計金額を当てよう！</h1>

      <DifficultySelector difficulty={difficulty} onChange={setDifficulty} />

      <TimerDisplay
        isPlaying={isPlaying}
        timeLeft={timeLeft}
        correctCount={correctCount}
      />

      {!isPlaying && (
        <div className="flex justify-center mb-4">
          <StartButton onStart={start} />
        </div>
      )}
      {isPlaying && (
        <div className="flex justify-center mt-4 gap-2">
          <button
            onClick={() => {
              stop();       // チャレンジ終了
              reset();
              setInput(''); // 入力リセット
              setResult(null);
              setMistakeCount(0);
              setStreak(0);
              setTimeLeft(180);
              setCorrectCount(0);
              regenerateCoins(); // コインもリセット
            }}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            終了してリセット
          </button>
        </div>
      )}

      <CoinArea coins={coins} />

      <AnswerInput input={input} onChange={setInput} onSubmit={handleCheck} />

      <button
        onClick={regenerateCoins}
        className="bg-gray-400 text-white py-2 rounded w-full hover:bg-gray-500 transition mt-2"
      >
        リセット
      </button>

      <ResultMessage message={result} />

      {!isPlaying && timeLeft === 0 && (
        <p className="text-center font-bold text-xl text-blue-600 mt-4">
          タイムアップ！ 正解数: {correctCount} 回
        </p>
      )}
    </div>
  );
};