import type { Coin } from './types';
import { JPY_COIN_TYPES, JPY_COIN_TYPES_KEYS, getJpyCoinSizePx } from '@/components/CoinImageGenerator/constants';
// 将来的に他通貨をここにimport

export type Currency = 'JPY'; // 他通貨追加可能

type CoinTypesMap = {
  JPY: typeof JPY_COIN_TYPES,
  // USD: typeof USD_COIN_TYPES,
};

type CoinKeysMap = {
  JPY: typeof JPY_COIN_TYPES_KEYS,
  // USD: typeof USD_COIN_TYPES_KEYS,
};

type GetSizeFuncMap = {
  JPY: typeof getJpyCoinSizePx,
  // USD: typeof getUsdCoinSizePx,
};

export function generateCoins(
  count: number,
  currency: Currency = 'JPY',
): Coin[] {
  // 通貨ごとの定義を取得
  const coinTypesMap: CoinTypesMap = {
    JPY: JPY_COIN_TYPES,
  };
  const coinKeysMap: CoinKeysMap = {
    JPY: JPY_COIN_TYPES_KEYS,
  };
  const getSizeFuncMap: GetSizeFuncMap = {
    JPY: getJpyCoinSizePx,
  };

  const coinTypes = coinTypesMap[currency];
  const coinKeys = coinKeysMap[currency];
  const getSizePx = getSizeFuncMap[currency];

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