import { notFound } from 'next/navigation';
import { getGameById, games } from '@/lib/games';
import GameClient from '@/components/game';

interface GamePageProps {
  params: {
    id: string;
  };
}

export default function GamePage({ params }: GamePageProps) {
  const game = getGameById(params.id);
  
  if (!game) {
    notFound();
  }

  return <GameClient game={game} />;
}

export function generateStaticParams() {
  return games.map(game => ({
    id: game.id
  }));
}