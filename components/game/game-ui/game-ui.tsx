'use client';

import { memo } from 'react';
import { Game } from '@/types/game';
import { Progress } from '@/components/ui/progress';
import { ObjectList } from './object-list';
import { GameTimer } from './game-timer';
import { QuitButton } from './quit-button';
import { GameViewport } from './game-viewport';
import { ClickResult } from '@/types/canvas';

interface GameUIProps {
  game: Game;
  foundObjects: Set<string>;
  timeRemaining: number;
  onQuit: () => void;
  onObjectFound: (result: ClickResult) => void;
}

function GameUIComponent({ 
  game, 
  foundObjects, 
  timeRemaining, 
  onQuit,
  onObjectFound 
}: GameUIProps) {
  const progress = (foundObjects.size / game.objects.length) * 100;

  return (
    <div className="game-layout">
      <div className="game-header">
        <div className="game-ui">
          <div className="game-controls">
            <GameTimer timeRemaining={timeRemaining} />
            <Progress value={progress} className="w-1/3" />
            <div className="text-lg font-medium">
              {foundObjects.size}/{game.objects.length}
            </div>
            <QuitButton onQuit={onQuit} />
          </div>
          <ObjectList objects={game.objects} foundObjects={foundObjects} />
        </div>
      </div>
      <GameViewport
        game={game}
        foundObjects={foundObjects}
        onObjectFound={onObjectFound}
      />
    </div>
  );
}

export const GameUI = memo(GameUIComponent);
export default GameUI;