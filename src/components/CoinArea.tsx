import { COIN_TYPES } from '../constants/coins';
import { CoinImage } from './CoinImage';
import type { Coin } from '../constants/coins';

type Props = {
  coins: Coin[];
};

export const CoinArea: React.FC<Props> = ({ coins }) => (
  <div
    className="relative bg-green-100 border rounded mb-4 overflow-hidden"
    style={{ aspectRatio: '4 / 3', width: '100%', maxWidth: '500px', margin: '0 auto' }}
  >
    {coins.map((coin) => (
      <CoinImage
        key={coin.id}
        src={COIN_TYPES[coin.type].img}
        alt={`${COIN_TYPES[coin.type].value}円硬貨`}
        x={coin.x}
        y={coin.y}
        rotation={coin.rotation}
        size={coin.size}
      />
    ))}
  </div>
);