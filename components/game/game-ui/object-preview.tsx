'use client';

import { memo, useEffect, useRef } from 'react';
import { loadImage, getImageData, getImageBounds } from '@/lib/canvas/image';
import { cn } from '@/lib/utils';

interface ObjectPreviewProps {
  maskPath: string;
  name: string;
  isFound: boolean;
}

function ObjectPreviewComponent({ maskPath, name, isFound }: ObjectPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const renderPreview = async () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;

      try {
        const img = await loadImage(maskPath);
        const imageData = getImageData(img);
        const bounds = getImageBounds(imageData);

        // Set canvas size to match the bounds
        const width = bounds.right - bounds.left;
        const height = bounds.bottom - bounds.top;
        canvas.width = width;
        canvas.height = height;

        // Draw only the non-transparent portion
        ctx.drawImage(
          img,
          bounds.left, bounds.top,
          width, height,
          0, 0,
          width, height
        );
      } catch (error) {
        console.error(`Failed to load preview for ${name}:`, error);
      }
    };

    renderPreview();
  }, [maskPath, name]);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "w-6 h-6 object-contain transition-opacity duration-200",
        isFound ? "opacity-50" : "opacity-100"
      )}
      aria-label={`Preview of ${name}`}
    />
  );
}

export const ObjectPreview = memo(ObjectPreviewComponent);