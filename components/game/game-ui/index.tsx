'use client';

import { memo } from 'react';
import { Game } from '@/types/game';
import { Progress } from '@/components/ui/progress';
import { ObjectList } from './object-list';
import { GameTimer } from './game-timer';
import { Gamepad2 } from 'lucide-react';
import Link from 'next/link';

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
        <div className="flex items-center justify-between gap-3">
          <Link 
            href="/" 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary hover:bg-secondary/80 transition-colors text-sm font-medium shrink-0"
            title="All Games"
          >
            <Gamepad2 className="w-4 h-4" />
            <span className="hidden sm:inline">All Games</span>
          </Link>
          <GameTimer timeRemaining={timeRemaining} />
          <Progress value={progress} className="w-1/4 hidden sm:block" />
          <div className="text-lg font-medium shrink-0">
            {foundObjects.size}/{game.objects.length}
          </div>
        </div>
        <ObjectList objects={game.objects} foundObjects={foundObjects} />
      </div>
    </div>
  );
}

export const GameUI = memo(GameUIComponent);
export default GameUI;