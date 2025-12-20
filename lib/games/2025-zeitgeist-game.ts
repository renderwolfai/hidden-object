import { Game } from '@/types/game';

export const zeitgeist2025Game: Game = {
  id: '2025-zeitgeist',
  title: '2025 Zeitgeist',
  description: `Find 2025's most viral moments in this image before the timer runs out!`,
  backgroundPath: '/static/2025-zeitgeist/zeitgiest_final_image_toy_co.png',
  difficulty: 'medium',
  timeLimit: 30,
  shareText: `Can you find 2025's most viral moments in this hidden object game by @renderwolfai?`,
  objects: [
    {
       id: 'object-1',
       name: 'Gorilla vs 100 men',
       maskPath: '/static/2025-zeitgeist/zeitgiest_gorilla_trastparent.png'
     },
     {
       id: 'object-2',
       name: 'Katy Perry in Space',
       maskPath: '/static/2025-zeitgeist/zeitgiest_katy_perry_trastparent.png'
     },
     {
       id: 'object-3',
       name: 'Kpop Demon Hunters',
       maskPath: '/static/2025-zeitgeist/zeitgiest_kpop_demon_hunters_trastparent.png'
     },
     {
       id: 'object-4',
       name: 'Labubu',
       maskPath: '/static/2025-zeitgeist/zeitgiest_labubu_trastparent.png'
     },
     {
       id: 'object-5',
       name: 'Louvre Heist',
       maskPath: '/static/2025-zeitgeist/zeitgiest_louvre_heist_trastparent.png'
     },
  ]
};

