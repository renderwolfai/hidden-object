'use client';

import { Game, GameType } from '@/types/game';
import { memo } from 'react';
import { Clock, Gauge, Search, GitCompare } from 'lucide-react';
import Link from 'next/link';

interface GameCardProps {
  game: Game;
}

const gameTypeLabels: Record<GameType, { label: string; icon: typeof Search; className: string }> = {
  'hidden-object': { label: 'Hidden Object', icon: Search, className: 'game-type-badge-hidden' },
  'spot-the-difference': { label: 'Spot the Difference', icon: GitCompare, className: 'game-type-badge-spotdiff' },
};

const GameCard = memo(function GameCard({ game }: GameCardProps) {
  const typeInfo = gameTypeLabels[game.type];
  const TypeIcon = typeInfo.icon;
  const previewImage = game.bannerPath || game.backgroundPath;
  const isSpotDiff = game.type === 'spot-the-difference';

  return (
    <Link href={`/game/${game.id}`} className="game-card">
      <div className="game-preview">
        {isSpotDiff && game.originalImagePath ? (
          <div className="spot-diff-preview">
            <div className="spot-diff-preview-panel">
              <img
                src={game.originalImagePath}
                alt={`${game.title} - Scene A`}
                loading="lazy"
              />
              <span className="spot-diff-preview-label">Scene A</span>
            </div>
            <div className="spot-diff-preview-panel">
              <img
                src={game.backgroundPath}
                alt={`${game.title} - Scene B`}
                loading="lazy"
              />
              <span className="spot-diff-preview-label">Scene B</span>
            </div>
          </div>
        ) : (
          <img
            src={previewImage}
            alt={game.title}
            loading="lazy"
          />
        )}
        <div className={`game-type-badge ${typeInfo.className}`}>
          <TypeIcon className="w-3 h-3" />
          <span>{typeInfo.label}</span>
        </div>
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
    </Link>
  );
});

interface GameLobbyProps {
  games: Game[];
}

export default function GameLobby({ games }: GameLobbyProps) {
  // Filter to only show games where showInLobby is not explicitly false
  const visibleGames = games.filter(game => game.showInLobby !== false);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-1">Visual Puzzle Games</h1>
        <p className="text-sm text-muted-foreground mb-3">
          made with{' '}
          <a 
            href="https://app.renderwolf.ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            renderwolf.ai
          </a>
        </p>
        <p className="text-lg text-muted-foreground">
          The art and code for these puzzle games were generated using Renderwolf AI. Find hidden objects or spot the differences in puzzling settings!        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleGames.map((game) => (
          <GameCard 
            key={game.id} 
            game={game}
          />
        ))}
      </div>
    </div>
  );
}