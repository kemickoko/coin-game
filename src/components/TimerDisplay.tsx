type Props = {
  isPlaying: boolean;
  timeLeft: number;
  correctCount: number;
};

export const TimerDisplay: React.FC<Props> = ({ isPlaying, timeLeft, correctCount }) => {
  return (
    <div className="mb-4 text-center">
      {isPlaying ? (
        <>
          <p>⏱️ 残り時間: {timeLeft} 秒</p>
          <p>✅ 正解数: {correctCount} 回</p>
        </>
      ) : (
        <p>スタートボタンを押してチャレンジを始めよう！</p>
      )}
    </div>
  );
};