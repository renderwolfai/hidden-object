export function checkMaskCollision(
  maskImageData: ImageData,
  point: { x: number; y: number }
): boolean {
  // Get the pixel data at the clicked point
  const index = (point.y * maskImageData.width + point.x) * 4;
  const alpha = maskImageData.data[index + 3];
  
  // Check if the pixel is not fully transparent
  return alpha > 0;
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}