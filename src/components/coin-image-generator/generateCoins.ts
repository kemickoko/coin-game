import type { Coin } from './types';
import { currencyMap } from '@/components/coin-image-generator/constants';
import { type Currency } from '@/components/coin-image-generator/constants';
// 将来的に他通貨をここにimport


export function generateCoins(count: number, currency: Currency = 'JPY'): Coin[] {
  const { coinTypes, coinKeys, getSizePx } = currencyMap[currency];

  const newCoins: Coin[] = [];
  const placed: { x: number; y: number }[] = [];
  const minDistance = 5;
  let tries = 0;

  while (newCoins.length < count && tries < count * 50) {
    tries++;

    const x = Math.random() * 90;
    const y = Math.random() * 70;
    const rotation = Math.random() * 360;

    const type = coinKeys[Math.floor(Math.random() * coinKeys.length)];
    const size = getSizePx(type);

    const isOverlapping = placed.some((p) => {
      const dx = x - p.x;
      const dy = y - p.y;
      return Math.sqrt(dx * dx + dy * dy) < minDistance;
    });

    if (!isOverlapping) {
      newCoins.push({
        id: newCoins.length,
        type,
        x,
        y,
        rotation,
        size,
        value: coinTypes[type].value,
        img: coinTypes[type].img,
      });
      placed.push({ x, y });
    }
  }

  return newCoins;
}