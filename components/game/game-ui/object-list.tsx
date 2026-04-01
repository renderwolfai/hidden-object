'use client';

import { memo, useState, useRef, useEffect } from 'react';
import { GameObject } from '@/types/game';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Eye, EyeOff, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ObjectPreview } from './object-preview';

interface ObjectListProps {
  objects: GameObject[];
  foundObjects: Set<string>;
  showDescriptions?: boolean;
  showUnfoundObjects?: boolean;
}

function ObjectBubble({ obj, isFound, showPreviews, showDescriptions }: {
  obj: GameObject;
  isFound: boolean;
  showPreviews: boolean;
  showDescriptions?: boolean;
}) {
  const bubbleContent = (
    <div
      data-object-id={obj.id}
      className={cn(
        "relative flex items-center gap-2 px-3 py-1 rounded-full whitespace-nowrap transition-all duration-200",
        isFound ? "bg-primary/20 text-primary" : "bg-secondary text-secondary-foreground",
        showDescriptions && "cursor-pointer hover:ring-2 hover:ring-primary/40"
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

  if (!showDescriptions) {
    return bubbleContent;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        {bubbleContent}
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3" side="bottom" align="center">
        <div className="flex flex-col gap-2">
          <div className="relative w-full h-24 flex items-center justify-center bg-secondary/50 rounded-md overflow-hidden">
            <ObjectPreview
              maskPath={obj.maskPath}
              name={obj.name}
              isFound={isFound}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h4 className="font-semibold text-sm">{obj.name}</h4>
            {obj.description && (
              <p className="text-xs text-muted-foreground mt-1">{obj.description}</p>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function ObjectListComponent({ objects, foundObjects, showDescriptions, showUnfoundObjects = false }: ObjectListProps) {
  const [showPreviews, setShowPreviews] = useState(showUnfoundObjects);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const checkScroll = () => {
      setCanScrollRight(el.scrollWidth > el.clientWidth + el.scrollLeft + 1);
    };

    checkScroll();
    el.addEventListener('scroll', checkScroll);
    const observer = new ResizeObserver(checkScroll);
    observer.observe(el);

    return () => {
      el.removeEventListener('scroll', checkScroll);
      observer.disconnect();
    };
  }, [objects, foundObjects]);

  return (
    <div className="relative flex items-center">
      <div
        ref={scrollRef}
        className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide"
      >
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

        {objects.map((obj) => (
          <ObjectBubble
            key={obj.id}
            obj={obj}
            isFound={foundObjects.has(obj.id)}
            showPreviews={showPreviews}
            showDescriptions={showDescriptions}
          />
        ))}
      </div>

      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-2 flex items-center pointer-events-none">
          <div className="h-full w-12 bg-gradient-to-l from-background to-transparent" />
          <ChevronRight className="h-4 w-4 text-muted-foreground animate-pulse -ml-4" />
        </div>
      )}
    </div>
  );
}

export const ObjectList = memo(ObjectListComponent);
export default ObjectList;
