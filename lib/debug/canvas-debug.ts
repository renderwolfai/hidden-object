'use client';

import { ImageBounds, ClickPosition } from '@/types/canvas';

export function drawDebugOverlay(
  ctx: CanvasRenderingContext2D,
  bounds: ImageBounds,
  scale: number,
  color = 'rgba(255, 0, 0, 0.5)'
) {
  // Save context state
  ctx.save();
  
  // Draw bounding box
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.strokeRect(
    bounds.left * scale,
    bounds.top * scale,
    (bounds.right - bounds.left) * scale,
    (bounds.bottom - bounds.top) * scale
  );

  // Draw center point
  const centerX = (bounds.left + (bounds.right - bounds.left) / 2) * scale;
  const centerY = (bounds.top + (bounds.bottom - bounds.top) / 2) * scale;
  
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
  ctx.fill();

  // Restore context state
  ctx.restore();
}

export function createDebugPoint(
  position: ClickPosition,
  color: string,
  label?: string
) {
  const point = document.createElement('div');
  point.style.position = 'fixed';
  point.style.left = `${position.x - 4}px`;
  point.style.top = `${position.y - 4}px`;
  point.style.width = '8px';
  point.style.height = '8px';
  point.style.backgroundColor = color;
  point.style.borderRadius = '50%';
  point.style.zIndex = '9999';
  point.style.pointerEvents = 'none';

  if (label) {
    point.style.setProperty('--label', `"${label}"`);
    point.style.setProperty('--color', color);
    point.className = 'debug-point';
  }

  document.body.appendChild(point);
  setTimeout(() => point.remove(), 2000);
}