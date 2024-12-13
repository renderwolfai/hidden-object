import React, { useState, useRef } from 'react';
import { MASK_IMAGES } from '../constants/gameData';
import { GameHeader } from './GameHeader';
import { GameBoard } from './GameBoard';
import { GameComplete } from './GameComplete';
import { ObjectBar } from './ObjectBar/ObjectBar';
import { AnimatedObject } from './AnimatedObject';
import { Point } from '../types/game';

export default function HiddenObjectGame() {
  const [masks, setMasks] = useState(MASK_IMAGES);
  const [gameComplete, setGameComplete] = useState(false);
  const [animation, setAnimation] = useState<{
    sourceCanvas: HTMLCanvasElement;
    sourceBounds: DOMRect;
    targetBounds: DOMRect;
    cropArea: { x: number; y: number; width: number; height: number };
  } | null>(null);

  const objectBarRef = useRef<HTMLDivElement>(null);

  const handleMaskClick = (
    maskId: number,
    canvas: HTMLCanvasElement,
    clickPoint: Point,
    objectBounds: { x: number; y: number; width: number; height: number }
  ) => {
    const targetPreview = objectBarRef.current?.querySelector(
      `[data-mask-id="${maskId}"]`
    );
    
    if (targetPreview) {
      const sourceBounds = canvas.getBoundingClientRect();
      const targetBounds = targetPreview.getBoundingClientRect();

      setAnimation({
        sourceCanvas: canvas,
        sourceBounds,
        targetBounds,
        cropArea: objectBounds,
      });

      const newMasks = masks.map(mask => {
        if (mask.id === maskId) {
          return { ...mask, found: true };
        }
        return mask;
      });

      if (newMasks.slice(1).every(mask => mask.found)) {
        setGameComplete(true);
      }

      setMasks(newMasks);
    }
  };

  const handleReset = () => {
    setMasks(MASK_IMAGES);
    setGameComplete(false);
  };

  const foundCount = masks.slice(1).filter(m => m.found).length;
  const totalCount = masks.length - 1;

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center py-8">
      <GameHeader foundCount={foundCount} totalCount={totalCount} />
      <div className="flex flex-col items-center gap-6">
        <div ref={objectBarRef}>
          <ObjectBar masks={masks} />
        </div>
        <GameBoard masks={masks} onMaskClick={handleMaskClick} />
      </div>
      {gameComplete && <GameComplete onReset={handleReset} />}
      {animation && (
        <AnimatedObject
          {...animation}
          onComplete={() => setAnimation(null)}
        />
      )}
    </div>
  );
}