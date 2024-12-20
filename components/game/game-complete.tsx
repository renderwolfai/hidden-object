"use client";
import { memo, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Logo } from "@/components/logo";
import { SocialShare } from "./social-share";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { trackGameComplete } from "@/lib/analytics/events/game";
import { trackLogoClick } from "@/lib/analytics/events/navigation";

interface GameCompleteProps {
  open: boolean;
  onClose: () => void;
  onRetry: () => void;
  foundCount: number;
  totalCount: number;
  timeRemaining: number;
  gameId: string;
  gameTitle: string;
  gameShareText: string;
}

function GameCompleteComponent({
  open,
  onClose,
  onRetry,
  foundCount,
  totalCount,
  timeRemaining,
  gameId,
  gameTitle,
  gameShareText,
}: GameCompleteProps) {
  const isWin = foundCount === totalCount;
  const score = Math.round((foundCount / totalCount) * 100);

  // Track game completion
  useEffect(() => {
    if (open) {
      trackGameComplete({
        gameId,
        title: gameTitle,
        isWin,
        foundCount,
        totalCount,
        timeRemaining
      });
    }
  }, [open, gameId, gameTitle, isWin, foundCount, totalCount, timeRemaining]);

  const handleLogoClick = () => {
    trackLogoClick();
    window.open('https://renderwolf.ai', '_blank', 'noopener,noreferrer');
  };

  return (
    <Dialog open={open} onOpenChange={isWin ? onClose : undefined}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="text-2xl text-center">
          {isWin ? "🎉 Congratulations!" : "⏰ Time's Up!"}
        </DialogTitle>
        <div className="text-center space-y-4">
          <div className="text-4xl font-bold text-primary">{score}%</div>
          <p className="text-muted-foreground">
            You found {foundCount} out of {totalCount} objects
            {timeRemaining > 0 &&
              ` with ${Math.floor(timeRemaining / 60)}:${(timeRemaining % 60)
                .toString()
                .padStart(2, "0")} remaining`}
            !
          </p>

          {isWin ? (
            <SocialShare 
              shareText={gameShareText} 
              gameId={gameId}
              gameTitle={gameTitle}
            />
          ) : (
            <Button 
              size="lg" 
              className="w-full"
              onClick={onRetry}
            >
              <RotateCcw className="mr-2 h-5 w-5" />
              Try Again
            </Button>
          )}

          <div 
            className="inline-block hover:opacity-60 transition-opacity pt-4 border-t cursor-pointer"
            onClick={handleLogoClick}
          >
            <p className="text-sm text-muted-foreground mb-3">Powered by</p>
            <Logo />
            <p className="text-sm text-muted-foreground mt-2">
              Make game art using Generative AI!
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export const GameComplete = memo(GameCompleteComponent);