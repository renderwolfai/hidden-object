import React, { useState } from 'react';
import { MASK_IMAGES } from '../constants/gameData';
import { GameHeader } from './GameHeader';
import { GameBoard } from './GameBoard';
import { GameComplete } from './GameComplete';

export default function HiddenObjectGame() {
  const [masks, setMasks] = useState(MASK_IMAGES);
  const [gameComplete, setGameComplete] = useState(false);

  const handleMaskClick = (maskId: number) => {
    const newMasks = masks.map(mask => {
      if (mask.id === maskId) {
        return { ...mask, found: true };
      }
      return mask;
    });

    setMasks(newMasks);
    
    if (newMasks.slice(1).every(mask => mask.found)) {
      setGameComplete(true);
    }
  };

  const handleReset = () => {
    setMasks(MASK_IMAGES);
    setGameComplete(false);
  };

  const foundCount = masks.slice(1).filter(m => m.found).length;
  const totalCount = masks.length - 1; // Exclude background image

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center py-8">
      <GameHeader foundCount={foundCount} totalCount={totalCount} />
      <GameBoard masks={masks} onMaskClick={handleMaskClick} />
      {gameComplete && <GameComplete onReset={handleReset} />}
    </div>
  );
}