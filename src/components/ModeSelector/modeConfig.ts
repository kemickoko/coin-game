import type { ReactNode } from 'react';

export type ChallengeMode = 'normal' | 'timer' | 'streak';

export type ModeOption = {
  id: ChallengeMode;
  label: string;
  color: 'green' | 'purple' | 'pink' | string;
  description?: string;
  icon?: ReactNode;
};

export type ModeSelectorProps = {
  options: ModeOption[];
  selectedMode?: ChallengeMode;
  onSelect: (id: ChallengeMode) => void;
};

export const MODE_CONFIG: ModeOption[] = [
  { id: 'normal', label: '通常モード', color: 'green' },
  { id: 'timer', label: '3分チャレンジ', color: 'purple' },
  { id: 'streak', label: '連続正解チャレンジ', color: 'pink' },
];