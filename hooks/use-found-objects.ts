'use client';

import { useState, useCallback } from 'react';

export function useFoundObjects(totalObjects: number, onAllFound: () => void) {
  const [foundObjects, setFoundObjects] = useState<Set<string>>(new Set());

  const handleObjectFound = useCallback((objectId: string) => {
    setFoundObjects((prev) => {
      const newFound = new Set(prev);
      if (!newFound.has(objectId)) {
        newFound.add(objectId);
        if (newFound.size === totalObjects) {
          onAllFound();
        }
      }
      return newFound;
    });
  }, [totalObjects, onAllFound]);

  return {
    foundObjects,
    handleObjectFound,
  };
}