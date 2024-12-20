'use client';

import { useState, useCallback, useEffect } from 'react';
import { Game } from '@/types/game';
import { useGameTimer } from './use-game-timer';
import { useFoundObjects } from './use-found-objects';

export function useGameState(game: Game) {
  const [showComplete, setShowComplete] = useState(false);
  
  const handleTimeUp = useCallback(() => {
    setShowComplete(true);
  }, []);

  const handleAllFound = useCallback(() => {
    setShowComplete(true);
  }, []);

  const { timeRemaining, startTimer, pauseTimer } = useGameTimer(game.timeLimit, handleTimeUp);
  const { foundObjects, handleObjectFound } = useFoundObjects(game.objects.length, handleAllFound);

  // Stop timer when game is complete
  useEffect(() => {
    if (showComplete) {
      pauseTimer();
    }
  }, [showComplete, pauseTimer]);

  const handleGameComplete = useCallback(() => {
    setShowComplete(false);
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => pauseTimer();
  }, [pauseTimer]);

  return {
    showComplete,
    timeRemaining,
    foundObjects,
    handleObjectFound,
    handleGameComplete,
    startTimer,
  };
}