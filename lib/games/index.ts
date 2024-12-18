import { testGame } from './test-game';
import { zeitgeistGame } from './zeitgeist-game';
import { Game } from '@/types/game';

export const games: Game[] = [
  testGame,
  zeitgeistGame
];

export const getGameById = (id: string): Game | undefined => {
  return games.find(game => game.id === id);
};