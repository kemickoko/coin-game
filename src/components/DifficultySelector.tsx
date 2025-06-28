import React from 'react';
import { DIFFICULTY_LEVELS } from '../constants/coins';
import type { Difficulty } from '../constants/coins';

type Props = {
  difficulty: Difficulty;
  onChange: (difficulty: Difficulty) => void;
};

export const DifficultySelector: React.FC<Props> = ({ difficulty, onChange }) => (
  <div className="flex justify-center gap-2 mb-4">
    {Object.keys(DIFFICULTY_LEVELS).map((key) => (
      <button
        key={key}
        className={`px-3 py-1 rounded border ${
          difficulty === key ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'
        }`}
        onClick={() => onChange(key as Difficulty)}
      >
        {key === 'easy' && '簡単'}
        {key === 'normal' && '普通'}
        {key === 'hard' && '難しい'}
      </button>
    ))}
  </div>
);