'use client';

import { memo } from 'react';
import { Animation } from '@/types/animation';
import { FoundObject } from './found-object';

interface AnimationLayerProps {
  animations: Animation[];
  onAnimationComplete: (id: string) => void;
}

function AnimationLayerComponent({
  animations,
  onAnimationComplete
}: AnimationLayerProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {animations.map((anim) => (
        <FoundObject
          key={anim.id}
          {...anim}
          onComplete={() => onAnimationComplete(anim.id)}
        />
      ))}
    </div>
  );
}

export const AnimationLayer = memo(AnimationLayerComponent);