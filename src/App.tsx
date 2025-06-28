import React, { useEffect, useState } from 'react';
import { COIN_TYPES, DIFFICULTY_LEVELS } from './constants/coins';
import { generateCoins } from './utils/generateCoins';
import { checkAnswer } from './utils/checkAnswer';
import { CoinArea } from './components/CoinArea';
import { DifficultySelector } from './components/DifficultySelector';
import { AnswerInput } from './components/AnswerInput';
import { ResultMessage } from './components/ResultMessage';
import type { Difficulty, Coin } from './constants/coins';

export const App: React.FC = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('normal');
  const [mistakeCount, setMistakeCount] = useState(0);

  const regenerateCoins = React.useCallback(() => {
    const count = DIFFICULTY_LEVELS[difficulty];
    setCoins(generateCoins(count));
    setInput('');
    setResult(null);
    setMistakeCount(0);
  }, [difficulty]);

  useEffect(() => {
    regenerateCoins();
  }, [regenerateCoins]);

  const total = coins.reduce((acc, c) => acc + COIN_TYPES[c.type].value, 0);

  const handleCheck = () => {
    const resultObj = checkAnswer(input, total, mistakeCount);
    setResult(resultObj.message);

    switch (resultObj.type) {
      case 'correct':
        setMistakeCount(0);
        break;
      case 'wrong':
        setMistakeCount(resultObj.newMistakeCount);
        setInput('');
        break;
      case 'maxAttempts':
        setMistakeCount(0);
        setInput('');
        break;
      case 'invalid':
        break;
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">硬貨の合計金額を当てよう！</h1>
      <DifficultySelector difficulty={difficulty} onChange={setDifficulty} />
      <CoinArea coins={coins} />
      <AnswerInput input={input} onChange={setInput} onSubmit={handleCheck} />
      <button
        onClick={regenerateCoins}
        className="bg-gray-400 text-white py-2 rounded w-full hover:bg-gray-500 transition mt-2"
      >
        リセット
      </button>
      <ResultMessage message={result} />
    </div>
  );
};