'use client';

import { AnimationPosition, AnimationState } from '@/types/animation';
import { ANIMATION_CONSTANTS } from './constants';
import { easeOutQuart, easeInQuad } from './easing';

export function calculateAnimationState(
  startPosition: AnimationPosition,
  endPosition: AnimationPosition,
  progress: number
): AnimationState {
  const position = interpolatePosition(startPosition, endPosition, progress);
  const scale = calculateScale(progress);
  const opacity = calculateOpacity(progress);
  const rotation = calculateRotation(progress);

  return { position, scale, opacity, rotation };
}

function interpolatePosition(
  start: AnimationPosition,
  end: AnimationPosition,
  progress: number
): AnimationPosition {
  const eased = easeOutQuart(progress);
  
  // Calculate the arc
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const arcProgress = 1 - Math.abs(progress - 0.5) * 2; // 0 -> 1 -> 0
  const arc = arcProgress * ANIMATION_CONSTANTS.ARC_HEIGHT;

  return {
    x: start.x + dx * eased,
    y: start.y + dy * eased - arc
  };
}

function calculateScale(progress: number): number {
  // Start at 1, shrink to minimum scale
  const scaleProgress = easeOutQuart(progress);
  return 1 - (scaleProgress * (1 - ANIMATION_CONSTANTS.MIN_SCALE));
}

function calculateOpacity(progress: number): number {
  if (progress < ANIMATION_CONSTANTS.FADE_START) return 1;
  
  const fadeProgress = (progress - ANIMATION_CONSTANTS.FADE_START) / 
                      (1 - ANIMATION_CONSTANTS.FADE_START);
  return 1 - easeInQuad(fadeProgress);
}

function calculateRotation(progress: number): number {
  // Add a slight rotation during the animation
  const rotationProgress = 1 - Math.abs(progress - 0.5) * 2; // 0 -> 1 -> 0
  return rotationProgress * Math.PI * 0.25; // Maximum rotation of 45 degrees
}