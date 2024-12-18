'use client';

import { useState, useCallback } from 'react';
import { Position, Animation } from '@/types/animation';

export function useObjectAnimations() {
  const [animations, setAnimations] = useState<Animation[]>([]);

  const startAnimation = useCallback((
    id: string,
    imagePath: string,
    startPosition: Position,
    endPosition: Position
  ) => {
    setAnimations(prev => {
      const filtered = prev.filter(anim => anim.id !== id);
      return [...filtered, {
        id,
        imagePath,
        startPosition,
        endPosition
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