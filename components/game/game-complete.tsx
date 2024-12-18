'use client';

import { memo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface GameCompleteProps {
  open: boolean;
  onClose: () => void;
  foundCount: number;
  totalCount: number;
  timeRemaining: number;
}

function GameCompleteComponent({
  open,
  onClose,
  foundCount,
  totalCount,
  timeRemaining
}: GameCompleteProps) {
  const isWin = foundCount === totalCount;
  const score = Math.round((foundCount / totalCount) * 100);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            {isWin ? '🎉 Congratulations!' : '⏰ Time\'s Up!'}
          </DialogTitle>
        </DialogHeader>
        <div className="text-center space-y-4">
          <div className="text-4xl font-bold text-primary">{score}%</div>
          <p className="text-muted-foreground">
            You found {foundCount} out of {totalCount} objects
            {timeRemaining > 0 && ` with ${Math.floor(timeRemaining / 60)}:${(timeRemaining % 60).toString().padStart(2, '0')} remaining`}!
          </p>
          <Button
            className="w-full"
            onClick={onClose}
          >
            Return to Lobby
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export const GameComplete = memo(GameCompleteComponent);
export default GameComplete;