import {
  COIN_TYPES_KEYS,
  getCoinSizePx,
  type Coin
} from '@/components/CoinImageGenerator/constants/japaneseCoins';

/**
 * 指定された数の硬貨を重ならないようにランダムに生成する
 */
export const generateCoins = (num: number): Coin[] => {
  const newCoins: Coin[] = [];
  const placed: { x: number; y: number }[] = [];
  const minDistance = 5;

  let tries = 0;
  while (newCoins.length < num && tries < num * 50) {
    tries++;

    const x = Math.random() * 90;
    const y = Math.random() * 70;
    const rotation = Math.random() * 360;

    const type = COIN_TYPES_KEYS[Math.floor(Math.random() * COIN_TYPES_KEYS.length)];
    const size = getCoinSizePx(type);

    // 簡易な重なり回避（ざっくり）
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
      });
      placed.push({ x, y });
    }
  }

  return newCoins;
};