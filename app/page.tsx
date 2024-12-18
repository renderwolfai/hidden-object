import GameLobby from '@/components/game-lobby';
import { games } from '@/lib/games';

export default function Home() {
  return <GameLobby games={games} />;
}