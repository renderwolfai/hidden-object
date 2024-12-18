'use client';

import { useState, useCallback } from 'react';

interface AnimationPosition {
  x: number;
  y: number;
}

interface ObjectAnimation {
  id: string;
  maskPath: string;
  startPosition: AnimationPosition;
  endPosition: AnimationPosition;
  startTime: number;
  duration: number;
}

const ANIMATION_DURATION = 800;

export function useObjectAnimations() {
  const [animations, setAnimations] = useState<ObjectAnimation[]>([]);

  const startAnimation = useCallback((
    id: string,
    maskPath: string,
    startPosition: AnimationPosition,
    endPosition: AnimationPosition
  ) => {
    // Remove any existing animation for this object
    setAnimations(prev => {
      const filtered = prev.filter(anim => anim.id !== id);
      return [...filtered, {
        id,
        maskPath,
        startPosition,
        endPosition,
        startTime: performance.now(),
        duration: ANIMATION_DURATION
      }];
    });
  }, []);

  const removeAnimation = useCallback((id: string) => {
    setAnimations(prev => prev.filter(anim => anim.id !== id));
  }, []);

  return {
    animations,
    startAnimation,
    removeAnimation
  };
}