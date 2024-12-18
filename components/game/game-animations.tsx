'use client';

import { memo, useRef } from 'react';
import { ObjectAnimation } from '@/types/animation';
import { useAnimationFrame } from '@/hooks/animation/frame';
import { cn } from '@/lib/utils';
import { useCanvasManager } from './animation/canvas-manager';
import { useImageLoader } from './animation/image-loader';
import { renderAnimations } from './animation/animation-renderer';

interface GameAnimationsProps {
  animations: ObjectAnimation[];
  onAnimationComplete: (id: string) => void;
  className?: string;
}

function GameAnimationsComponent({ 
  animations, 
  onAnimationComplete,
  className 
}: GameAnimationsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { images, bounds } = useImageLoader(animations);

  // Set up canvas
  useCanvasManager(canvasRef);

  // Animation loop
  useAnimationFrame((time) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    renderAnimations(
      ctx,
      animations,
      time,
      images,
      bounds,
      onAnimationComplete
    );
  });

  return (
    <canvas
      ref={canvasRef}
      className={cn("fixed inset-0 pointer-events-none z-30", className)}
    />
  );
}

export const GameAnimations = memo(GameAnimationsComponent);
export default GameAnimations;