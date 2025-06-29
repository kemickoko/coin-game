import { DifficultySelector, type Difficulty } from '@/components/DifficultySelector';
import { ModeSelector } from '@/components/ModeSelector';
import { MODE_CONFIG, type ChallengeMode } from '@/components/ModeSelector';
import { useNavigate, Link } from 'react-router-dom';

type Props = {
  difficulty: Difficulty;
  mode?: ChallengeMode;
  onDifficultyChange: (d: Difficulty) => void;
  onModeChange: (m: ChallengeMode) => void;
  onStart: () => void;
};

export const Home: React.FC<Props> = ({
  difficulty,
  mode,
  onDifficultyChange,
  onModeChange,
}) => {
  const navigate = useNavigate();

  const handleStart = () => {
    if (mode) {
      navigate('/play');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-8">硬貨の合計金額を当てよう！</h1>

      <h2 className="text-xl mb-2">難易度を選択してください</h2>
      <DifficultySelector difficulty={difficulty} onSelect={onDifficultyChange} />

      <h2 className="text-xl mt-6 mb-2">モードを選択してください</h2>
      <ModeSelector options={MODE_CONFIG} selectedMode={mode} onSelect={onModeChange} />
      <div className="mt-8 space-y-4 flex flex-col items-center">
        <button
          disabled={!mode}
          onClick={handleStart}
          className={`px-4 py-2 rounded text-white w-1/2 ${
            !mode ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          スタート！
        </button>

        <Link
          to="/highscores"
          className="block px-4 py-2 rounded text-white bg-green-600 hover:bg-green-700 w-1/2 text-center"
        >
          ハイスコア一覧
        </Link>
      </div>
    </div>
  );
};