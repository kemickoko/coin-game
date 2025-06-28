import { useState } from 'react';
import { randomInt } from '@/utils/randomInt';
import { generateCoins } from '@/utils/generateCoins';
import { type Difficulty, DifficultyConfig } from '@/components/DifficultySelector';

export const useStreakChallenge = (difficulty: Difficulty) => {
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  const [coins, setCoins] = useState(() => {
    const [min, max] = DifficultyConfig[difficulty].range;
    return generateCoins(randomInt(min, max));
  });

  const regenerateCoins = () => {
    const [min, max] = DifficultyConfig[difficulty].range;
    setCoins(generateCoins(randomInt(min, max)));
  };

  const reset = () => {
    setStreak(0);
    regenerateCoins();
  };

  const incrementStreak = () => {
    setStreak((prev) => {
      const updated = prev + 1;
      setMaxStreak((max) => Math.max(max, updated));
      return updated;
    });
    regenerateCoins();
  };

  return {
    coins,
    regenerateCoins,
    streak,
    maxStreak,
    reset,
    incrementStreak,
  };
};