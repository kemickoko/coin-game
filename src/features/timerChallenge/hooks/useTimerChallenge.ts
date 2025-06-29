import { useEffect, useState, useCallback, useRef } from 'react';
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
    if (localMax > highScore) {
      setHighScore(localMax);
    }
  }, [localMax, highScore]);

  useEffect(() => {
    localStorage.setItem(highScoreKey, String(highScore));
  }, [highScore]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const [correctCount, setCorrectCount] = useState(0);

  // 最新のcorrectCountを参照するためのrefを用意
  const correctCountRef = useRef(correctCount);
  useEffect(() => {
    correctCountRef.current = correctCount;
  }, [correctCount]);

  const [coins, setCoins] = useState(() => {
    const [min, max] = DifficultyConfig[difficulty].range;
    return generateCoins(randomInt(min, max));
  });

  const regenerateCoins = useCallback(() => {
    const [min, max] = DifficultyConfig[difficulty].range;
    setCoins(generateCoins(randomInt(min, max)));
  }, [difficulty]);

  const start = useCallback(() => {
    setIsPlaying(true);
    setTimeLeft(180);
    setCorrectCount(0);
    regenerateCoins();
  }, [regenerateCoins]);

  // stopはcorrectCountをrefから取得
  const stop = useCallback(() => {
    setIsPlaying(false);
    const currentCount = correctCountRef.current;
    if (currentCount > 0) {
      addRecord(currentCount);
    }
    if (currentCount > highScore) {
      setHighScore(currentCount);
    }
  }, [addRecord, highScore]);

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
  }, [isPlaying, stop]);

  return {
    isPlaying,
    timeLeft,
    correctCount,
    highScore,
    timerHistory,
    coins,
    setCoins,
    regenerateCoins,
    start,
    stop,
    incrementCorrect: () => setCorrectCount((prev) => prev + 1),
  };
};