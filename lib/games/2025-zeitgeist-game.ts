import { Game } from '@/types/game';

export const zeitgeist2025Game: Game = {
  id: '2025-zeitgeist',
  title: '2025 Zeitgeist',
  description: `Find 2025's most viral moments in this image before the timer runs out!`,
  backgroundPath: '/static/2025-zeitgeist/zeitgiest2025_master_image_final.png',
  difficulty: 'medium',
  timeLimit: 30,
  shareText: `Can you find 2025's most viral moments in this hidden object game by @renderwolfai?`,
  objects: [
    {
       id: 'object-1',
       name: 'Gorilla vs 100 men',
       maskPath: '/static/2025-zeitgeist/zeitgiest2025_street_gorilla_transparent.png'
     },
     {
       id: 'object-2',
       name: 'Katy Perry in Space',
       maskPath: '/static/2025-zeitgeist/zeitgiest2025_street_katyperry_transparent.png'
     },
     {
       id: 'object-3',
       name: 'KPop Demon Hunters',
       maskPath: '/static/2025-zeitgeist/zeitgiest2025_street_kpop_transparent.png'
     },
     {
       id: 'object-4',
       name: 'Labubu',
       maskPath: '/static/2025-zeitgeist/zeitgiest2025_street_labubu_transparent.png'
     },
     {
       id: 'object-5',
       name: 'Louvre Heist',
       maskPath: '/static/2025-zeitgeist/zeitgiest2025_street_louvre_transparent.png'
     },
  ]
};

