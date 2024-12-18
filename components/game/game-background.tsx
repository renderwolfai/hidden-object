'use client';

import { memo } from 'react';

interface GameBackgroundProps {
  src: string;
}

function GameBackgroundComponent({ src }: GameBackgroundProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <img
        src={src}
        alt="Game background"
        className="max-w-full max-h-full w-auto h-auto object-contain"
        loading="eager"
        decoding="sync"
      />
    </div>
  );
}

export const GameBackground = memo(GameBackgroundComponent);
export default GameBackground;