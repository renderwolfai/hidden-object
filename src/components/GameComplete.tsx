import React from 'react';
import { Trophy } from 'lucide-react';

interface GameCompleteProps {
  onReset: () => void;
}

export function GameComplete({ onReset }: GameCompleteProps) {
  return (
    <div className="mt-8 text-center">
      <div className="flex items-center justify-center gap-2 text-yellow-400 text-2xl font-bold">
        <Trophy size={32} />
        <span>Congratulations! You found all objects!</span>
      </div>
      <button
        onClick={onReset}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Play Again
      </button>
    </div>
  );
}