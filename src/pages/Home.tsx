import { DifficultySelector, type Difficulty } from '@/components/DifficultySelector';
import { ModeSelector } from '@/components/ModeSelector';
import { MODE_CONFIG, type ChallengeMode } from '@/components/ModeSelector/modeConfig';

type Props = {
  difficulty: Difficulty;
  mode: ChallengeMode;
  onDifficultyChange: (d: Difficulty) => void;
  onModeChange: (m: ChallengeMode) => void;
  onStart: () => void;
};

export const Home: React.FC<Props> = ({
  difficulty,
  mode,
  onDifficultyChange,
  onModeChange,
  onStart,
}) => {
  return (
    <div className="max-w-xl mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-8">硬貨の合計金額を当てよう！</h1>

      <h2 className="text-xl mb-2">難易度を選択してください</h2>
      <DifficultySelector difficulty={difficulty} onSelect={onDifficultyChange} />

      <h2 className="text-xl mt-6 mb-2">モードを選択してください</h2>
      <ModeSelector options={MODE_CONFIG} selectedMode={mode} onSelect={onModeChange} />

      <button
        disabled={mode === 'none'}
        onClick={onStart}
        className={`px-4 py-2 rounded text-white ${
          mode === 'none' ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        スタート！
      </button>
    </div>
  );
};