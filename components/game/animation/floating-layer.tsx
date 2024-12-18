'use client';

import { memo } from 'react';
import { Animation } from '@/types/animation';
import { FloatingObject } from './floating-object';

interface FloatingLayerProps {
  animations: Animation[];
  onAnimationComplete: (id: string) => void;
}

function FloatingLayerComponent({
  animations,
  onAnimationComplete
}: FloatingLayerProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {animations.map((anim) => (
        <FloatingObject
          key={anim.id}
          {...anim}
          onComplete={() => onAnimationComplete(anim.id)}
        />
      ))}
    </div>
  );
}

export const FloatingLayer = memo(FloatingLayerComponent);