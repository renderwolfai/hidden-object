'use client';

import { memo } from 'react';
import { Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createTwitterShareUrl, getBlurredImageUrl } from '@/lib/social';
import Link from 'next/link';

interface SocialShareProps {
  timeElapsed: number;
  gameTitle: string;
  gameId: string;
}

function SocialShareComponent({ timeElapsed, gameTitle, gameId }: SocialShareProps) {
  const minutes = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;
  const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  
  const shareText = `I completed ${gameTitle} in ${timeString}! Can you beat my time?`;
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const blurredImageUrl = getBlurredImageUrl(gameId);
  
  const handleTwitterShare = () => {
    const twitterUrl = createTwitterShareUrl({
      text: shareText,
      url: shareUrl,
      gameId
    });
    
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-4 pt-4">
      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          className="gap-2"
          onClick={handleTwitterShare}
        >
          <Twitter className="w-4 h-4" />
          Share on Twitter
        </Button>
      </div>
    </div>
  );
}

export const SocialShare = memo(SocialShareComponent);