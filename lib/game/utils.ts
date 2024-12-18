import { ClickPosition, ClickResult } from '@/types/canvas';
import { GameObject } from '@/types/game';
import { getImageBounds } from '../canvas-utils';

export function calculateObjectCenter(
  maskData: ImageData,
  scale: number,
  canvasRect: DOMRect
): ClickPosition {
  const bounds = getImageBounds(maskData);
  const centerX = bounds.left + (bounds.right - bounds.left) / 2;
  const centerY = bounds.top + (bounds.bottom - bounds.top) / 2;

  return {
    x: (centerX * scale) + canvasRect.left,
    y: (centerY * scale) + canvasRect.top
  };
}

export function createClickResult(
  object: GameObject,
  clickPos: ClickPosition,
  centerPos: ClickPosition
): ClickResult {
  return {
    id: object.id,
    position: clickPos,
    objectCenter: centerPos
  };
}