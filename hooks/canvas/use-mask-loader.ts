'use client';

import { useState, useEffect } from 'react';
import { Game } from '@/types/game';
import { loadImage } from '@/lib/canvas-utils';

export function useMaskLoader(game: Game) {
  const [masks, setMasks] = useState<Map<string, ImageData>>(new Map());

  useEffect(() => {
    const loadMasks = async () => {
      const loadedMasks = new Map();
      const backgroundImg = await loadImage(game.backgroundPath);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      // Set canvas size to match background image
      canvas.width = backgroundImg.width;
      canvas.height = backgroundImg.height;

      for (const obj of game.objects) {
        try {
          const img = await loadImage(obj.maskPath);
          
          // Scale mask to match background size
          canvas.width = backgroundImg.width;
          canvas.height = backgroundImg.height;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          // Draw mask scaled to match background
          ctx.drawImage(img, 0, 0, backgroundImg.width, backgroundImg.height);
          
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          loadedMasks.set(obj.id, imageData);
        } catch (error) {
          console.error(`Failed to load mask for ${obj.id}:`, error);
        }
      }

      setMasks(loadedMasks);
    };

    loadMasks();
  }, [game.objects, game.backgroundPath]);

  return masks;
}