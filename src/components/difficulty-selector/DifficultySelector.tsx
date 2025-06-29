import { type Difficulty, DifficultyConfig } from '@/components/difficulty-selector';

type Props = {
  difficulty: Difficulty;
  onSelect: (difficulty: Difficulty) => void;
};

export const DifficultySelector = ({ difficulty, onSelect }: Props) => {
  return (
    <div className="flex justify-center gap-2 mb-4">
      {(Object.keys(DifficultyConfig) as Difficulty[]).map((key) => (
        <button
          key={key}
          className={`px-3 py-1 rounded border ${
            difficulty === key
              ? `bg-${DifficultyConfig[key].color}-600 text-white`
              : `bg-white text-${DifficultyConfig[key].color}-600`
          }`}
          onClick={() => onSelect(key)}
        >
          {DifficultyConfig[key].label}
        </button>
      ))}
    </div>
  );
};