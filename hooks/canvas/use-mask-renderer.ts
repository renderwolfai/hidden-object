'use client';

import { useCallback } from 'react';
import { MaskRenderer } from '@/lib/canvas/mask-renderer';
import { ImageBounds } from '@/types/canvas';

export function useMaskRenderer(scale: number) {
  return useCallback((
    ctx: CanvasRenderingContext2D,
    maskData: ImageData,
    bounds: ImageBounds,
    options?: { color?: string; opacity?: number; debug?: boolean }
  ) => {
    const renderer = new MaskRenderer(ctx, scale);
    renderer.renderMask(maskData, bounds, options);
  }, [scale]);
}