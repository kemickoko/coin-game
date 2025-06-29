import React from 'react';
import type { ModeSelectorProps } from '@/components/mode-selector/modeConfig';
import { selectedClassMap, unselectedClassMap } from '@/styles/colorClasses';

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  options,
  selectedMode,
  onSelect,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6 flex-wrap">
      {options
        .map(({ id, label, color, description, icon }) => {
          const isSelected = selectedMode === id;
          return (
            <button
              key={id}
              onClick={() => onSelect(id)}
              className={`flex flex-col items-center p-4 rounded-lg border transition focus:outline-none focus:ring-2 ${
                isSelected ? selectedClassMap[color] : unselectedClassMap[color]}`}
              style={{ minWidth: 120 }}
              aria-pressed={isSelected}
            >
              {icon && <div className="mb-2">{icon}</div>}
              <span className="font-semibold text-lg">{label}</span>
              {description && <small className="mt-1 text-sm">{description}</small>}
            </button>
          );
        })}
    </div>
  );
};