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
      const imgAspectRatio = backgroundImg.width / backgroundImg.height;
      const containerAspectRatio = containerRect.width / containerRect.height;

      let scale;
      if (containerAspectRatio > imgAspectRatio) {
        // Container is wider than image - fit to height
        scale = containerRect.height / backgroundImg.height;
      } else {
        // Container is taller than image - fit to width
        scale = containerRect.width / backgroundImg.width;
      }

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