import React from 'react';
import type { ModeSelectorProps } from '@/components/ModeSelector/modeConfig';

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
              className={`flex flex-col items-center p-4 rounded-lg border
                transition
                ${isSelected ? `bg-${color}-600 text-white` : `bg-white text-${color}-600 hover:bg-${color}-100`}
                focus:outline-none focus:ring-2 focus:ring-${color}-400`}
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