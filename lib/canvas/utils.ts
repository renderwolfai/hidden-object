import { ClickPosition, ImageBounds } from '@/types/canvas';

export function calculateScaledPosition(
  x: number,
  y: number,
  rect: DOMRect,
  scale: number
): ClickPosition {
  return {
    x: Math.floor((x - rect.left) / scale),
    y: Math.floor((y - rect.top) / scale)
  };
}

export function calculateScreenPosition(
  x: number,
  y: number,
  rect: DOMRect,
  scale: number
): ClickPosition {
  return {
    x: (x * scale) + rect.left,
    y: (y * scale) + rect.top
  };
}

export function isPointInMask(
  x: number,
  y: number,
  maskData: ImageData
): boolean {
  const index = (y * maskData.width + x) * 4 + 3;
  return index >= 0 && index < maskData.data.length && maskData.data[index] > 0;
}