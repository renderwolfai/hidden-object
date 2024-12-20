'use client';

import { memo, useState } from 'react';
import { Game } from '@/types/game';
import { GameCanvas } from './game-canvas';
import { FoundObjectAnimation } from './found-object-animation';
import { ClickResult } from '@/types/canvas';
import { Position } from '@/types/animation';

interface GameViewportProps {
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

function GameViewportComponent({ game, foundObjects, onObjectFound }: GameViewportProps) {
  const [animation, setAnimation] = useState<AnimationState | null>(null);

  const handleObjectClick = (result: ClickResult) => {
    const object = game.objects.find(obj => obj.id === result.id);
    if (!object) return;

    const badge = document.querySelector(`[data-object-id="${result.id}"]`);
    if (!badge) return;

    // Get the badge's dimensions and position
    const badgeRect = badge.getBoundingClientRect();
    
    // Calculate the center of the badge
    const endPosition = {
      x: badgeRect.left + (badgeRect.width / 2),
      y: badgeRect.top + (badgeRect.height / 2)
    };

    setAnimation({
      id: result.id,
      maskPath: object.maskPath,
      startPosition: result.objectCenter, // Use the object's center as start position
      endPosition
    });

    onObjectFound(result);
  };

  const handleAnimationComplete = () => {
    setAnimation(null);
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
          />
          <GameCanvas 
            game={game} 
            foundObjects={foundObjects}
            onObjectFound={handleObjectClick}
            className="game-layer"
          />
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
      </div>
    </div>
  );
}

export const GameViewport = memo(GameViewportComponent);
export default GameViewport;