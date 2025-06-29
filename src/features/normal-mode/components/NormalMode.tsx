import { useState } from 'react';
import { CoinDisplay } from '@/components/coin-image-generator/CoinDisplay';
import { AnswerInput } from '@/components/AnswerInput';
import { checkAnswer } from '@/utils/checkAnswer';
import { type Coin } from '@/components/coin-image-generator/types';
import { type Currency } from '@/components/coin-image-generator/constants';
import { type Difficulty } from '@/components/difficulty-selector';


type Props = {
  difficulty: Difficulty;
  currency: Currency;
};

export const NormalMode = ({ difficulty, currency }: Props) => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [coinKey, setCoinKey] = useState(0);
  const [maxAttemptsReached, setMaxAttemptsReached] = useState(false);

  // 合計金額を計算
  const total = coins.reduce((sum, coin) => sum + coin.value, 0);

  const handleCheck = () => {
    if (maxAttemptsReached) {
      setResult(null);
      setInput('');
      setMaxAttemptsReached(false);
      regenerateCoins();
      return;
    }

    const res = checkAnswer(input, total, mistakeCount, false);
    setResult(res.message);

    switch (res.type) {
      case 'correct':
        setResult(res.message);
        setMistakeCount(0);
        setInput('');
        regenerateCoins();
        break;
      case 'wrong':
        setResult(res.message);
        if (typeof res.newMistakeCount === 'number') {
          setMistakeCount(res.newMistakeCount);
        }
        break;
      case 'maxAttempts':
        setResult(res.message);
        setMistakeCount(0);
        setInput('');
        setMaxAttemptsReached(true);
        break;
    }
  };

  const regenerateCoins = () => {
    setInput('');
    setResult(null);
    setMistakeCount(0);
    setCoinKey((prev) => prev + 1);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">
        硬貨の合計金額を当てよう！（通常モード）
      </h1>

      {/* コイン表示 */}
      <CoinDisplay
        key={coinKey}
        difficulty={difficulty}
        currency={currency}
        onCoinsChange={setCoins}
      />

      {/* 入力とチェック */}
      <AnswerInput
        input={input}
        onChange={setInput}
        onSubmit={handleCheck}
      />
      <button
        onClick={regenerateCoins}
        className="bg-gray-400 text-white py-2 rounded w-full hover:bg-gray-500 transition mt-2"
      >
        リセット
      </button>

      {result && <p className="mt-3 text-center font-semibold">{result}</p>}
    </div>
  );
};