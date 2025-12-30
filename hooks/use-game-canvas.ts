'use client';

import { useEffect, RefObject } from 'react';
import { Game } from '@/types/game';
import { CanvasSize } from '@/types/canvas';
import { useMaskLoader } from './canvas/use-mask-loader';
import { useOverlayRenderer } from './canvas/use-overlay-renderer';
import { useClickDetector } from './canvas/use-click-detector';

export function useGameCanvas(
  canvasRef: RefObject<HTMLCanvasElement>,
  game: Game,
  foundObjects: Set<string>,
  canvasSize: CanvasSize
) {
  const { width, height, scale } = canvasSize;
  const masks = useMaskLoader(game);
  const renderOverlay = useOverlayRenderer({ width, height, scale }, game.type);
  const detectClick = useClickDetector(game, { scale, masks, foundObjects });

  // Draw found object overlays
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { willReadFrequently: true });
    if (!ctx || !canvas || masks.size === 0) return;

    renderOverlay(ctx, masks, foundObjects);
  }, [canvasRef, masks, foundObjects, renderOverlay, width, height]);

  return {
    handleClick: detectClick,
  };
}