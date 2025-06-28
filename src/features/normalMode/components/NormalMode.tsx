import { useState, useEffect } from 'react';
import { COIN_TYPES } from '@/constants/coins';
import { DifficultyConfig, type Difficulty } from '@/components/DifficultySelector';
import { generateCoins } from '@/utils/generateCoins';
import { checkAnswer } from '@/utils/checkAnswer';
import { CoinArea } from '@/components/CoinArea';
import { randomInt } from '@/utils/randomInt';

type Props = {
  difficulty: Difficulty;
};

export const NormalMode = ({ difficulty }: Props) => {
  const [coins, setCoins] = useState(() => {
    const [min, max] = DifficultyConfig[difficulty].range;
    return generateCoins(randomInt(min, max));
  });
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [mistakeCount, setMistakeCount] = useState(0);

  const total = coins.reduce((sum, coin) => sum + COIN_TYPES[coin.type].value, 0);

  const regenerateCoins = () => {
    const [min, max] = DifficultyConfig[difficulty].range;
    setCoins(generateCoins(randomInt(min, max)));
    setInput('');
    setResult(null);
    setMistakeCount(0);
  };

  const handleCheck = () => {
    const res = checkAnswer(input, total, mistakeCount, true);
    setResult(res.message);

    switch (res.type) {
      case 'correct':
        setMistakeCount(0);
        break;
      case 'wrong':
        if (typeof res.newMistakeCount === 'number') {
          setMistakeCount(res.newMistakeCount);
        }
        setInput('');
        break;
      case 'maxAttempts':
        setResult(`正解は ${total} 円です`);
        setMistakeCount(0);
        break;
    }
  };

  useEffect(() => {
    regenerateCoins();
  }, [difficulty]);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">硬貨の合計金額を当てよう！（通常モード）</h1>

      {/* コイン表示 */}
      <CoinArea coins={coins} />

      {/* 入力とチェック */}
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        className="border rounded px-3 py-2 w-full text-base sm:text-lg mb-2"
        placeholder="合計金額を入力"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleCheck();
        }}
      />
      <button
        onClick={handleCheck}
        className="bg-blue-600 text-white py-2 rounded w-full hover:bg-blue-700 transition"
      >
        チェック
      </button>
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