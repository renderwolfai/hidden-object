import React from 'react';
import { MaskImage } from '../../types/game';
import { ObjectPreview } from './ObjectPreview';

interface ObjectBarProps {
  masks: MaskImage[];
}

export function ObjectBar({ masks }: ObjectBarProps) {
  const objectMasks = masks.slice(1); // Skip background image

  return (
    <div className="bg-gray-800/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
      <h2 className="text-white text-lg font-semibold mb-3">Find these objects:</h2>
      <div className="flex gap-6 justify-center">
        {objectMasks.map((mask) => (
          <div key={mask.id} className="text-center">
            <ObjectPreview mask={mask} />
            <p className="text-white/90 text-sm mt-2 font-medium">{mask.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}