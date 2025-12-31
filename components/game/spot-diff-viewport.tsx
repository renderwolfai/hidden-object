'use client';

import { memo, useState, useEffect } from 'react';
import { Game } from '@/types/game';
import { GameCanvas } from './game-canvas';
import { FoundObjectAnimation } from './found-object-animation';
import { ClickResult, CanvasSize } from '@/types/canvas';
import { Position } from '@/types/animation';
import { loadImage } from '@/lib';

interface SpotDiffViewportProps {
  game: Game;
  foundObjects: Set<string>;
  onObjectFound: (result: ClickResult) => void;
}

interface AnimationState {
  id: string;
  maskPath: string;
  startPosition: Position;
  endPosition: Position;
}

function useSpotDiffCanvasSize(game: Game): CanvasSize {
  const [size, setSize] = useState<CanvasSize>({ width: 0, height: 0, scale: 1 });

  useEffect(() => {
    const updateSize = async () => {
      const backgroundImg = await loadImage(game.backgroundPath);
      // Use the image container (not the panel) for accurate size calculation
      // The panel includes the label which takes up space
      const container = document.querySelector('.spot-diff-panel:last-child .spot-diff-image-container');
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      
      // Calculate scale to fit the image in the actual image container
      const scaleX = containerRect.width / backgroundImg.width;
      const scaleY = containerRect.height / backgroundImg.height;
      const scale = Math.min(scaleX, scaleY);

      setSize({
        width: backgroundImg.width,
        height: backgroundImg.height,
        scale
      });
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [game.backgroundPath]);

  return size;
}

function SpotDiffViewportComponent({ game, foundObjects, onObjectFound }: SpotDiffViewportProps) {
  const [animation, setAnimation] = useState<AnimationState | null>(null);
  const [showHint, setShowHint] = useState(false);
  const canvasSize = useSpotDiffCanvasSize(game);

  const handleOriginalClick = () => {
    setShowHint(true);
    setTimeout(() => setShowHint(false), 2500);
  };

  const handleObjectClick = (result: ClickResult) => {
    const object = game.objects.find(obj => obj.id === result.id);
    if (!object) return;

    const badge = document.querySelector(`[data-object-id="${result.id}"]`);
    if (!badge) return;

    const badgeRect = badge.getBoundingClientRect();
    
    const endPosition = {
      x: badgeRect.left + (badgeRect.width / 2),
      y: badgeRect.top + (badgeRect.height / 2)
    };

    setAnimation({
      id: result.id,
      maskPath: object.maskPath,
      startPosition: result.objectCenter,
      endPosition
    });

    onObjectFound(result);
  };

  const handleAnimationComplete = () => {
    setAnimation(null);
  };

  const imageStyle = {
    width: `${canvasSize.width * canvasSize.scale}px`,
    height: `${canvasSize.height * canvasSize.scale}px`
  };

  return (
    <div className="game-content">
      <div className="spot-diff-container">
        {/* Original Image Panel (static, non-interactive) */}
        <div className="spot-diff-panel" onClick={handleOriginalClick}>
          <div className="spot-diff-label">Original</div>
          <div className="spot-diff-image-container">
            <img
              src={game.originalImagePath || game.backgroundPath}
              alt="Original image"
              className="spot-diff-image"
              loading="eager"
              decoding="sync"
              style={imageStyle}
            />
            {showHint && (
              <div className="spot-diff-hint">
                Use the other image to spot the differences
              </div>
            )}
          </div>
        </div>

        {/* Differences Panel (interactive) */}
        <div className="spot-diff-panel">
          <div className="spot-diff-label">Find the Differences</div>
          <div className="spot-diff-image-container">
            <img
              src={game.backgroundPath}
              alt="Find the differences"
              className="spot-diff-image"
              loading="eager"
              decoding="sync"
              style={imageStyle}
            />
            <GameCanvas 
              game={game} 
              foundObjects={foundObjects}
              onObjectFound={handleObjectClick}
              className="spot-diff-canvas"
              canvasSize={canvasSize}
            />
          </div>
        </div>
      </div>

      {animation && (
        <FoundObjectAnimation
          key={animation.id}
          id={animation.id}
          imagePath={animation.maskPath}
          startPosition={animation.startPosition}
          endPosition={animation.endPosition}
          onComplete={handleAnimationComplete}
        />
      )}
    </div>
  );
}

export const SpotDiffViewport = memo(SpotDiffViewportComponent);
export default SpotDiffViewport;

