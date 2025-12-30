'use client';

import { useCallback } from 'react';
import { CanvasRenderer } from '@/lib/canvas/renderer';
import { GameType } from '@/types/game';

export function useCanvasRenderer(width: number, height: number, scale?: number, gameType: GameType = 'hidden-object') {
  return useCallback((ctx: CanvasRenderingContext2D) => {
    return new CanvasRenderer(ctx, width, height, scale, gameType);
  }, [width, height, scale, gameType]);
}