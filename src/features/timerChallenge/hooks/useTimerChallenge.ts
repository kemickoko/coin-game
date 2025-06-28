import { useEffect, useState } from 'react';
import { randomInt } from '@/utils/randomInt';
import { generateCoins } from '@/utils/generateCoins';
import type { Difficulty } from '@/constants/coins';
import { DIFFICULTY_RANGES } from '@/constants/coins';

export const useTimerChallenge = (difficulty: Difficulty) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const [correctCount, setCorrectCount] = useState(0);

  const regenerateCoins = () => {
    const [min, max] = DIFFICULTY_RANGES[difficulty];
    setCoins(generateCoins(randomInt(min, max)));
  };

  const [coins, setCoins] = useState(() => {
    const [min, max] = DIFFICULTY_RANGES[difficulty];
    return generateCoins(randomInt(min, max));
  });

  const start = () => {
    setIsPlaying(true);
    setTimeLeft(180);
    setCorrectCount(0);
    regenerateCoins();
  };

  const stop = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsPlaying(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  return {
    isPlaying,
    timeLeft,
    correctCount,
    coins,
    regenerateCoins,
    start,
    stop,
    incrementCorrect: () => setCorrectCount((prev) => prev + 1),
  };
};