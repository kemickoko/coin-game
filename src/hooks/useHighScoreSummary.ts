import { DifficultyConfig } from '@/components/difficulty-selector';
import { type Currency, SUPPORTED_CURRENCIES } from '@/components/coin-image-generator/constants';

const timerKey = 'timerChallengeHighScore';
const streakKey = 'streakChallengeHighScore';

export type HighScoreSummary = {
  difficulty: string;
  label: string;
  currency: Currency;
  timerScore: number;
  streakScore: number;
};

export const useHighScoreSummary = (): HighScoreSummary[] => {
  const summary: HighScoreSummary[] = [];

  for (const currency of SUPPORTED_CURRENCIES) {
    for (const [difficulty, config] of Object.entries(DifficultyConfig)) {
      const timerScore =
        Number(localStorage.getItem(`${timerKey}-${difficulty}-${currency.code}`)) || 0;
      const streakScore =
        Number(localStorage.getItem(`${streakKey}-${difficulty}-${currency.code}`)) || 0;

      summary.push({
        difficulty,
        label: config.label,
        currency: currency.code,
        timerScore,
        streakScore,
      });
    }
  }

  return summary;
};