import { useEffect, useRef } from 'react';

export function useAnimationFrame(callback: (time: number) => void) {
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>();

  useEffect(() => {
    const animate = (time: number) => {
      if (startTimeRef.current === undefined) {
        startTimeRef.current = time;
      }

      callback(time);
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [callback]);
}