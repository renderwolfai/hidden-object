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
    const canvasX = e.clientX - rect.left;
    const canvasY = e.clientY - rect.top;
    
    // Convert click coordinates to image space
    const imageX = Math.floor(canvasX / scale);
    const imageY = Math.floor(canvasY / scale);

    debugPoint(e.clientX, e.clientY, 'red');

    for (const obj of game.objects) {
      if (foundObjects.has(obj.id)) continue;
      
      const maskData = masks.get(obj.id);
      if (!maskData) continue;

      // Ensure we're within the mask dimensions
      if (imageX < 0 || imageX >= maskData.width || imageY < 0 || imageY >= maskData.height) {
        continue;
      }

      const index = (imageY * maskData.width + imageX) * 4 + 3;
      if (index >= 0 && index < maskData.data.length && maskData.data[index] > 0) {
        // Calculate object center in screen coordinates
        const bounds = getImageBounds(maskData);
        const centerX = (bounds.left + (bounds.right - bounds.left) / 2) * scale + rect.left;
        const centerY = (bounds.top + (bounds.bottom - bounds.top) / 2) * scale + rect.top;

        return {
          id: obj.id,
          position: { x: e.clientX, y: e.clientY },
          objectCenter: { x: centerX, y: centerY }
        };
      }
    }
    return null;
  }, [game.objects, scale, masks, foundObjects]);
}