'use client';

import { ImageBounds } from '@/types/canvas';
import { GameType } from '@/types/game';
import { DEBUG } from '@/lib/debug';
import { getImageBounds } from './bounds';

const FOUND_COLOR = 'rgba(0, 255, 0, 0.5)'; // Green for all game types

export class CanvasRenderer {
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private scale: number;
  private gameType: GameType;

  constructor(ctx: CanvasRenderingContext2D, width: number, height: number, scale = 1, gameType: GameType = 'hidden-object') {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.scale = scale;
    this.gameType = gameType;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  renderMask(maskData: ImageData, isFound: boolean = false) {
    // Create path for non-transparent pixels
    const path = new Path2D();
    for (let y = 0; y < maskData.height; y++) {
      for (let x = 0; x < maskData.width; x++) {
        const index = (y * maskData.width + x) * 4 + 3;
        if (maskData.data[index] > 0) {
          path.rect(x, y, 1, 1);
        }
      }
    }

    // Fill with appropriate color
    this.ctx.fillStyle = isFound ? 
      FOUND_COLOR :
      DEBUG ? 'rgba(255, 0, 0, 0.3)' : 'transparent'; // Red for debug, transparent for normal
    this.ctx.fill(path);

    if (DEBUG) {
      const bounds = getImageBounds(maskData);
      this.drawDebugOverlay(bounds);
    }
  }

  private drawDebugOverlay(bounds: ImageBounds) {
    this.ctx.save();
    
    // Draw bounding box
    this.ctx.strokeStyle = 'red';
    this.ctx.lineWidth = 2;
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
    this.ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.restore();
  }
}