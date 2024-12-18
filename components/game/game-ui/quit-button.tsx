'use client';

import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

interface QuitButtonProps {
  onQuit: () => void;
}

function QuitButtonComponent({ onQuit }: QuitButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
      onClick={onQuit}
      title="Quit Game"
    >
      <XCircle className="h-6 w-6" />
    </Button>
  );
}

export const QuitButton = memo(QuitButtonComponent);
export default QuitButton;