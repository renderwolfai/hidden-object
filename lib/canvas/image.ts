export function createOffscreenCanvas() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('Failed to get canvas context');
  return { canvas, ctx };
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export function getImageData(img: HTMLImageElement): ImageData {
  const { canvas, ctx } = createOffscreenCanvas();
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
  return ctx.getImageData(0, 0, img.width, img.height);
}

export function getImageBounds(imageData: ImageData) {
  let left = imageData.width;
  let right = 0;
  let top = imageData.height;
  let bottom = 0;

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