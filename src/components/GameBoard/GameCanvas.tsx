import React, { useRef, useEffect } from 'react';
import { MaskImage } from '../../types/game';
import { loadImage } from '../../utils/maskUtils';

interface GameCanvasProps {
  masks: MaskImage[];
  width: number;
  height: number;
  onCanvasReady: (canvas: HTMLCanvasElement) => void;
}

export function GameCanvas({ masks, width, height, onCanvasReady }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [backgroundImage, ...maskImages] = masks;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    const drawImages = async () => {
      // Draw background
      const bgImage = await loadImage(backgroundImage.src);
      ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

      // Draw masks
      for (const mask of maskImages) {
        if (!mask.found) {
          const maskImg = await loadImage(mask.src);
          ctx.globalCompositeOperation = 'multiply';
          ctx.drawImage(maskImg, 0, 0, canvas.width, canvas.height);
        }
      }

      onCanvasReady(canvas);
    };

    drawImages();
  }, [masks, width, height, onCanvasReady]);

  return <canvas ref={canvasRef} className="cursor-pointer" />;
}