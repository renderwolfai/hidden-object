import React, { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import { MaskImage } from '../../types/game';
import { loadImage } from '../../utils/maskUtils';
import { extractObjectPreview } from '../../utils/imageUtils';

interface ObjectPreviewProps {
  mask: MaskImage;
}

export function ObjectPreview({ mask }: ObjectPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const loadAndCropMask = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const maskImage = await loadImage(mask.src);
      await extractObjectPreview(canvas, maskImage);
    };

    loadAndCropMask();
  }, [mask.src]);

  return (
    <div 
      className="relative group" 
      data-mask-id={mask.id}
    >
      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-700/50 transition-transform group-hover:scale-105">
        <canvas
          ref={canvasRef}
          width={64}
          height={64}
          className="w-full h-full"
        />
      </div>
      {mask.found && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
          <Check className="text-green-400 w-6 h-6 drop-shadow-lg" />
        </div>
      )}
    </div>
  );
}