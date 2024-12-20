'use client';

import { useState, useCallback } from 'react';

export function useGameStart() {
  const [showStart, setShowStart] = useState(true);
  const [isBlurred, setIsBlurred] = useState(true);

  const handleStart = useCallback(() => {
    setShowStart(false);
    setIsBlurred(false);
  }, []);

  return {
    showStart,
    isBlurred,
    handleStart
  };
}