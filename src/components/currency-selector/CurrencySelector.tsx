import { type Currency, SUPPORTED_CURRENCIES } from '@/components/coin-image-generator/constants';

type Props = {
  value: Currency;
  onChange: (currency: Currency) => void;
};

export const CurrencySelector: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="text-left mb-4 flex flex-col items-center">
      <select
        id="currency"
        value={value}
        onChange={(e) => onChange(e.target.value as Currency)}
        className="border-2 border-blue-500 text-lg font-medium rounded px-4 py-2 w-2/3 max-w-xs shadow-sm hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      >
        {SUPPORTED_CURRENCIES.map(({ code, label }) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};