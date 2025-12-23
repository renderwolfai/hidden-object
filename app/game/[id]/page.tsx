import { notFound } from 'next/navigation';
import { getGameById, games } from '@/lib/games';
import GameClient from '@/components/game';
import { Metadata } from 'next';

interface GamePageProps {
  params: {
    id: string;
  };
}

export function generateMetadata({ params }: GamePageProps): Metadata {
  const game = getGameById(params.id);
  
  if (!game) {
    return {
      title: 'Game Not Found',
    };
  }

  const bannerImage = game.bannerPath || game.backgroundPath;

  return {
    title: `${game.title} - Hidden Object Game`,
    description: game.description,
    openGraph: {
      title: `${game.title} - Hidden Object Game`,
      description: game.description,
      images: [bannerImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${game.title} - Hidden Object Game`,
      description: game.description,
      images: [bannerImage],
    },
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