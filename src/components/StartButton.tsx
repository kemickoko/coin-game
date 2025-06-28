type Props = {
  onStart: () => void;
  disabled?: boolean;
};

export const StartButton: React.FC<Props> = ({ onStart, disabled }) => (
  <button
    onClick={onStart}
    disabled={disabled}
    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
  >
    3分チャレンジ開始
  </button>
);