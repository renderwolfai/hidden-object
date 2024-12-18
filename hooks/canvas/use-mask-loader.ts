'use client';

import { useState, useEffect } from 'react';
import { Game } from '@/types/game';
import { loadImage, createOffscreenCanvas } from '@/lib/canvas-utils';

export function useMaskLoader(game: Game) {
  const [masks, setMasks] = useState<Map<string, ImageData>>(new Map());

  useEffect(() => {
    const loadMasks = async () => {
      const loadedMasks = new Map();
      const { canvas, ctx } = createOffscreenCanvas();

      for (const obj of game.objects) {
        try {
          const img = await loadImage(obj.maskPath);
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.clearRect(0, 0, img.width, img.height);
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, img.width, img.height);
          loadedMasks.set(obj.id, imageData);
        } catch (error) {
          console.error(`Failed to load mask for ${obj.id}:`, error);
        }
      }

      setMasks(loadedMasks);
    };

    loadMasks();
  }, [game.objects]);

  return masks;
}