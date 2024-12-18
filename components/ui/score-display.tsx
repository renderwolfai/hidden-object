'use client';

import { memo } from 'react';
import { calculateScore, getScoreMessage } from '@/lib/game/score';

interface ScoreDisplayProps {
  foundCount: number;
  totalCount: number;
  timeRemaining: number;
}

function ScoreDisplayComponent({ foundCount, totalCount, timeRemaining }: ScoreDisplayProps) {
  const score = calculateScore(foundCount, totalCount, timeRemaining);
  const message = getScoreMessage(score);

  return (
    <div className="text-center space-y-4">
      <div className="text-4xl font-bold text-primary">{score}%</div>
      <p className="text-xl font-medium">{message}</p>
      <p className="text-muted-foreground">
        Found {foundCount} out of {totalCount} objects
        {timeRemaining > 0 && ` with ${Math.floor(timeRemaining / 60)}:${(timeRemaining % 60).toString().padStart(2, '0')} remaining`}
      </p>
    </div>
  );
}

export const ScoreDisplay = memo(ScoreDisplayComponent);