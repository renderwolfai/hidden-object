'use client';

import { memo, useState } from 'react';
import { GameObject } from '@/types/game';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ObjectPreview } from './object-preview';

interface ObjectListProps {
  objects: GameObject[];
  foundObjects: Set<string>;
}

function ObjectListComponent({ objects, foundObjects }: ObjectListProps) {
  const [showPreviews, setShowPreviews] = useState(false);

  return (
    <div className="flex items-center gap-4 overflow-x-auto pb-2">
      <span className="shrink-0 text-muted-foreground font-medium">You found:</span>
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0"
        onClick={() => setShowPreviews(!showPreviews)}
        title={showPreviews ? "Hide object previews" : "Show object previews"}
      >
        {showPreviews ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </Button>
      
      {objects.map((obj) => {
        const isFound = foundObjects.has(obj.id);
        return (
          <div
            key={obj.id}
            data-object-id={obj.id}
            className={cn(
              "relative flex items-center gap-2 px-3 py-1 rounded-full whitespace-nowrap transition-all duration-200",
              isFound ? "bg-primary/20 text-primary" : "bg-secondary text-secondary-foreground"
            )}
          >
            {showPreviews && (
              <div className="relative w-6 h-6 shrink-0 flex items-center justify-center">
                <ObjectPreview
                  maskPath={obj.maskPath}
                  name={obj.name}
                  isFound={isFound}
                />
              </div>
            )}
            {isFound && <span>{obj.name}</span>}
          </div>
        );
      })}
    </div>
  );
}

export const ObjectList = memo(ObjectListComponent);
export default ObjectList;