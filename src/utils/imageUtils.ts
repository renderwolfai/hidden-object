export async function extractObjectPreview(
    canvas: HTMLCanvasElement,
    maskImage: HTMLImageElement
  ): Promise<void> {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
  
    // Draw the mask at original size to analyze it
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = maskImage.width;
    tempCanvas.height = maskImage.height;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;
  
    tempCtx.drawImage(maskImage, 0, 0);
    const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
    const { data, width, height } = imageData;
  
    // Find the bounds of non-transparent pixels
    let minX = width;
    let minY = height;
    let maxX = 0;
    let maxY = 0;
  
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const alpha = data[(y * width + x) * 4 + 3];
        if (alpha > 0) {
          minX = Math.min(minX, x);
          minY = Math.min(minY, y);
          maxX = Math.max(maxX, x);
          maxY = Math.max(maxY, y);
        }
      }
    }
  
    // Calculate dimensions
    const cropWidth = maxX - minX;
    const cropHeight = maxY - minY;
  
    // Calculate scaling to fit in preview canvas while maintaining aspect ratio
    const scale = Math.min(
      canvas.width / cropWidth,
      canvas.height / cropHeight
    ) * 0.9; // 90% of available space
  
    const scaledWidth = cropWidth * scale;
    const scaledHeight = cropHeight * scale;
  
    // Center the preview
    const offsetX = (canvas.width - scaledWidth) / 2;
    const offsetY = (canvas.height - scaledHeight) / 2;
  
    // Clear and draw the cropped preview
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      maskImage,
      minX, minY, cropWidth, cropHeight,
      offsetX, offsetY, scaledWidth, scaledHeight
    );
  }

export function findObjectBounds(imageData: ImageData) {
    const { data, width, height } = imageData;
  
    let minX = width;
    let minY = height;
    let maxX = 0;
    let maxY = 0;
  
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const alpha = data[(y * width + x) * 4 + 3];
        if (alpha > 0) {
          minX = Math.min(minX, x);
          minY = Math.min(minY, y);
          maxX = Math.max(maxX, x);
          maxY = Math.max(maxY, y);
        }
      }
    }
  
    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY,
    };
  }