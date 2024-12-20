'use client';

import { memo, useEffect, useRef, useState } from 'react';
import { Position } from '@/types/animation';
import { loadImage, getImageData, getImageBounds } from '@/lib/canvas';
import { cn } from '@/lib/utils';

interface FoundObjectAnimationProps {
  id: string;
  imagePath: string;
  startPosition: Position;
  endPosition: Position;
  onComplete: () => void;
}

function FoundObjectAnimationComponent({
  imagePath,
  startPosition,
  endPosition,
  onComplete
}: FoundObjectAnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [phase, setPhase] = useState<'move' | 'scale'>('move');

  useEffect(() => {
    const setupAnimation = async () => {
      try {
        const img = await loadImage(imagePath);
        if (!elementRef.current || !imageRef.current) return;

        // Get the bounds of the non-transparent pixels
        const imageData = getImageData(img);
        const bounds = getImageBounds(imageData);
        
        // Calculate dimensions of visible content
        const width = bounds.right - bounds.left;
        const height = bounds.bottom - bounds.top;
        
        // Set up image with correct offset to show only non-transparent parts
        imageRef.current.src = imagePath;
        imageRef.current.style.marginLeft = `-${bounds.left}px`;
        imageRef.current.style.marginTop = `-${bounds.top}px`;
        
        // Initial position
        elementRef.current.style.width = `${width}px`;
        elementRef.current.style.height = `${height}px`;
        elementRef.current.style.left = `${startPosition.x - width/2}px`;
        elementRef.current.style.top = `${startPosition.y - height/2}px`;
        
        // Force a reflow
        elementRef.current.offsetHeight;
        
        // Start move animation
        requestAnimationFrame(() => {
          if (!elementRef.current) return;
          elementRef.current.style.left = `${endPosition.x - width/2}px`;
          elementRef.current.style.top = `${endPosition.y - height/2}px`;
        });
      } catch (error) {
        console.error('Animation setup failed:', error);
      }
    };

    setupAnimation();
  }, [imagePath, startPosition, endPosition]);

  const handleTransitionEnd = () => {
    if (phase === 'move') {
      setPhase('scale');
      if (elementRef.current) {
        elementRef.current.style.transform = 'scale(0.3)';
        elementRef.current.style.opacity = '0';
      }
    } else {
      onComplete();
    }
  };

  return (
    <div
      ref={elementRef}
      className={cn(
        "fixed z-50 pointer-events-none overflow-hidden origin-center",
        "transition-all duration-500 ease-in-out"
      )}
      style={{
        opacity: 1,
        transform: 'scale(1)'
      }}
      onTransitionEnd={handleTransitionEnd}
    >
      <img
        ref={imageRef}
        alt=""
        className="max-w-none"
      />
    </div>
  );
}

export const FoundObjectAnimation = memo(FoundObjectAnimationComponent);