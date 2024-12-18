'use client';

import { ObjectAnimation } from '@/types/animation';
import { calculateAnimationState } from '@/lib/animation/state';
import { renderAnimation } from './renderer';
import { ImageBounds } from '@/types/canvas';

export function renderAnimations(
  ctx: CanvasRenderingContext2D,
  animations: ObjectAnimation[],
  time: number,
  images: Map<string, HTMLImageElement>,
  bounds: Map<string, ImageBounds>,
  onComplete: (id: string) => void
) {
  // Clear the canvas
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Process each animation
  animations.forEach((anim) => {
    const img = images.get(anim.maskPath);
    const imageBounds = bounds.get(anim.maskPath);
    
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
}