import { useState } from 'react';
import { randomInt } from '@/utils/randomInt';
import { generateCoins } from '@/components/coin-image-generator/generateCoins';
import { useHistoryStorage } from '@/hooks/useHistoryStorage';
import { type Currency } from '@/components/coin-image-generator/constants';
import { type Difficulty, DifficultyConfig } from '@/components/difficulty-selector';



export const useStreakChallenge = (difficulty: Difficulty, currencyCode: Currency) => {
  const historyKey = `streakChallengeHistory-${difficulty}-${currencyCode}`;
  const maxKey = `streakChallengeHighScore-${difficulty}-${currencyCode}`;

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