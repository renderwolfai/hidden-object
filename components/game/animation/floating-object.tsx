'use client';

import { memo, useEffect, useRef } from 'react';
import { Position } from '@/types/animation';
import { loadImage, getImageData, getImageBounds } from '@/lib/canvas/image';
import { ANIMATION_CONFIG } from '@/lib/animation/constants';
import { cn } from '@/lib/utils';

interface FloatingObjectProps {
  id: string;
  imagePath: string;
  startPosition: Position;
  endPosition: Position;
  onComplete: () => void;
}

function FloatingObjectComponent({
  imagePath,
  startPosition,
  endPosition,
  onComplete
}: FloatingObjectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let mounted = true;

    const setupAnimation = async () => {
      try {
        // Load and process image
        const img = await loadImage(imagePath);
        if (!mounted || !containerRef.current || !imageRef.current) return;

        const imageData = getImageData(img);
        const bounds = getImageBounds(imageData);
        
        // Configure image
        imageRef.current.src = imagePath;
        imageRef.current.style.marginLeft = `-${bounds.left}px`;
        imageRef.current.style.marginTop = `-${bounds.top}px`;
        
        // Set initial position
        containerRef.current.style.transform = `translate3d(${startPosition.x}px, ${startPosition.y}px, 0)`;
        containerRef.current.style.opacity = '1';
        
        // Trigger animation
        requestAnimationFrame(() => {
          if (!containerRef.current) return;
          
          // Apply final transform
          containerRef.current.style.transform = [
            `translate3d(${endPosition.x}px, ${endPosition.y}px, 0)`,
            `scale(${ANIMATION_CONFIG.MIN_SCALE})`,
            `rotate(${ANIMATION_CONFIG.ROTATION}rad)`
          ].join(' ');
          
          containerRef.current.style.opacity = '0';
        });
      } catch (error) {
        console.error('Failed to setup animation:', error);
      }
    };

    setupAnimation();
    return () => { mounted = false; };
  }, [imagePath, startPosition, endPosition]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "fixed z-50 pointer-events-none origin-center opacity-0",
        "transition-all duration-[600ms]"
      )}
      style={{ 
        transitionTimingFunction: ANIMATION_CONFIG.EASING,
        transform: `translate3d(${startPosition.x}px, ${startPosition.y}px, 0)`
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

export const FloatingObject = memo(FloatingObjectComponent);