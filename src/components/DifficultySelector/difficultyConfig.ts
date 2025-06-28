export type Difficulty = 'easy' | 'normal' | 'hard';

export const DifficultyConfig = {
  easy: {
    range: [3, 7] as const,
    label: '簡単',
    color: 'blue',
  },
  normal: {
    range: [10, 20] as const,
    label: '普通',
    color: 'green',
  },
  hard: {
    range: [25, 35] as const,
    label: '難しい',
    color: 'red',
  },
} as const;