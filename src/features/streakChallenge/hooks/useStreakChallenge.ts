import { useState } from 'react';
import { randomInt } from '@/utils/randomInt';
import { generateCoins } from '@/utils/generateCoins';
import { type Difficulty, DifficultyConfig } from '@/components/DifficultySelector';
import { useHistoryStorage } from '@/hooks/useHistoryStorage';



export const useStreakChallenge = (difficulty: Difficulty) => {
  const historyKey = `streakHistory-${difficulty}`;
  const maxKey = `streakHighScore-${difficulty}`;

  const {
    history: streakHistory,
    addRecord,
    max: maxStreak,
  } = useHistoryStorage(historyKey, maxKey);

  const [streak, setStreak] = useState(0);

  const [coins, setCoins] = useState(() => {
    const [min, max] = DifficultyConfig[difficulty].range;
    return generateCoins(randomInt(min, max));
  });

  const regenerateCoins = () => {
    const [min, max] = DifficultyConfig[difficulty].range;
    setCoins(generateCoins(randomInt(min, max)));
  };

   const reset = () => {
    if (streak > 0) {
      addRecord(streak);
    }
    setStreak(0);
    regenerateCoins();
  };

  const incrementStreak = () => {
    setStreak((prev) => prev + 1);
    regenerateCoins();
  };

  return {
    coins,
    regenerateCoins,
    streak,
    maxStreak,
    reset,
    incrementStreak,
    streakHistory,
  };
};