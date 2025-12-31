'use client';

import { memo, useState } from 'react';
import { GameObject } from '@/types/game';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface HorizontalObjectIndicatorsProps {
  objects: GameObject[];
  foundObjects: Set<string>;
  className?: string;
}

function HorizontalObjectIndicatorsComponent({ objects, foundObjects, className }: HorizontalObjectIndicatorsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleTap = (id: string) => {
    setActiveId(id);
    setTimeout(() => setActiveId(null), 2000);
  };

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {objects.map((obj, index) => {
        const isFound = foundObjects.has(obj.id);
        const isActive = activeId === obj.id;
        return (
          <div
            key={obj.id}
            data-object-id={obj.id}
            className="relative"
            onClick={() => handleTap(obj.id)}
          >
            <div
              className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 cursor-pointer",
                isFound 
                  ? "bg-green-500 text-white scale-110" 
                  : "bg-white/20 text-white/70 active:bg-white/40"
              )}
            >
              {isFound ? (
                <Check className="w-4 h-4" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            {/* Tooltip showing object name */}
            {isActive && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 text-white text-xs rounded whitespace-nowrap z-20 animate-fade-in">
                {isFound ? obj.name : `Difference ${index + 1}`}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black/90" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export const HorizontalObjectIndicators = memo(HorizontalObjectIndicatorsComponent);
export default HorizontalObjectIndicators;

