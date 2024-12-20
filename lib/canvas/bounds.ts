import { ImageBounds } from '@/types/canvas';

export function getImageBounds(imageData: ImageData): ImageBounds {
  let left = imageData.width;
  let right = 0;
  let top = imageData.height;
  let bottom = 0;

  // Scan for non-transparent pixels
  for (let y = 0; y < imageData.height; y++) {
    for (let x = 0; x < imageData.width; x++) {
      const alpha = imageData.data[(y * imageData.width + x) * 4 + 3];
      if (alpha > 0) {
        left = Math.min(left, x);
        right = Math.max(right, x);
        top = Math.min(top, y);
        bottom = Math.max(bottom, y);
      }
    }
  }

  return {
    left: left === imageData.width ? 0 : left,
    right: right === 0 ? imageData.width : right,
    top: top === imageData.height ? 0 : top,
    bottom: bottom === 0 ? imageData.height : bottom
  };
}
