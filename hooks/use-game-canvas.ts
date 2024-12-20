'use client';

import { useEffect, RefObject, useCallback } from 'react';
import { Game } from '@/types/game';
import { useCanvasSize } from './canvas/use-canvas-size';
import { useMaskLoader } from './canvas/use-mask-loader';
import { useOverlayRenderer } from './canvas/use-overlay-renderer';
import { useClickDetector } from './canvas/use-click-detector';

export function useGameCanvas(
  canvasRef: RefObject<HTMLCanvasElement>,
  game: Game,
  foundObjects: Set<string>
) {
  const { width, height, scale } = useCanvasSize(game);
  const masks = useMaskLoader(game);
  const renderOverlay = useOverlayRenderer({ width, height, scale });
  const detectClick = useClickDetector(game, { scale, masks, foundObjects });

  // Draw found object overlays
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { willReadFrequently: true });
    if (!ctx || !canvas || masks.size === 0) return;

    renderOverlay(ctx, masks, foundObjects);
  }, [canvasRef, masks, foundObjects, renderOverlay, width, height]);

  return {
    canvasSize: { width, height, scale },
    handleClick: detectClick,
  };
}