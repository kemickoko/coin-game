import { useNavigate } from 'react-router-dom';
import { TimerChallenge } from '@/features/timer-challenge';
import { StreakChallenge } from '@/features/streak-challenge';
import { NormalMode } from '@/features/normal-mode/components/NormalMode';
import { type Difficulty } from '@/components/difficulty-selector';
import { type ChallengeMode } from '@/components/mode-selector';
import { type Currency } from '@/components/coin-image-generator/constants';

type Props = {
  difficulty: Difficulty;
  mode: ChallengeMode;
  currency: Currency;
};

export const PlayScreen: React.FC<Props> = ({ difficulty, mode, currency }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen max-w-xl mx-auto p-4 text-center flex flex-col">
      <button
        onClick={() => navigate('/')}
        className="mb-4 px-3 py-1 rounded border bg-gray-200 hover:bg-gray-300 self-start"
      >
        ← モード選択に戻る
      </button>

      <div className="flex-grow">
        {mode === 'normal' && <NormalMode difficulty={difficulty} currency={currency} />}
        {mode === 'timer' && <TimerChallenge difficulty={difficulty} currency={currency} />}
        {mode === 'streak' && <StreakChallenge difficulty={difficulty} currency={currency} />}
      </div>
    </div>
  );
};