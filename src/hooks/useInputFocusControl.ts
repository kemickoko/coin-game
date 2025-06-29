import { useEffect } from 'react';

/**
 * モバイルで input フォーカス時のズームやスクロールを防止するカスタムフック
 */
export const useInputFocusControl = () => {
  useEffect(() => {
    const preventZoom = (e: FocusEvent) => {
      const target = e.target as HTMLInputElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        // inputがfocusされた時、ズームを防止
        document.body.style.zoom = '1'; // 一部Androidで有効
        document.documentElement.style.fontSize = '16px'; // iOSでズーム防止に必要
      }
    };

    const resetZoom = () => {
      document.body.style.zoom = '';
      document.documentElement.style.fontSize = '';
    };

    window.addEventListener('focusin', preventZoom);
    window.addEventListener('focusout', resetZoom);

    return () => {
      window.removeEventListener('focusin', preventZoom);
      window.removeEventListener('focusout', resetZoom);
    };
  }, []);
};