'use client';

import { memo } from 'react';
import { Game } from '@/types/game';
import { GameCanvas } from './game-canvas';
import { ClickResult } from '@/types/canvas';

interface GameViewportProps {
  game: Game;
  foundObjects: Set<string>;
  onObjectFound: (result: ClickResult) => void;
}

function GameViewportComponent({ game, foundObjects, onObjectFound }: GameViewportProps) {
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
          />
          <GameCanvas 
            game={game} 
            foundObjects={foundObjects}
            onObjectFound={handleObjectClick}
            className="game-layer"
          />
        </div>
      </div>
    </div>
  );
}

export const GameViewport = memo(GameViewportComponent);
export default GameViewport;