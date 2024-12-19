import { ImageBounds } from '@/types/canvas';

export function renderAnimation(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  bounds: ImageBounds,
  state: undefined,
) {
  // const { position, scale, opacity, rotation } = state;
  // const width = bounds.right - bounds.left;
  // const height = bounds.bottom - bounds.top;

  // ctx.save();
  
  // // Transform order: translate -> rotate -> scale
  // ctx.translate(position.x, position.y);
  // ctx.rotate(rotation);
  // ctx.scale(scale, scale);
  
  // // Center the image
  // ctx.translate(-width/2, -height/2);
  
  // // Apply opacity
  // ctx.globalAlpha = opacity;
  
  // // Draw the image
  // ctx.drawImage(
  //   img,
  //   bounds.left, bounds.top, width, height,
  //   0, 0, width, height
  // );
  
  // ctx.restore();
}