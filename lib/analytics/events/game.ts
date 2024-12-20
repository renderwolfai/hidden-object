import { event } from '../index';

export const trackGameComplete = ({
  gameId,
  title,
  isWin,
  foundCount,
  totalCount,
  timeRemaining
}: {
  gameId: string;
  title: string;
  isWin: boolean;
  foundCount: number;
  totalCount: number;
  timeRemaining: number;
}) => {
  event({
    action: isWin ? 'game_win' : 'game_loss',
    category: 'game',
    label: `${title} (${gameId})`,
    value: Math.round((foundCount / totalCount) * 100)
  });

  // Track detailed stats
  event({
    action: 'game_stats',
    category: 'game',
    label: gameId,
    value: timeRemaining
  });
};