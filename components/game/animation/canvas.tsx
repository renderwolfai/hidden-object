'use client';

import { memo, useRef, useEffect } from 'react';
import { Animation } from '@/types/animation';
import { useAnimationFrame } from '@/hooks/animation/frame';
import { cn } from '@/lib/utils';
import { useImageLoader } from '@/hooks/animation/image-loader';
import { calculateAnimationState } from '@/lib/animation/state';
import { renderAnimation } from './renderer';

interface AnimationCanvasProps {
  animations: Animation[];
  onComplete: (id: string) => void;
  className?: string;
}

function AnimationCanvas({ 
  animations, 
  onComplete,
  className 
}: AnimationCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { images, bounds } = useImageLoader(animations);

  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation loop
  useAnimationFrame((time) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Render each animation
    animations.forEach((anim) => {
      const img = images.get(anim.imagePath);
      const imageBounds = bounds.get(anim.imagePath);
      
      if (!img || !imageBounds) return;

      const progress = Math.min((time - anim.startTime) / anim.duration, 1);
      const state = calculateAnimationState(
        anim.startPosition,
        anim.endPosition,
        progress
      );

      renderAnimation(ctx, img, imageBounds, state);

      if (progress === 1) {
        onComplete(anim.id);
      }
    });
  });

  return (
    <canvas
      ref={canvasRef}
      className={cn("fixed inset-0 pointer-events-none z-30", className)}
    />
  );
}

export const AnimationCanvas = memo(AnimationCanvas);