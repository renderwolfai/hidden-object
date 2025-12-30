import { testGame } from './test-game';
import { zeitgeistGame } from './zeitgeist-game';
import { zeitgeist2025Game } from './2025-zeitgeist-game';
import { spotDiffExampleGame } from './spot-diff-2026';
import { Game } from '@/types/game';

export const games: Game[] = [
  testGame,
  zeitgeistGame,
  zeitgeist2025Game,
  spotDiffExampleGame
];

export const getGameById = (id: string): Game | undefined => {
  return games.find(game => game.id === id);
};