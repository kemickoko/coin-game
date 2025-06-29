import { useEffect, useState } from 'react';

export const useHistoryStorage = (historyKey: string, maxKey?: string) => {
  // 履歴の初期値取得
  const [history, setHistory] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem(historyKey);
      const parsed = stored ? JSON.parse(stored) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // max値の初期値取得
  const [max, setMax] = useState(() => {
    if (!maxKey) return 0;
    const storedMax = localStorage.getItem(maxKey);
    return storedMax ? Number(storedMax) : 0;
  });

  // 履歴が変わったらlocalStorageに保存
  useEffect(() => {
    localStorage.setItem(historyKey, JSON.stringify(history));
  }, [history, historyKey]);

  // maxが変わったらlocalStorageに保存
  useEffect(() => {
    if (!maxKey) return;
    localStorage.setItem(maxKey, max.toString());
  }, [max, maxKey]);

  // 新しい記録を追加し、maxも更新
  const addRecord = (value: number) => {
    setHistory((prev) => [...prev, value]);
    setMax((prevMax) => (value > prevMax ? value : prevMax));
  };

  const clearHistory = () => {
    setHistory([]);
    setMax(0);
  };

  return {
    history,
    addRecord,
    clearHistory,
    max,
  };
};