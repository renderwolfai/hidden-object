'use client';

import { memo } from 'react';
import { Game } from '@/types/game';
import { Progress } from '@/components/ui/progress';
import { ObjectList } from './object-list';
import { GameTimer } from './game-timer';
import { QuitButton } from './quit-button';

interface GameUIProps {
  game: Game;
  foundObjects: Set<string>;
  timeRemaining: number;
  onQuit: () => void;
}

function GameUIComponent({ game, foundObjects, timeRemaining, onQuit }: GameUIProps) {
  const progress = (foundObjects.size / game.objects.length) * 100;

  return (
    <div className="bg-background/95 backdrop-blur-md border-b border-border/50 p-4">
      <div className="container mx-auto flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <GameTimer timeRemaining={timeRemaining} />
          <Progress value={progress} className="w-1/3" />
          <div className="text-lg font-medium">
            {foundObjects.size}/{game.objects.length}
          </div>
          {/* <QuitButton onQuit={onQuit} /> */}
        </div>
        <ObjectList objects={game.objects} foundObjects={foundObjects} />
      </div>
    </div>
  );
}

export const GameUI = memo(GameUIComponent);
export default GameUI;