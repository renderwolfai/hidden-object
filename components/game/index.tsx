'use client';

import { Game } from '@/types/game';
import { GameUI } from './game-ui';
import { GameComplete } from './game-complete';
import { GameViewport } from './game-viewport';
import { GameStartModal } from './game-start-modal';
import { useGameState } from '@/hooks/game';
import { useGameStart } from '@/hooks/game/use-game-start';
import { ClickResult } from '@/types/canvas';
import { cn } from '@/lib/utils';

interface GameClientProps {
  game: Game;
}

export default function GameClient({ game }: GameClientProps) {
  const { showStart, isBlurred, handleStart } = useGameStart();
  const {
    showComplete,
    timeRemaining,
    foundObjects,
    handleObjectFound,
    handleGameComplete,
    startTimer,
  } = useGameState(game);

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
        gameDescription={game.description}
      />
      <div className={cn(
        "game-layout",
        isBlurred && "blur-sm transition-all duration-300"
      )}>
        <GameUI
          game={game}
          foundObjects={foundObjects}
          timeRemaining={timeRemaining}
          onQuit={() => window.location.href = '/'}
        />
        <GameViewport
          game={game}
          foundObjects={foundObjects}
          onObjectFound={handleObjectClick}
        />
        <GameComplete
          open={showComplete}
          onClose={() => handleGameComplete()}
          foundCount={foundObjects.size}
          totalCount={game.objects.length}
          timeRemaining={timeRemaining}
          gameShareText={game.shareText || `I just beat ${game.title} on Hidden Object by @renderwolfai! Can you?`}
          gameId={game.id}
        />
      </div>
    </>
  );
}