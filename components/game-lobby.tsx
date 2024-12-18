'use client';

import { Game } from '@/types/game';
import { useRouter } from 'next/navigation';
import { memo } from 'react';
import { Clock, Gauge } from 'lucide-react';

interface GameCardProps {
  game: Game;
  onClick: () => void;
}

const GameCard = memo(function GameCard({ game, onClick }: GameCardProps) {
  return (
    <div className="game-card" onClick={onClick}>
      <div className="game-preview">
        <img
          src={game.backgroundPath}
          alt={game.title}
          loading="lazy"
        />
      </div>
      <div className="game-info">
        <h3 className="game-title">{game.title}</h3>
        <p className="game-description">{game.description}</p>
        <div className="game-metadata">
          <div className="flex items-center gap-1.5">
            <Gauge className="w-4 h-4" />
            <span className="capitalize">{game.difficulty}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{Math.floor(game.timeLimit / 60)}:{(game.timeLimit % 60).toString().padStart(2, '0')}</span>
          </div>
        </div>
      </div>
    </div>
  );
});

interface GameLobbyProps {
  games: Game[];
}

export default function GameLobby({ games }: GameLobbyProps) {
  const router = useRouter();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">Hidden Object Games</h1>
        <p className="text-lg text-muted-foreground">
          Find hidden objects in beautiful scenes
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <GameCard 
            key={game.id} 
            game={game}
            onClick={() => router.push(`/game/${game.id}`)}
          />
        ))}
      </div>
    </div>
  );
}