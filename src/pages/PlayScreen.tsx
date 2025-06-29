import { useNavigate } from 'react-router-dom';
import { TimerChallenge } from '@/features/timerChallenge';
import { StreakChallenge } from '@/features/streakChallenge';
import { NormalMode } from '@/features/normalMode/components/NormalMode';
import { type Difficulty } from '@/components/DifficultySelector';
import { type ChallengeMode } from '@/components/ModeSelector';

type Props = {
  difficulty: Difficulty;
  mode: ChallengeMode;
};

export const PlayScreen: React.FC<Props> = ({ difficulty, mode }) => {
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
        {mode === 'normal' && <NormalMode difficulty={difficulty} />}
        {mode === 'timer' && <TimerChallenge difficulty={difficulty} />}
        {mode === 'streak' && <StreakChallenge difficulty={difficulty} />}
      </div>
    </div>
  );
};