import { useState, useEffect } from 'react';
import { randomInt } from '@/utils/randomInt';
import { generateCoins } from '@/utils/generateCoins';
import { type Difficulty, DifficultyConfig } from '@/components/DifficultySelector';



export const useStreakChallenge = (difficulty: Difficulty) => {
  const STREAKMAX_KEY = `streakMax-${difficulty}`;
  const STREAKHISTORY_KEY = `streakHistory-${difficulty}`;
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(() => {
    const stored = localStorage.getItem(STREAKMAX_KEY);
    return stored ? Number(stored) : 0;
  });

  const [streakHistory, setStreakHistory] = useState<number[]>(() => {
    const stored = localStorage.getItem(STREAKHISTORY_KEY);
    try {
      const parsed = stored ? JSON.parse(stored) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

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
      setStreakHistory((prev) => {
        const updated = [...prev, streak];
        localStorage.setItem(STREAKHISTORY_KEY, JSON.stringify(updated));
        return updated;
      });
    }
    setStreak(0);
    regenerateCoins();
  };

  const incrementStreak = () => {
    setStreak((prev) => prev + 1);
    regenerateCoins();
  };

  useEffect(() => {
    if (streak > maxStreak) {
      setMaxStreak(streak);
    }
  }, [streak, maxStreak]);

  useEffect(() => {
    localStorage.setItem(STREAKMAX_KEY, String(maxStreak));
  }, [maxStreak]);

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