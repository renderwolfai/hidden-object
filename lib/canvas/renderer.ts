'use client';

import { ImageBounds } from '@/types/canvas';
import { DEBUG } from '@/lib/debug';
import { getImageBounds } from './bounds';

export class CanvasRenderer {
  private ctx: CanvasRenderingContext2D;
  private scale: number;
  private width: number;
  private height: number;

  constructor(ctx: CanvasRenderingContext2D, width: number, height: number, scale = 1) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.scale = scale;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  renderMask(maskData: ImageData, isFound: boolean = false) {
    const bounds = getImageBounds(maskData);
    
    // Create path for non-transparent pixels
    const path = new Path2D();
    for (let y = 0; y < maskData.height; y++) {
      for (let x = 0; x < maskData.width; x++) {
        const index = (y * maskData.width + x) * 4 + 3;
        if (maskData.data[index] > 0) {
          path.rect(x * this.scale, y * this.scale, this.scale, this.scale);
        }
      }
    }

    // Fill with appropriate color
    this.ctx.fillStyle = isFound ? 
      'rgba(0, 255, 0, 0.5)' : // Green for found
      DEBUG ? 'rgba(255, 0, 0, 0.3)' : 'transparent'; // Red for debug, transparent for normal
    this.ctx.fill(path);

    if (DEBUG) {
      this.drawDebugOverlay(bounds, isFound ? 'green' : 'red');
    }
  }

  private drawDebugOverlay(bounds: ImageBounds, color: string) {
    this.ctx.save();
    
    // Draw bounding box
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(
      bounds.left * this.scale,
      bounds.top * this.scale,
      (bounds.right - bounds.left) * this.scale,
      (bounds.bottom - bounds.top) * this.scale
    );

    // Draw center point
    const centerX = (bounds.left + (bounds.right - bounds.left) / 2) * this.scale;
    const centerY = (bounds.top + (bounds.bottom - bounds.top) / 2) * this.scale;
    
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.restore();
  }
}