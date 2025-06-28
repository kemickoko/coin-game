import { useState, useEffect } from 'react';
import { randomInt } from '@/utils/randomInt';
import { generateCoins } from '@/utils/generateCoins';
import { type Difficulty, DifficultyConfig } from '@/components/DifficultySelector';

const STORAGE_KEY = 'streakHistory';

export const useStreakChallenge = (difficulty: Difficulty) => {
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [streakHistory, setStreakHistory] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setStreakHistory(parsed);
          setMaxStreak(Math.max(0, ...parsed));
        }
      } catch {
        // JSON parse error無視
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(streakHistory));
  }, [streakHistory]);

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
      setStreakHistory((prev) => [...prev, streak]);
    }
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
    streakHistory,
  };
};