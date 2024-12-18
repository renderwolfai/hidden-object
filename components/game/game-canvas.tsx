'use client';

import { memo, useRef } from 'react';
import { Game } from '@/types/game';
import { useGameCanvas } from '@/hooks/use-game-canvas';
import { ClickResult } from '@/types/canvas';
import { cn } from '@/lib/utils';

interface GameCanvasProps {
  game: Game;
  foundObjects: Set<string>;
  onObjectFound: (result: ClickResult) => void;
  className?: string;
}

function GameCanvasComponent({ 
  game, 
  foundObjects, 
  onObjectFound,
  className 
}: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { canvasSize, handleClick } = useGameCanvas(canvasRef, game, foundObjects);

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize.width}
      height={canvasSize.height}
      onClick={(e) => {
        const result = handleClick(e);
        if (result) {
          onObjectFound(result);
        }
      }}
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