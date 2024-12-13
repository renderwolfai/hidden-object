import React, { useEffect, useRef } from 'react';
import { MaskImage } from '../../types/game';
import { loadImage } from '../../utils/maskUtils';

interface MaskHighlightProps {
  mask: MaskImage;
  width: number;
  height: number;
}

export function MaskHighlight({ mask, width, height }: MaskHighlightProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const renderHighlight = async () => {
      const maskImage = await loadImage(mask.src);
      
      canvas.width = width;
      canvas.height = height;

      // Draw the mask
      ctx.drawImage(maskImage, 0, 0, width, height);

      // Get the mask data
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;

      // Create a new ImageData for the highlight
      const highlightData = new ImageData(width, height);
      const highlightPixels = highlightData.data;

      // For each pixel in the mask
      for (let i = 0; i < data.length; i += 4) {
        const alpha = data[i + 3];
        if (alpha > 0) {
          // If pixel is not transparent, make it green with 50% opacity
          highlightPixels[i] = 0;     // R
          highlightPixels[i + 1] = 255; // G
          highlightPixels[i + 2] = 0;   // B
          highlightPixels[i + 3] = 128;  // A (50% opacity)
        }
      }

      // Clear the canvas and put the highlight
      ctx.clearRect(0, 0, width, height);
      ctx.putImageData(highlightData, 0, 0);
    };

    renderHighlight();
  }, [mask, width, height]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
}