'use client';

import { memo } from 'react';
import { BsTwitterX } from "react-icons/bs";
import { Button } from '@/components/ui/button';
import { createTwitterShareUrl } from '@/lib/social';
import { trackShare } from '@/lib/analytics/events/share';

interface SocialShareProps {
  shareText: string;
  gameId: string;
  gameTitle: string;
}

function SocialShareComponent({ gameId, gameTitle, shareText }: SocialShareProps) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  
  const handleTwitterShare = () => {
    trackShare({
      platform: 'twitter',
      gameId,
      title: gameTitle
    });
    
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
          Share on <BsTwitterX className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
export const SocialShare = memo(SocialShareComponent);