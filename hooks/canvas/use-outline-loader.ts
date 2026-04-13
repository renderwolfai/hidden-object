'use client';

import { useState, useEffect } from 'react';
import { Game, FoundOverlay } from '@/types/game';
import { loadImage } from '@/lib';

export interface LoadedOverlay {
  overlay: FoundOverlay;
  imageData: ImageData;
  image: HTMLImageElement;
  width: number;
  height: number;
}

export function useOutlineLoader(game: Game) {
  const [overlayMap, setOverlayMap] = useState<Map<string, LoadedOverlay[]>>(new Map());

  useEffect(() => {
    if (game.type !== 'hidden-outline') return;

    const loadOverlays = async () => {
      const loaded = new Map<string, LoadedOverlay[]>();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      for (const obj of game.objects) {
        if (!obj.foundOverlays || obj.foundOverlays.length === 0) continue;

        const objectOverlays: LoadedOverlay[] = [];

        for (const overlay of obj.foundOverlays) {
          try {
            const img = await loadImage(overlay.imagePath);
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, img.width, img.height);

            objectOverlays.push({
              overlay,
              imageData,
              image: img,
              width: img.width,
              height: img.height,
            });
          } catch (error) {
            console.error(`Failed to load overlay for ${obj.id}:`, error);
          }
        }

        if (objectOverlays.length > 0) {
          loaded.set(obj.id, objectOverlays);
        }
      }

      setOverlayMap(loaded);
    };

    loadOverlays();
  }, [game.objects, game.type]);

  return overlayMap;
}
