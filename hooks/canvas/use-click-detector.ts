'use client';

import { useCallback } from 'react';
import { Game } from '@/types/game';
import { ClickDetectorOptions, ClickResult } from '@/types/canvas';
import { getImageBounds } from '@/lib/canvas-utils';
import { debugPoint } from '@/lib/debug-utils';

export function useClickDetector(game: Game, options: ClickDetectorOptions) {
  const { scale, masks, foundObjects } = options;

  return useCallback((e: React.MouseEvent<HTMLCanvasElement>): ClickResult | null => {
    const canvas = e.currentTarget;
    if (!canvas || masks.size === 0) return null;

    const rect = canvas.getBoundingClientRect();
    const imageX = Math.floor((e.clientX - rect.left) / scale);
    const imageY = Math.floor((e.clientY - rect.top) / scale);

    debugPoint(e.clientX, e.clientY, 'red');

    for (const obj of game.objects) {
      if (foundObjects.has(obj.id)) continue;
      
      const maskData = masks.get(obj.id);
      if (!maskData) continue;

      const index = (imageY * maskData.width + imageX) * 4 + 3;
      if (index >= 0 && index < maskData.data.length && maskData.data[index] > 0) {
        return {
          id: obj.id,
          position: { x: e.clientX, y: e.clientY },
          objectCenter: { x: e.clientX, y: e.clientY }
        };
      }
    }
    return null;
  }, [game.objects, scale, masks, foundObjects]);
}