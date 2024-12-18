'use client';

import { Position } from '@/types/animation';
import { easeOutBack, easeOutQuart } from './easing';
import { ANIMATION_CONFIG } from './constants';

export function calculateArcPosition(
  start: Position,
  end: Position,
  progress: number
): Position {
  const eased = easeOutBack(progress);
  
  // Calculate arc height
  const arcProgress = 1 - Math.abs(progress - 0.5) * 2; // 0 -> 1 -> 0
  const arc = arcProgress * ANIMATION_CONFIG.ARC_HEIGHT;

  return {
    x: start.x + (end.x - start.x) * eased,
    y: start.y + (end.y - start.y) * eased - arc
  };
}

export function calculateTransform(
  position: Position,
  scale: number,
  rotation: number
): string {
  return [
    `translate3d(${position.x}px, ${position.y}px, 0)`,
    `scale(${scale})`,
    `rotate(${rotation}rad)`
  ].join(' ');
}