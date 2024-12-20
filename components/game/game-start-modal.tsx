'use client';

import { memo } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

interface GameStartModalProps {
  gameDescription: string;
  isOpen: boolean;
  onStart: () => void;
  gameTitle: string;
}

function GameStartModalComponent({ isOpen, onStart, gameTitle, gameDescription }: GameStartModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={() => onStart()}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="text-2xl font-bold text-center">
          {gameTitle}
        </DialogTitle>
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            {gameDescription}
          </p>
          <Button 
            size="lg" 
            className="w-full"
            onClick={onStart}
          >
            <Play className="mr-2 h-5 w-5" />
            Start Game
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export const GameStartModal = memo(GameStartModalComponent);