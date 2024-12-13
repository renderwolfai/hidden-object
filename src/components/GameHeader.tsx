import React from 'react';

interface GameHeaderProps {
  foundCount: number;
  totalCount: number;
}

export function GameHeader({ foundCount, totalCount }: GameHeaderProps) {
  return (
    <div className="text-white mb-6">
      <h1 className="text-3xl font-bold mb-2">Hidden Object Game</h1>
      <p className="text-gray-300">Find all {totalCount} hidden objects in the image!</p>
      <p className="text-xl mt-2">
        Found: {foundCount} / {totalCount}
      </p>
    </div>
  );
}