'use client';

import { useEffect, useCallback, RefObject } from 'react';
import { Game } from '@/types/game';
import { CanvasSize, ClickResult } from '@/types/canvas';
import { useOutlineLoader, LoadedOverlay } from './canvas/use-outline-loader';
import { debugPoint } from '@/lib/debug';

function hitTestOverlays(
  imageX: number,
  imageY: number,
  overlays: LoadedOverlay[]
): boolean {
  for (const { overlay, imageData, width, height } of overlays) {
    const localX = imageX - overlay.x;
    const localY = imageY - overlay.y;

    if (localX < 0 || localX >= width || localY < 0 || localY >= height) continue;

    const index = (Math.floor(localY) * width + Math.floor(localX)) * 4 + 3;
    if (index >= 0 && index < imageData.data.length && imageData.data[index] > 0) {
      return true;
    }
  }
  return false;
}

function getOverlayCenter(overlays: LoadedOverlay[]): { x: number; y: number } {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

  for (const { overlay, imageData, width, height } of overlays) {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const alpha = imageData.data[(y * width + x) * 4 + 3];
        if (alpha > 0) {
          minX = Math.min(minX, overlay.x + x);
          maxX = Math.max(maxX, overlay.x + x);
          minY = Math.min(minY, overlay.y + y);
          maxY = Math.max(maxY, overlay.y + y);
        }
      }
    }
  }

  return {
    x: minX + (maxX - minX) / 2,
    y: minY + (maxY - minY) / 2,
  };
}

export function useHiddenOutlineCanvas(
  canvasRef: RefObject<HTMLCanvasElement>,
  game: Game,
  foundObjects: Set<string>,
  canvasSize: CanvasSize
) {
  const { width, height, scale } = canvasSize;
  const overlayMap = useOutlineLoader(game);

  // Render found overlays onto the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { willReadFrequently: true });
    if (!ctx || !canvas || overlayMap.size === 0) return;

    ctx.clearRect(0, 0, width, height);

    overlayMap.forEach((overlays, objectId) => {
      if (!foundObjects.has(objectId)) return;

      for (const { overlay, image } of overlays) {
        ctx.drawImage(image, overlay.x, overlay.y);
      }
    });
  }, [canvasRef, overlayMap, foundObjects, width, height]);

  // Click detection
  const detectClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>): ClickResult | null => {
    const canvas = e.currentTarget;
    if (!canvas || overlayMap.size === 0) return null;

    const rect = canvas.getBoundingClientRect();
    const canvasX = e.clientX - rect.left;
    const canvasY = e.clientY - rect.top;

    const imageX = canvasX / scale;
    const imageY = canvasY / scale;

    debugPoint(e.clientX, e.clientY, 'red');

    for (const obj of game.objects) {
      if (foundObjects.has(obj.id)) continue;

      const overlays = overlayMap.get(obj.id);
      if (!overlays) continue;

      if (hitTestOverlays(imageX, imageY, overlays)) {
        const center = getOverlayCenter(overlays);
        const centerX = center.x * scale + rect.left;
        const centerY = center.y * scale + rect.top;

        return {
          id: obj.id,
          position: { x: e.clientX, y: e.clientY },
          objectCenter: { x: centerX, y: centerY },
        };
      }
    }
    return null;
  }, [game.objects, scale, overlayMap, foundObjects]);

  return {
    handleClick: detectClick,
    overlayMap,
  };
}
