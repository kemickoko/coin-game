import type { Coin } from '@/components/CoinImageGenerator/types';

export const JPY_COIN_TYPES = {
  '1': { value: 1, img: '/coin_1yen.png' },
  '5': { value: 5, img: '/coin_5yen.png' },
  '10': { value: 10, img: '/coin_10yen.png' },
  '50': { value: 50, img: '/coin_50yen.png' },
  '100': { value: 100, img: '/coin_100yen.png' },
  '500': { value: 500, img: '/coin_500yen.png' },
} as const;

export const JPY_COIN_TYPES_KEYS = Object.keys(JPY_COIN_TYPES) as (keyof typeof JPY_COIN_TYPES)[];

export type JpyCoin = Coin<keyof typeof JPY_COIN_TYPES>;

export const BASE_DIAMETER = 26.5;
export const BASE_SIZE_PX = 48;

export const JPY_COIN_SIZE_RATIO = {
  '1': 20 / BASE_DIAMETER,
  '5': 22 / BASE_DIAMETER,
  '10': 23.5 / BASE_DIAMETER,
  '50': 21 / BASE_DIAMETER,
  '100': 22.6 / BASE_DIAMETER,
  '500': 1,
} as const;

export const getJpyCoinSizePx = (type: keyof typeof JPY_COIN_SIZE_RATIO): number =>
  JPY_COIN_SIZE_RATIO[type] * BASE_SIZE_PX;