import { useState } from 'react';
import { Home } from '@/pages/Home';
import { NormalMode } from '@/features/normalMode/components/NormalMode';
import { TimerChallenge } from './features/timerChallenge';
import { StreakChallenge } from './features/streakChallenge';
import { type Difficulty } from '@/components/DifficultySelector';
import { type ChallengeMode } from '@/components/ModeSelector';


export const App = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>('normal');
  const [mode, setMode] = useState<ChallengeMode | undefined>(undefined);
  const [started, setStarted] = useState(false);

  const handleStart = () => {
      if (mode) {
        setStarted(true);
      }
    };

    const handleBackToHome = () => {
      setStarted(false);
    };

    if (!started) {
      return (
        <Home
          difficulty={difficulty}
          mode={mode}
          onDifficultyChange={setDifficulty}
          onModeChange={setMode}
          onStart={handleStart}
        />
      );
    }

  return (
    <div className="max-w-xl mx-auto p-4 text-center">
      <button
        onClick={handleBackToHome}
        className="mb-4 px-3 py-1 rounded border bg-gray-200 hover:bg-gray-300"
      >
        ← モード選択に戻る
      </button>

      {/* モードごとの表示切り替え */}
      {mode === 'normal' && <NormalMode difficulty={difficulty} />}
      {mode === 'timer' && <TimerChallenge difficulty={difficulty} />}
      {mode === 'streak' && <StreakChallenge difficulty={difficulty} />}
    </div>
  );
};