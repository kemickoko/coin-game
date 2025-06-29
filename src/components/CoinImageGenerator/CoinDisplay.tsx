import { useEffect, useState } from 'react';
import { generateCoins, type Currency } from './generateCoins';
import { DifficultyConfig, type Difficulty } from '@/components/DifficultySelector';
import { CoinImage } from './CoinImage';
import type { Coin } from './types';

type Props = {
  difficulty: Difficulty;
  currency?: Currency;
  onCoinsChange?: (coins: Coin[]) => void;
  regenerateTrigger?: number;
};

export const CoinDisplay: React.FC<Props> = ({
  difficulty,
  currency = 'JPY',
  onCoinsChange,
  regenerateTrigger,
}) => {
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    const [min, max] = DifficultyConfig[difficulty].range;
    const count = Math.floor(Math.random() * (max - min + 1)) + min;

    const newCoins = generateCoins(count, currency);
    setCoins(newCoins);
    if (onCoinsChange) {
      onCoinsChange(newCoins);
    }
  }, [difficulty, currency, regenerateTrigger]);

  return (
    <div
      className="relative bg-green-100 border rounded mb-4 overflow-hidden"
      style={{ aspectRatio: '4 / 3', width: '100%', maxWidth: 500, margin: '0 auto' }}
    >
      {coins.map((coin) => (
        <CoinImage
          key={coin.id}
          src={coin.img}
          alt={`${coin.value} ${currency}硬貨`}
          x={coin.x}
          y={coin.y}
          rotation={coin.rotation}
          size={coin.size}
        />
      ))}
    </div>
  );
};