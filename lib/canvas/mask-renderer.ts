'use client';

import { ImageBounds } from '@/types/canvas';
import { DEBUG } from '@/lib/debug';

interface MaskRenderOptions {
  color?: string;
  opacity?: number;
  debug?: boolean;
}

export class MaskRenderer {
  private ctx: CanvasRenderingContext2D;
  private scale: number;

  constructor(ctx: CanvasRenderingContext2D, scale: number) {
    this.ctx = ctx;
    this.scale = scale;
  }

  renderMask(
    maskData: ImageData,
    bounds: ImageBounds,
    options: MaskRenderOptions = {}
  ) {
    const {
      color = 'rgba(0, 255, 0, 0.5)',
      opacity = 0.5,
      debug = DEBUG
    } = options;

    this.ctx.save();

    // Apply scaling
    this.ctx.scale(this.scale, this.scale);

    // Set composite operation and opacity
    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.globalAlpha = opacity;

    // Create a path for the non-transparent pixels
    const path = new Path2D();
    for (let y = 0; y < maskData.height; y++) {
      for (let x = 0; x < maskData.width; x++) {
        const index = (y * maskData.width + x) * 4 + 3;
        if (maskData.data[index] > 0) {
          path.rect(x, y, 1, 1);
        }
      }
    }

    // Fill the mask
    this.ctx.fillStyle = color;
    this.ctx.fill(path);

    if (debug) {
      // Draw bounding box
      this.ctx.strokeStyle = 'red';
      this.ctx.strokeRect(
        bounds.left,
        bounds.top,
        bounds.right - bounds.left,
        bounds.bottom - bounds.top
      );

      // Draw center point
      const centerX = bounds.left + (bounds.right - bounds.left) / 2;
      const centerY = bounds.top + (bounds.bottom - bounds.top) / 2;
      this.ctx.fillStyle = 'blue';
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, 2, 0, Math.PI * 2);
      this.ctx.fill();
    }

    this.ctx.restore();
  }
}