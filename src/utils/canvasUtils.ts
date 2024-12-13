// Canvas utility functions
export function createOffscreenCanvas(width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

export function getImageData(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement
): ImageData {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

export function isPointInMask(
  imageData: ImageData,
  point: { x: number; y: number },
  threshold = 100
): boolean {
  const index = (Math.floor(point.y) * imageData.width + Math.floor(point.x)) * 4;
  const alpha = imageData.data[index + 3];
  return alpha > threshold;
}