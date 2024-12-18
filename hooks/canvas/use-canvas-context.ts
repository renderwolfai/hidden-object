import { useRef, useEffect } from 'react';

export function useCanvasContext() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (ctx) {
        contextRef.current = ctx;
      }
    }
  }, []);

  return { canvasRef, contextRef };
}