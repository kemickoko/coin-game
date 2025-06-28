import { useState } from 'react';
import { randomInt } from '@/utils/randomInt';
import { generateCoins } from '@/utils/generateCoins';
import { DIFFICULTY_RANGES } from '@/constants/coins';
import type { Difficulty } from '@/constants/coins';

export const useStreakChallenge = (difficulty: Difficulty) => {
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  const [coins, setCoins] = useState(() => {
    const [min, max] = DIFFICULTY_RANGES[difficulty];
    return generateCoins(randomInt(min, max));
  });

  const regenerateCoins = () => {
    const [min, max] = DIFFICULTY_RANGES[difficulty];
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