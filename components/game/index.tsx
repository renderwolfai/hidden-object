'use client';

import { Game } from '@/types/game';
import { GameUI } from './game-ui';
import { GameComplete } from './game-complete';
import { GameViewport } from './game-viewport';
import { useGameState } from '@/hooks/game';
import { useRouter } from 'next/navigation';
import { ClickResult } from '@/types/canvas';

interface GameClientProps {
  game: Game;
}

export default function GameClient({ game }: GameClientProps) {
  const router = useRouter();
  const {
    showComplete,
    timeRemaining,
    foundObjects,
    handleObjectFound,
    handleGameComplete,
  } = useGameState(game, () => router.push('/'));

  const handleQuit = () => {
    router.push('/');
  };

  const handleObjectClick = (result: ClickResult) => {
    handleObjectFound(result.id);
  };

  return (
    <div className="game-layout">
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
  );
}