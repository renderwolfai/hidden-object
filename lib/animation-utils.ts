import { AnimationPosition } from '@/types/animation';

export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function easeOutBack(t: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

export function interpolatePosition(
  start: AnimationPosition,
  end: AnimationPosition,
  progress: number,
  arcHeight = 100
): AnimationPosition {
  const eased = easeOutCubic(progress);
  
  // Create an arcing motion by adding a quadratic curve
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const normalizedProgress = progress * 2 - 1; // Convert to -1 to 1 range
  const arc = -Math.abs(normalizedProgress) * (normalizedProgress + 1) * arcHeight;

  return {
    x: start.x + dx * eased,
    y: start.y + dy * eased + arc
  };
}