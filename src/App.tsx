import { Routes, Route } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { HighScorePage } from '@/pages/HighScorePage';
import { PlayScreen } from '@/pages/PlayScreen';
import { useState } from 'react';
import { type Difficulty } from '@/components/DifficultySelector';
import { type ChallengeMode } from '@/components/ModeSelector';

export const App = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>('normal');
  const [mode, setMode] = useState<ChallengeMode>('normal');

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            difficulty={difficulty}
            mode={mode}
            onDifficultyChange={setDifficulty}
            onModeChange={setMode}
            onStart={() => {}}
          />
        }
      />
      <Route path="/highscores" element={<HighScorePage />} />
      <Route
        path="/play"
        element={
          <PlayScreen
            difficulty={difficulty}
            mode={mode}
          />
        }
      />
    </Routes>
  );
};