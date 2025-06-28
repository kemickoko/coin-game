export const selectedClassMap = {
  green: 'bg-green-600 text-white focus:ring-green-400',
  purple: 'bg-purple-600 text-white focus:ring-purple-400',
  pink: 'bg-pink-600 text-white focus:ring-pink-400',
} as const;

export const unselectedClassMap = {
  green: 'bg-white text-green-600 hover:bg-green-100',
  purple: 'bg-white text-purple-600 hover:bg-purple-100',
  pink: 'bg-white text-pink-600 hover:bg-pink-100',
} as const;