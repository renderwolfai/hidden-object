import React, { useRef, useState } from 'react';
import { MaskImage, Point } from '../../types/game';
import { useMaskDetection } from '../../hooks/useMaskDetection';
import { MaskHighlight } from './MaskHighlight';
import { GameCanvas } from './GameCanvas';
import { findObjectBounds } from '../../utils/imageUtils';

interface GameBoardProps {
  masks: MaskImage[];
  onMaskClick: (
    maskId: number,
    canvas: HTMLCanvasElement,
    clickPoint: Point,
    objectBounds: { x: number; y: number; width: number; height: number }
  ) => void;
}

export function GameBoard({ masks, onMaskClick }: GameBoardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize] = useState({ width: 800, height: 500 });
  const [gameCanvas, setGameCanvas] = useState<HTMLCanvasElement | null>(null);

  const { detectMaskAtPoint, getMaskImageData } = useMaskDetection(masks, containerSize);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!gameCanvas) return;

    const rect = gameCanvas.getBoundingClientRect();
    const point: Point = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    const hitMaskId = detectMaskAtPoint(point);
    if (hitMaskId) {
      const maskData = getMaskImageData(hitMaskId);
      if (maskData) {
        const bounds = findObjectBounds(maskData);
        onMaskClick(hitMaskId, gameCanvas, point, bounds);
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      onClick={handleClick}
      className="relative w-[800px] h-[500px] rounded-lg overflow-hidden"
    >
      <GameCanvas
        masks={masks}
        width={containerSize.width}
        height={containerSize.height}
        onCanvasReady={setGameCanvas}
      />
      
      {masks.slice(1).map((mask) => 
        mask.found && (
          <MaskHighlight
            key={mask.id}
            mask={mask}
            width={containerSize.width}
            height={containerSize.height}
          />
        )
      )}
    </div>
  );
}