'use client';

import { memo, useRef } from 'react';
import { Game } from '@/types/game';
import { useGameCanvas } from '@/hooks/use-game-canvas';
import { ClickResult, CanvasSize } from '@/types/canvas';
import { cn } from '@/lib/utils';

interface GameCanvasProps {
  game: Game;
  foundObjects: Set<string>;
  onObjectFound: (result: ClickResult) => void;
  canvasSize: CanvasSize;
  className?: string;
}

function GameCanvasComponent({ 
  game, 
  foundObjects, 
  onObjectFound,
  canvasSize,
  className 
}: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { handleClick } = useGameCanvas(canvasRef, game, foundObjects, canvasSize);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const result = handleClick(e);
    if (result) {
      onObjectFound(result);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize.width}
      height={canvasSize.height}
      onClick={handleCanvasClick}
      className={cn("game-layer", className)}
      style={{
        width: `${canvasSize.width * canvasSize.scale}px`,
        height: `${canvasSize.height * canvasSize.scale}px`
      }}
    />
  );
}

export const GameCanvas = memo(GameCanvasComponent);
export default GameCanvas;