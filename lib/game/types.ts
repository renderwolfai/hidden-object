import { GameObject } from '@/types/game';
import { ClickPosition, ClickResult } from '@/types/canvas';

export interface GameState {
  foundObjects: Set<string>;
  timeRemaining: number;
  showComplete: boolean;
}

export interface GameAction {
  type: 'FIND_OBJECT' | 'TICK' | 'COMPLETE' | 'RESET';
  payload?: any;
}

export interface GameContext {
  game: GameObject;
  onComplete?: () => void;
}