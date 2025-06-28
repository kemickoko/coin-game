export type CheckAnswerResult =
  | { type: 'correct'; message: string }
  | { type: 'invalid'; message: string }
  | { type: 'wrong'; message: string; newMistakeCount: number }
  | { type: 'maxAttempts'; message: string };

export const checkAnswer = (
  input: string,
  total: number,
  mistakeCount: number,
  isChallenge: boolean
): CheckAnswerResult => {
  const num = Number(input);

  if (!/^\d+$/.test(input) || isNaN(num)) {
    return { type: 'invalid', message: '数字を入力してください' };
  }

  if (num === total) {
    return { type: 'correct', message: '正解！ 🎉' };
  }

  const newCount = mistakeCount + 1;

  if (newCount >= 3) {
    return {
      type: 'maxAttempts',
      message: isChallenge
        ? '不正解です。'
        : `3回間違えました。正しい合計は ${total} 円です。`,
    };
  }

  return {
    type: 'wrong',
    message: isChallenge
      ? '不正解です。'
      : `不正解。あと${3 - newCount}回で正解が表示されます。`,
    newMistakeCount: newCount,
  };
};