import { useEffect, useState } from 'react';
import { randomInt } from '@/utils/randomInt';
import { generateCoins } from '@/components/CoinImageGenerator/generateCoins';
import { type Difficulty, DifficultyConfig } from '@/components/DifficultySelector';
import { useHistoryStorage } from '@/hooks/useHistoryStorage';


export const useTimerChallenge = (difficulty: Difficulty) => {
  const historyKey = `timerChallengeHistory-${difficulty}`;
  const highScoreKey = `timerChallengeHighScore-${difficulty}`;

  const {
    history: timerHistory,
    addRecord,
    max: localMax,
  } = useHistoryStorage(historyKey);

  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem(highScoreKey);
    return saved ? Number(saved) : localMax;
  });

  useEffect(() => {
    localStorage.setItem(highScoreKey, String(highScore));
  }, [highScore]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const [correctCount, setCorrectCount] = useState(0);

  const [coins, setCoins] = useState(() => {
    const [min, max] = DifficultyConfig[difficulty].range;
    return generateCoins(randomInt(min, max));
  });

  const regenerateCoins = () => {
    const [min, max] = DifficultyConfig[difficulty].range;
    setCoins(generateCoins(randomInt(min, max)));
  };

  const start = () => {
    setIsPlaying(true);
    setTimeLeft(180);
    setCorrectCount(0);
    regenerateCoins();
  };

  const stop = () => {
    setIsPlaying(false);
    if (correctCount > 0) {
      addRecord(correctCount);
    }
    if (correctCount > highScore) {
      setHighScore(correctCount);
    }
  };

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          stop();
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
    highScore,
    timerHistory,
    coins,
    regenerateCoins,
    start,
    stop,
    incrementCorrect: () => setCorrectCount((prev) => prev + 1),
  };
};