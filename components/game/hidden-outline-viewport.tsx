'use client';

import { memo, useRef, useState } from 'react';
import { Game } from '@/types/game';
import { ClickResult, CanvasSize } from '@/types/canvas';
import { useHiddenOutlineCanvas } from '@/hooks/use-hidden-outline-canvas';
import { useCanvasSize } from '@/hooks/canvas/use-canvas-size';
import { HiddenOutlineDebugPanel } from './hidden-outline-debug';
import { LoadedOverlay } from '@/hooks/canvas/use-outline-loader';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';

interface HiddenOutlineViewportProps {
  game: Game;
  foundObjects: Set<string>;
  onObjectFound: (result: ClickResult) => void;
}

function HiddenOutlineCanvasComponent({
  game,
  foundObjects,
  onObjectFound,
  canvasSize,
  className,
  onOverlayMapReady,
}: {
  game: Game;
  foundObjects: Set<string>;
  onObjectFound: (result: ClickResult) => void;
  canvasSize: CanvasSize;
  className?: string;
  onOverlayMapReady: (map: Map<string, LoadedOverlay[]>) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { handleClick, overlayMap } = useHiddenOutlineCanvas(canvasRef, game, foundObjects, canvasSize);

  // Pass overlayMap up to parent for debug panel
  const lastMapRef = useRef<Map<string, LoadedOverlay[]>>(new Map());
  if (overlayMap !== lastMapRef.current && overlayMap.size > 0) {
    lastMapRef.current = overlayMap;
    // Schedule state update to avoid updating parent during render
    Promise.resolve().then(() => onOverlayMapReady(overlayMap));
  }

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
        height: `${canvasSize.height * canvasSize.scale}px`,
        cursor: 'pointer',
      }}
    />
  );
}

function HiddenOutlineViewportComponent({ game, foundObjects, onObjectFound }: HiddenOutlineViewportProps) {
  const canvasSize = useCanvasSize(game);
  const searchParams = useSearchParams();
  const isDebug = searchParams.get('debug') !== null;
  const [overlayMap, setOverlayMap] = useState<Map<string, LoadedOverlay[]>>(new Map());

  const handleObjectClick = (result: ClickResult) => {
    onObjectFound(result);
  };

  return (
    <div className="game-content">
      <div className="game-viewport">
        <div className="game-container">
          <img
            src={game.backgroundPath}
            alt="Game background"
            className="game-layer"
            loading="eager"
            decoding="sync"
            style={{
              width: `${canvasSize.width * canvasSize.scale}px`,
              height: `${canvasSize.height * canvasSize.scale}px`,
            }}
          />
          <HiddenOutlineCanvasComponent
            game={game}
            foundObjects={foundObjects}
            onObjectFound={handleObjectClick}
            canvasSize={canvasSize}
            className="game-layer"
            onOverlayMapReady={setOverlayMap}
          />
          {isDebug && overlayMap.size > 0 && (
            <HiddenOutlineDebugPanel
              game={game}
              canvasSize={canvasSize}
              overlayMap={overlayMap}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export const HiddenOutlineViewport = memo(HiddenOutlineViewportComponent);
export default HiddenOutlineViewport;
