export type Difficulty = 'easy' | 'normal' | 'hard';

export const DifficultyConfig = {
  easy: {
    range: [3, 7] as const,
    label: '簡単',
    // もし必要なら他の設定もここに追加
  },
  normal: {
    range: [10, 20] as const,
    label: '普通',
  },
  hard: {
    range: [25, 35] as const,
    label: '難しい',
  },
} as const;