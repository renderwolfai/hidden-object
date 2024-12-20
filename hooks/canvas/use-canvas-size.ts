'use client';

import { useState, useEffect } from 'react';
import { Game } from '@/types/game';
import { CanvasSize } from '@/types/canvas';
import { loadImage } from '@/lib/canvas-utils';

export function useCanvasSize(game: Game): CanvasSize {
  const [size, setSize] = useState<CanvasSize>({ width: 0, height: 0, scale: 1 });

  useEffect(() => {
    const updateSize = async () => {
      const backgroundImg = await loadImage(game.backgroundPath);
      const container = document.querySelector('.game-container');
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      
      // Calculate scale to fit the image in the container while maintaining aspect ratio
      const scaleX = containerRect.width / backgroundImg.width;
      const scaleY = containerRect.height / backgroundImg.height;
      const scale = Math.min(scaleX, scaleY);

      setSize({
        width: backgroundImg.width,
        height: backgroundImg.height,
        scale
      });
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [game.backgroundPath]);

  return size;
}