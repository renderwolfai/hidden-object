import { useState, useEffect } from 'react';
import { Animation } from '@/types/animation';
import { loadImage, getImageData, getImageBounds } from '@/lib/canvas';
import { ImageBounds } from '@/types/canvas';

export function useImageLoader(animations: Animation[]) {
  const [images] = useState<Map<string, HTMLImageElement>>(new Map());
  const [bounds] = useState<Map<string, ImageBounds>>(new Map());

  useEffect(() => {
    const loadImages = async () => {
      for (const anim of animations) {
        if (!images.has(anim.imagePath)) {
          try {
            const img = await loadImage(anim.imagePath);
            images.set(anim.imagePath, img);
            
            const imageData = getImageData(img);
            const imageBounds = getImageBounds(imageData);
            bounds.set(anim.imagePath, imageBounds);
          } catch (error) {
            console.error(`Failed to load image: ${anim.imagePath}`, error);
          }
        }
      }
    };

    loadImages();
  }, [animations, images, bounds]);

  return { images, bounds };
}