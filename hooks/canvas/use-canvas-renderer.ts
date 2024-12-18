'use client';

import { useCallback } from 'react';
import { CanvasRenderer } from '@/lib/canvas/renderer';

export function useCanvasRenderer(width: number, height: number, scale?: number) {
  return useCallback((ctx: CanvasRenderingContext2D) => {
    return new CanvasRenderer(ctx, width, height, scale);
  }, [width, height, scale]);
}