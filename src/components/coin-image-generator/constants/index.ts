import { JPY } from './jpyCoins';
import { JPY_COPY } from './jpyCoins_copy';

export const currencyMap = {
  JPY,
  JPY_COPY,
} as const;

export const SUPPORTED_CURRENCIES = [
    {code:'JPY', label:'JPY ー 日本円'},
    // {code:'JPY_COPY', label:'JPY_COPY ー 日本円'},
] as const;

export type CurrencyOption = typeof SUPPORTED_CURRENCIES[number];
export type Currency = CurrencyOption['code'];

export * from './jpyCoins';
export * from './jpyCoins_copy';