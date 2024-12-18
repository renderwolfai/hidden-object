'use client';

import { memo, useEffect, useRef } from 'react';
import { Position } from '@/types/animation';
import { loadImage } from '@/lib/canvas/image';
import { cn } from '@/lib/utils';

interface FoundObjectProps {
  id: string;
  imagePath: string;
  startPosition: Position;
  endPosition: Position;
  onComplete: () => void;
}

function FoundObjectComponent({
  imagePath,
  startPosition,
  endPosition,
  onComplete
}: FoundObjectProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const setupAnimation = async () => {
      try {
        const img = await loadImage(imagePath);
        if (!elementRef.current || !imageRef.current) return;

        // Set up image
        imageRef.current.src = imagePath;
        
        // Initial position
        elementRef.current.style.transform = `translate3d(${startPosition.x}px, ${startPosition.y}px, 0) scale(1)`;
        elementRef.current.style.opacity = '1';
        
        // Trigger animation
        requestAnimationFrame(() => {
          if (!elementRef.current) return;
          elementRef.current.style.transform = `
            translate3d(${endPosition.x}px, ${endPosition.y}px, 0) 
            scale(0.3)
            rotate(180deg)
          `;
          elementRef.current.style.opacity = '0';
        });
      } catch (error) {
        console.error('Animation setup failed:', error);
      }
    };

    setupAnimation();
  }, [imagePath, startPosition, endPosition]);

  return (
    <div
      ref={elementRef}
      className={cn(
        "fixed z-50 pointer-events-none origin-center opacity-0",
        "transition-all duration-500 ease-in-out"
      )}
      style={{
        transform: `translate3d(${startPosition.x}px, ${startPosition.y}px, 0)`,
      }}
      onTransitionEnd={onComplete}
    >
      <img
        ref={imageRef}
        alt=""
        className="max-w-none"
      />
    </div>
  );
}

export const FoundObject = memo(FoundObjectComponent);