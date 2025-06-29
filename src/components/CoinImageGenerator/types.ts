export type Coin<Type extends string = string> = {
  id: number;
  type: Type;
  x: number;
  y: number;
  rotation: number;
  size: number;
  value: number;
  img: string;
};