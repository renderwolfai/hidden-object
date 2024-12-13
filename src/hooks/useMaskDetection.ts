import { useState, useEffect } from 'react';
import { MaskImage, Point } from '../types/game';
import { createOffscreenCanvas, getImageData, isPointInMask } from '../utils/canvasUtils';
import { loadImage } from '../utils/maskUtils';

interface MaskDetectionState {
  maskData: Map<number, ImageData>;
  canvasSize: { width: number; height: number };
}

export function useMaskDetection(masks: MaskImage[], containerSize: { width: number; height: number }) {
  const [state, setState] = useState<MaskDetectionState>({
    maskData: new Map(),
    canvasSize: containerSize,
  });

  useEffect(() => {
    const loadMasks = async () => {
      const offscreenCanvas = createOffscreenCanvas(
        containerSize.width,
        containerSize.height
      );

      const maskData = new Map();
      
      for (const mask of masks) {
        if (mask.id === 1) continue; // Skip background image
        const image = await loadImage(mask.src);
        const imageData = getImageData(offscreenCanvas, image);
        maskData.set(mask.id, imageData);
      }

      setState(prev => ({
        ...prev,
        maskData,
        canvasSize: containerSize,
      }));
    };

    loadMasks();
  }, [masks, containerSize.width, containerSize.height]);

  const detectMaskAtPoint = (point: Point): number | null => {
    for (const mask of masks) {
      if (mask.id === 1 || mask.found) continue; // Skip background and found masks
      
      const maskData = state.maskData.get(mask.id);
      if (maskData && isPointInMask(maskData, point)) {
        return mask.id;
      }
    }
    return null;
  };

  return { detectMaskAtPoint };
}