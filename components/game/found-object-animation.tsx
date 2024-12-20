'use client';

import { memo, useEffect, useRef } from 'react';
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
        
        // Set up image
        imageRef.current.src = imagePath;
        imageRef.current.style.marginLeft = `-${bounds.left}px`;
        imageRef.current.style.marginTop = `-${bounds.top}px`;
        
        // Position element at start position
        elementRef.current.style.width = `${width}px`;
        elementRef.current.style.height = `${height}px`;
        elementRef.current.style.left = `${startPosition.x - width/2}px`;
        elementRef.current.style.top = `${startPosition.y - height/2}px`;
        elementRef.current.style.opacity = '1';
        elementRef.current.style.transform = 'scale(1)';
        
        // Force a reflow
        elementRef.current.offsetHeight;
        
        // Calculate the translation needed
        const dx = endPosition.x - startPosition.x;
        const dy = endPosition.y - startPosition.y;
        
        // Start animation
        requestAnimationFrame(() => {
          if (!elementRef.current) return;
          elementRef.current.style.transform = 'scale(0.3)';
          elementRef.current.style.left = `${endPosition.x - (width * 0.3)/2}px`;
          elementRef.current.style.top = `${endPosition.y - (height * 0.3)/2}px`;
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
        "fixed z-50 pointer-events-none overflow-hidden",
        "transition-all duration-500 ease-in-out"
      )}
      onTransitionEnd={onComplete}
    >
      <img
        ref={imageRef}
        alt=""
        className="max-w-none"
        style={{ opacity: 0.8 }}
      />
    </div>
  );
}

export const FoundObjectAnimation = memo(FoundObjectAnimationComponent);