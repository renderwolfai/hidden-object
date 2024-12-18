import { useEffect } from 'react';

export function useResizeObserver(
  elementRef: React.RefObject<HTMLElement>,
  callback: (entry: ResizeObserverEntry) => void
) {
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        callback(entries[0]);
      }
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [elementRef, callback]);
}