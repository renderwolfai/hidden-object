'use client';

import { useCallback } from 'react';
import { useCanvasRenderer } from './use-canvas-renderer';
import { OverlayRendererOptions } from '@/types/canvas';
import { GameType } from '@/types/game';

export function useOverlayRenderer({ width, height, scale }: OverlayRendererOptions, gameType: GameType = 'hidden-object') {
  const createRenderer = useCanvasRenderer(width, height, scale, gameType);

  return useCallback((
    ctx: CanvasRenderingContext2D,
    masks: Map<string, ImageData>,
    foundObjects: Set<string>
  ) => {
    const renderer = createRenderer(ctx);
    renderer.clear();
    
    // Render all masks
    masks.forEach((maskData, objectId) => {
      renderer.renderMask(maskData, foundObjects.has(objectId));
    });
  }, [createRenderer]);
}