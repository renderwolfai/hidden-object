'use client';

import { useState, useCallback, useEffect } from 'react';
import { Game } from '@/types/game';
import { useGameTimer } from './use-game-timer';
import { useFoundObjects } from './use-found-objects';

export function useGameState(game: Game, onGameComplete: () => void) {
  const [showComplete, setShowComplete] = useState(false);
  
  const handleTimeUp = useCallback(() => {
    setShowComplete(true);
  }, []);

  const handleAllFound = useCallback(() => {
    setShowComplete(true);
  }, []);

  const { timeRemaining, startTimer, pauseTimer } = useGameTimer(game.timeLimit, handleTimeUp);
  const { foundObjects, handleObjectFound } = useFoundObjects(game.objects.length, handleAllFound);

  const handleGameComplete = useCallback(() => {
    pauseTimer();
    setShowComplete(false);
    onGameComplete();
  }, [onGameComplete, pauseTimer]);

  useEffect(() => {
    startTimer();
    return () => pauseTimer();
  }, [startTimer, pauseTimer]);

  return {
    showComplete,
    timeRemaining,
    foundObjects,
    handleObjectFound,
    handleGameComplete,
  };
}