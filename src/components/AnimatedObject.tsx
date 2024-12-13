import React, { useEffect, useRef } from 'react';
import { Point } from '../types/game';

interface AnimatedObjectProps {
  sourceCanvas: HTMLCanvasElement;
  sourceBounds: DOMRect;
  targetBounds: DOMRect;
  cropArea: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  onComplete: () => void;
}

export function AnimatedObject({
  sourceCanvas,
  sourceBounds,
  targetBounds,
  cropArea,
  onComplete,
}: AnimatedObjectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to window size for smooth animation
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Calculate start and end positions
    const startX = sourceBounds.left + cropArea.x;
    const startY = sourceBounds.top + cropArea.y;
    const endX = targetBounds.left + targetBounds.width / 2 - cropArea.width / 2;
    const endY = targetBounds.top + targetBounds.height / 2 - cropArea.height / 2;

    let startTime: number | null = null;
    const duration = 800; // Animation duration in ms

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const easing = 1 - Math.pow(1 - progress, 3);

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate current position
      const currentX = startX + (endX - startX) * easing;
      const currentY = startY + (endY - startY) * easing;

      // Calculate scale (start at 1, end at targetBounds.width / cropArea.width)
      const startScale = 1;
      const endScale = Math.min(60 / cropArea.width, 60 / cropArea.height) * 0.9;
      const currentScale = startScale + (endScale - startScale) * easing;

      // Draw the cropped object
      ctx.drawImage(
        sourceCanvas,
        cropArea.x,
        cropArea.y,
        cropArea.width,
        cropArea.height,
        currentX,
        currentY,
        cropArea.width * currentScale,
        cropArea.height * currentScale
      );

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        onComplete();
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [sourceCanvas, sourceBounds, targetBounds, cropArea, onComplete]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
}