import { Position, AnimationState } from '@/types/animation';
import { ANIMATION_CONFIG } from './constants';
import { easeOutQuart, easeInQuad, easeOutBack } from './easing';

function interpolatePosition(
  start: Position,
  end: Position,
  progress: number
): Position {
  const eased = easeOutBack(progress);
  
  // Calculate arc
  const arcProgress = 1 - Math.abs(progress - 0.5) * 2;
  const arc = arcProgress * ANIMATION_CONFIG.ARC_HEIGHT;

  return {
    x: start.x + (end.x - start.x) * eased,
    y: start.y + (end.y - start.y) * eased - arc
  };
}

function calculateScale(progress: number): number {
  const scaleProgress = easeOutQuart(progress);
  return 1 - (scaleProgress * (1 - ANIMATION_CONFIG.MIN_SCALE));
}

function calculateOpacity(progress: number): number {
  if (progress < ANIMATION_CONFIG.FADE_START) return 1;
  
  const fadeProgress = (progress - ANIMATION_CONFIG.FADE_START) / 
                      (1 - ANIMATION_CONFIG.FADE_START);
  return 1 - easeInQuad(fadeProgress);
}

function calculateRotation(progress: number): number {
  const rotationProgress = 1 - Math.abs(progress - 0.5) * 2;
  return rotationProgress * ANIMATION_CONFIG.MAX_ROTATION;
}

export function calculateAnimationState(
  startPosition: Position,
  endPosition: Position,
  progress: number
): AnimationState {
  return {
    position: interpolatePosition(startPosition, endPosition, progress),
    scale: calculateScale(progress),
    opacity: calculateOpacity(progress),
    rotation: calculateRotation(progress)
  };
}