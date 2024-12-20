'use client';

import { memo } from 'react';

interface GameTimerProps {
  timeRemaining: number;
}

function GameTimerComponent({ timeRemaining }: GameTimerProps) {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="text-2xl font-bold tabular-nums font-mono">
      {minutes}:{seconds.toString().padStart(2, '0')}
    </div>
  );
}

export const GameTimer = memo(GameTimerComponent);
export default GameTimer;