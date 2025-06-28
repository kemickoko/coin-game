type Props = {
  input: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export const AnswerInput: React.FC<Props> = ({ input, onChange, onSubmit }) => (
  <>
    <input
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      className="border rounded px-3 py-2 w-full text-base sm:text-lg mb-2"
      placeholder="合計金額を入力"
      value={input}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          onSubmit();
        }
      }}
    />
    <button
      onClick={onSubmit}
      className="bg-blue-600 text-white py-2 rounded w-full hover:bg-blue-700 transition"
    >
      チェック
    </button>
  </>
);