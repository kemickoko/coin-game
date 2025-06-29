import type { Coin } from '@/components/coin-image-generator/types';

export const JPY_COIN_TYPES = {
  '1': { value: 1, img: '/jpy_yen/coin_1yen.png' },
  '5': { value: 5, img: '/jpy_yen/coin_5yen.png' },
  '10': { value: 10, img: '/jpy_yen/coin_10yen.png' },
  '50': { value: 50, img: '/jpy_yen/coin_50yen.png' },
  '100': { value: 100, img: '/jpy_yen/coin_100yen.png' },
  '500': { value: 500, img: '/jpy_yen/coin_500yen.png' },
} as const;

export const JPY_COIN_TYPES_KEYS = Object.keys(JPY_COIN_TYPES) as (keyof typeof JPY_COIN_TYPES)[];

export type JpyCoin = Coin<keyof typeof JPY_COIN_TYPES>;

export const JPY_BASE_DIAMETER = 26.5;
export const JPY_BASE_SIZE_PX = 48;

export const JPY_COIN_SIZE_RATIO = {
  '1': 20 / JPY_BASE_DIAMETER,
  '5': 22 / JPY_BASE_DIAMETER,
  '10': 23.5 / JPY_BASE_DIAMETER,
  '50': 21 / JPY_BASE_DIAMETER,
  '100': 22.6 / JPY_BASE_DIAMETER,
  '500': 1,
};

export const getJpyCoinSizePx = (type: keyof typeof JPY_COIN_SIZE_RATIO): number =>
  JPY_COIN_SIZE_RATIO[type] * JPY_BASE_SIZE_PX;

export const JPY = {
  coinTypes: JPY_COIN_TYPES,
  coinKeys: JPY_COIN_TYPES_KEYS,
  getSizePx: getJpyCoinSizePx,
};