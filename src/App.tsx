import React, { useState, useEffect } from 'react';

type Coin = {
  id: number;
  type: keyof typeof COIN_TYPES;
  x: number;
  y: number;
  rotation: number;
  size: number;
};

const COIN_TYPES = {
  '1': { value: 1, img: '/coin_1yen.png' },
  '5': { value: 5, img: '/coin_5yen.png' },
  '10': { value: 10, img: '/coin_10yen.png' },
  '50': { value: 50, img: '/coin_50yen.png' },
  '100': { value: 100, img: '/coin_100yen.png' },
  '500': { value: 500, img: '/coin_500yen.png' },
} as const;

const COIN_TYPES_KEYS = Object.keys(COIN_TYPES) as (keyof typeof COIN_TYPES)[];

const DIFFICULTY_LEVELS = {
  easy: 5,
  normal: 15,
  hard: 30,
} as const;

type Difficulty = keyof typeof DIFFICULTY_LEVELS;

export const App: React.FC = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('normal');

  const generateCoins = (num: number) => {
    const newCoins: Coin[] = [];
    const placed: { x: number; y: number }[] = [];
    const minDistance = 5;

    const baseDiameter = 26.5;
    const baseSizePx = 48;
    const coinSizesPx = {
      '1': (20 / baseDiameter) * baseSizePx,
      '5': (22 / baseDiameter) * baseSizePx,
      '10': (23.5 / baseDiameter) * baseSizePx,
      '50': (21 / baseDiameter) * baseSizePx,
      '100': (22.6 / baseDiameter) * baseSizePx,
      '500': baseSizePx,
    };

    let tries = 0;
    while (newCoins.length < num && tries < num * 50) {
      tries++;

      const x = Math.random() * 90;
      const y = Math.random() * 70;
      const rotation = Math.random() * 360;

      const type = COIN_TYPES_KEYS[Math.floor(Math.random() * COIN_TYPES_KEYS.length)];
      const size = coinSizesPx[type];

      // 重なり判定（%単位だけどざっくりでOK）
      const isOverlapping = placed.some((p) => {
        const dx = x - p.x;
        const dy = y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < minDistance;
      });

      if (!isOverlapping) {
        newCoins.push({ id: newCoins.length, type, x, y, rotation, size });
        placed.push({ x, y });
      }
    }

    return newCoins;
  };

  useEffect(() => {
    const coinCount = DIFFICULTY_LEVELS[difficulty];
    setCoins(generateCoins(coinCount));
    setInput('');
    setResult(null);
  }, [difficulty]);

  const total = coins.reduce((acc, c) => acc + COIN_TYPES[c.type].value, 0);

  const [mistakeCount, setMistakeCount] = useState(0);

  const checkAnswer = () => {
    const num = Number(input);
    if (!/^\d+$/.test(input) || isNaN(num)) {
      setResult('数字を入力してください');
      return;
    }
    if (isNaN(num)) {
      setResult('数字を入力してください');
      return;
    }
    if (num === total) {
      setResult('正解！ 🎉');
      setMistakeCount(0); // 正解ならミスカウントリセット
    } else {
      const newCount = mistakeCount + 1;
      setMistakeCount(newCount);
      setInput('');
      if (newCount >= 3) {
        setResult(`3回間違えました。正しい合計は ${total} 円です。`);
        setMistakeCount(0); // リセットして再挑戦可能に
      } else {
        setResult(`不正解。あと${3 - newCount}回で正解が表示されます。`);
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">硬貨の合計金額を当てよう！</h1>

      {/* 難易度選択 */}
      <div className="flex justify-center gap-2 mb-4">
        {Object.keys(DIFFICULTY_LEVELS).map((key) => (
          <button
            key={key}
            className={`px-3 py-1 rounded border ${
              difficulty === key ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'
            }`}
            onClick={() => setDifficulty(key as Difficulty)}
          >
            {key === 'easy' && '簡単'}
            {key === 'normal' && '普通'}
            {key === 'hard' && '難しい'}
          </button>
        ))}
      </div>

      {/* 硬貨エリア */}
      <div
        className="relative bg-green-100 border rounded mb-4 overflow-hidden"
        style={{ aspectRatio: '4 / 3', width: '100%', maxWidth: '500px', margin: '0 auto' }}
      >
        {coins.map((coin) => (
          <img
            key={coin.id}
            src={COIN_TYPES[coin.type].img}
            alt={`${COIN_TYPES[coin.type].value}円硬貨`}
            className="absolute"
            style={{
              left: `${coin.x}%`,
              top: `${coin.y}%`,
              transform: `rotate(${coin.rotation}deg)`,
              width: `${coin.size}px`,
              height: `${coin.size}px`,
            }}
          />
        ))}
      </div>

      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        className="border rounded px-3 py-2 w-full text-base sm:text-lg mb-2"
        placeholder="合計金額を入力"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault(); // フォーム送信などのデフォルト動作を防ぐ
            checkAnswer();
          }
        }}
      />
      <button
        onClick={checkAnswer}
        className="bg-blue-600 text-white py-2 rounded w-full hover:bg-blue-700 transition"
      >
        チェック
      </button>
      <button
        onClick={() => {
          const coinCount = DIFFICULTY_LEVELS[difficulty];
          setCoins(generateCoins(coinCount));
          setInput('');
          setResult(null);
        }}
        className="bg-gray-400 text-white py-2 rounded w-full hover:bg-gray-500 transition mt-2"
      >
        リセット
      </button>

      {result && <p className="mt-3 text-center font-semibold">{result}</p>}
    </div>
  );
};