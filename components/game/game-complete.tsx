'use client';

import { memo } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Logo } from '@/components/logo';
import { SocialShare } from './social-share';
import Link from 'next/link';

interface GameCompleteProps {
  open: boolean;
  onClose: () => void;
  foundCount: number;
  totalCount: number;
  timeRemaining: number;
  timeLimit: number;
  gameTitle: string;
  gameId: string;
}

function GameCompleteComponent({
  open,
  onClose,
  foundCount,
  totalCount,
  timeRemaining,
  timeLimit,
  gameTitle,
  gameId
}: GameCompleteProps) {
  const isWin = foundCount === totalCount;
  const score = Math.round((foundCount / totalCount) * 100);
  const timeElapsed = timeLimit - timeRemaining;

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="text-2xl text-center">
          {isWin ? '🎉 Congratulations!' : '⏰ Time\'s Up!'}
        </DialogTitle>
        <div className="text-center space-y-4">
          <div className="text-4xl font-bold text-primary">{score}%</div>
          <p className="text-muted-foreground">
            You found {foundCount} out of {totalCount} objects
            {timeRemaining > 0 && ` with ${Math.floor(timeRemaining / 60)}:${(timeRemaining % 60).toString().padStart(2, '0')} remaining`}!
          </p>
          
          
          {isWin ? <SocialShare 
            timeElapsed={timeElapsed}
            gameTitle={gameTitle}
            gameId={gameId}
          /> : undefined}

          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground mb-3">
              Powered by
            </p>
            <Link 
              href="https://renderwolf.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block hover:opacity-80 transition-opacity"
            >
              <Logo />
            </Link>
            <p className="text-sm text-muted-foreground mt-2">
              Check out more AI-powered games at RenderWolf!
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export const GameComplete = memo(GameCompleteComponent);