import { Routes, Route } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { HighScorePage } from '@/pages/HighScorePage';
import { PlayScreen } from '@/pages/PlayScreen';
import { useState } from 'react';
import { type Difficulty } from '@/components/difficulty-selector';
import { type ChallengeMode } from '@/components/mode-selector';
import { SUPPORTED_CURRENCIES, type Currency } from '@/components/coin-image-generator/constants';

export const App = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>(() => 'normal');
  const [mode, setMode] = useState<ChallengeMode>(() => 'normal');
  const [currency, setCurrency] = useState<Currency>(SUPPORTED_CURRENCIES[0].code);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            difficulty={difficulty}
            mode={mode}
            currency={currency}
            onDifficultyChange={setDifficulty}
            onModeChange={setMode}
            onStart={() => {}}
            onCurrencyChange={setCurrency}
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
            currency={currency}
          />
        }
      />
    </Routes>
  );
};