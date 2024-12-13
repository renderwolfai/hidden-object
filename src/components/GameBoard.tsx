import React, { useRef, useEffect, useState } from 'react';
import { MaskImage, Point } from '../types/game';
import { useMaskDetection } from '../hooks/useMaskDetection';
import { MaskHighlight } from './MaskHighlight';
import { loadImage } from '../utils/maskUtils';

interface GameBoardProps {
  masks: MaskImage[];
  onMaskClick: (maskId: number) => void;
}

export function GameBoard({ masks, onMaskClick }: GameBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 800, height: 500 });
  const [backgroundImage, ...maskImages] = masks;
  const imagesRef = useRef<Map<string, HTMLImageElement>>(new Map());

  const { detectMaskAtPoint } = useMaskDetection(masks, containerSize);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Preload all images
  useEffect(() => {
    const loadImages = async () => {
      const loadPromises = masks.map(async (mask) => {
        if (!imagesRef.current.has(mask.src)) {
          const img = await loadImage(mask.src);
          imagesRef.current.set(mask.src, img);
        }
      });
      await Promise.all(loadPromises);
      drawScene();
    };

    loadImages();
  }, [masks]);

  // Update canvas size and redraw when container size changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = containerSize.width;
    canvas.height = containerSize.height;
    drawScene();
  }, [containerSize]);

  const drawScene = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw background
    const bgImage = imagesRef.current.get(backgroundImage.src);
    if (bgImage) {
      ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    }

    // Draw masks
    ctx.globalCompositeOperation = 'multiply';
    for (const mask of maskImages) {
      if (!mask.found) {
        const maskImg = imagesRef.current.get(mask.src);
        if (maskImg) {
          ctx.drawImage(maskImg, 0, 0, canvas.width, canvas.height);
        }
      }
    }
    ctx.globalCompositeOperation = 'source-over';
  };

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const point: Point = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    const hitMaskId = detectMaskAtPoint(point);
    if (hitMaskId) {
      onMaskClick(hitMaskId);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-[800px] h-[500px] rounded-lg overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        className="cursor-pointer"
      />
      
      {maskImages.map((mask) => 
        mask.found && (
          <MaskHighlight
            key={mask.id}
            mask={mask}
            width={containerSize.width}
            height={containerSize.height}
          />
        )
      )}
    </div>
  );
}