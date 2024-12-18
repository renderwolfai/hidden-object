'use client';

import { useState, useEffect } from 'react';
import { ObjectAnimation } from '@/types/animation';
import { loadImage, getImageData, getImageBounds } from '@/lib/canvas/image';
import { ImageBounds } from '@/types/canvas';

export function useImageLoader(animations: ObjectAnimation[]) {
  const [images] = useState<Map<string, HTMLImageElement>>(new Map());
  const [bounds] = useState<Map<string, ImageBounds>>(new Map());

  useEffect(() => {
    const loadImages = async () => {
      for (const anim of animations) {
        if (!images.has(anim.maskPath)) {
          try {
            const img = await loadImage(anim.maskPath);
            images.set(anim.maskPath, img);
            
            const imageData = getImageData(img);
            const imageBounds = getImageBounds(imageData);
            bounds.set(anim.maskPath, imageBounds);
          } catch (error) {
            console.error(`Failed to load image: ${anim.maskPath}`, error);
          }
        }
      }
    };

    loadImages();
  }, [animations, images, bounds]);

  return { images, bounds };
}