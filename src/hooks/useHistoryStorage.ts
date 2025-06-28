import { useEffect, useState } from 'react';

/**
 * 指定された key に対して、数値の履歴を localStorage で管理するカスタムフック。
 */
export const useHistoryStorage = (key: string) => {
  const [history, setHistory] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem(key);
      const parsed = stored ? JSON.parse(stored) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // localStorage に保存（変更時）
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(history));
  }, [history, key]);

  /** 履歴に新しい記録を追加 */
  const addRecord = (value: number) => {
    setHistory((prev) => [...prev, value]);
  };

  /** 履歴をすべてリセット */
  const clearHistory = () => {
    setHistory([]);
  };

  /** 履歴の最大値を取得（例: スコアや連続回数の最大） */
  const max = history.length > 0 ? Math.max(...history) : 0;

  return {
    history,
    addRecord,
    clearHistory,
    max,
  };
};