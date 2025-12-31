'use client';

import { memo } from 'react';
import { GameObject } from '@/types/game';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface HorizontalObjectIndicatorsProps {
  objects: GameObject[];
  foundObjects: Set<string>;
  className?: string;
}

function HorizontalObjectIndicatorsComponent({ objects, foundObjects, className }: HorizontalObjectIndicatorsProps) {
  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {objects.map((obj, index) => {
        const isFound = foundObjects.has(obj.id);
        return (
          <div
            key={obj.id}
            data-object-id={obj.id}
            className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300",
              isFound 
                ? "bg-green-500 text-white scale-110" 
                : "bg-white/20 text-white/70"
            )}
            title={isFound ? obj.name : `Difference ${index + 1}`}
          >
            {isFound ? (
              <Check className="w-4 h-4" />
            ) : (
              <span>{index + 1}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export const HorizontalObjectIndicators = memo(HorizontalObjectIndicatorsComponent);
export default HorizontalObjectIndicators;

