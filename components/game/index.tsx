'use client';

import { Game } from '@/types/game';
import { GameUI } from './game-ui';
import { GameComplete } from './game-complete';
import { GameViewport } from './game-viewport';
import { GameStartModal } from './game-start-modal';
import { useGameState } from '@/hooks/game';
import { useGameStart } from '@/hooks/game/use-game-start';
import { useRouter } from 'next/navigation';
import { ClickResult } from '@/types/canvas';
import { cn } from '@/lib/utils';

interface GameClientProps {
  game: Game;
}

export default function GameClient({ game }: GameClientProps) {
  const router = useRouter();
  const { showStart, isBlurred, handleStart } = useGameStart();
  const {
    showComplete,
    timeRemaining,
    foundObjects,
    handleObjectFound,
    handleGameComplete,
    startTimer,
  } = useGameState(game, () => router.push('/'));

  const handleQuit = () => {
    router.push('/');
  };

  const handleObjectClick = (result: ClickResult) => {
    handleObjectFound(result.id);
  };

  const handleGameStart = () => {
    handleStart();
    startTimer();
  };

  return (
    <>
      <GameStartModal
        isOpen={showStart}
        onStart={handleGameStart}
        gameTitle={game.title}
      />
      <div className={cn(
        "game-layout",
        isBlurred && "blur-sm transition-all duration-300"
      )}>
        <GameUI
          game={game}
          foundObjects={foundObjects}
          timeRemaining={timeRemaining}
          onQuit={handleQuit}
        />
        <GameViewport
          game={game}
          foundObjects={foundObjects}
          onObjectFound={handleObjectClick}
        />
        <GameComplete
          open={showComplete}
          onClose={handleGameComplete}
          foundCount={foundObjects.size}
          totalCount={game.objects.length}
          timeRemaining={timeRemaining}
        />
      </div>
    </>
  );
}