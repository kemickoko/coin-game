type CheckResult = {
  type: 'correct' | 'wrong' | 'maxAttempts';
  message: string;
  newMistakeCount?: number;
};

export function checkAnswer(
  input: string,
  total: number,
  mistakeCount: number,
  isChallenge: boolean
): CheckResult {
  const trimmed = input.trim();
  if (!/^\d+$/.test(trimmed)) {
    return { type: 'wrong', message: '数字を入力してください', newMistakeCount: mistakeCount };
  }
  const num = Number(trimmed);
  if (num === total) {
    return { type: 'correct', message: '正解！ 🎉' };
  } else {
    const newCount = mistakeCount + 1;
    if (isChallenge) {
      // チャレンジ中は不正解メッセージ固定
      return {
        type: 'wrong',
        message: '不正解です。',
        newMistakeCount: newCount,
      };
    } else {
      if (newCount >= 3) {
        return {
          type: 'maxAttempts',
          message: `3回間違えました。正しい合計は ${total} 円です。`,
          newMistakeCount: 0,
        };
      } else {
        return {
          type: 'wrong',
          message: `不正解。あと${3 - newCount}回で正解が表示されます。`,
          newMistakeCount: newCount,
        };
      }
    }
  }
}