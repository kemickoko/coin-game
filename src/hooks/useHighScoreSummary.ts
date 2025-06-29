import { DifficultyConfig } from '@/components/DifficultySelector';

const timerKey = 'timerChallengeHighScore';
const streakKey = 'streakHighScore';

export const useHighScoreSummary = () => {
  return Object.entries(DifficultyConfig).map(([difficulty, config]) => {
    const timerScore = Number(localStorage.getItem(`${timerKey}-${difficulty}`)) || 0;
    const streakScore = Number(localStorage.getItem(`${streakKey}-${difficulty}`)) || 0;

    return {
      difficulty: difficulty,
      label: config.label,
      timerScore,
      streakScore,
    };
  });
};