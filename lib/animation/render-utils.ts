'use client';

import { AnimationState } from '@/types/animation';
import { ImageBounds } from '@/types/canvas';

export function renderAnimatedObject(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  bounds: ImageBounds,
  state: AnimationState
) {
  const { position, scale, opacity, rotation } = state;
  const width = bounds.right - bounds.left;
  const height = bounds.bottom - bounds.top;

  ctx.save();
  
  // Move to target position
  ctx.translate(position.x, position.y);
  
  // Apply rotation
  ctx.rotate(rotation || 0);
  
  // Scale around center
  ctx.scale(scale, scale);
  ctx.translate(-width/2, -height/2);
  
  // Set opacity
  ctx.globalAlpha = opacity;
  
  // Draw only the non-transparent portion of the image
  ctx.drawImage(
    img,
    bounds.left, bounds.top, width, height,
    0, 0, width, height
  );
  
  ctx.restore();
}