import { Game } from '@/types/game';

export const zeitgeistGame: Game = {
  id: 'zeitgeist-2024',
  title: '2024 Zeitgeist',
  description: `Find 2024's most viral moments in this image before the timer runs out!`,
  type: 'hidden-object',
  backgroundPath: '/static/2024-zeitgeist/final-image-all-2024.png',
  difficulty: 'medium',
  timeLimit: 30,
  shareText: `Can you find 2024's most viral moments in this hidden object game by @renderwolfai? https://t.co/rXhGbfrODf`,
  objects: [
    {
      id: 'stanley-cup',
      name: 'Stanley Cup',
      maskPath: '/static/2024-zeitgeist/stanley-cup-mask.png'
    },
    {
      id: 'turkish-olympian',
      name: 'Turkish Olympian',
      maskPath: '/static/2024-zeitgeist/turkish-olympian-mask.png'
    },
    {
      id: 'brat',
      name: 'Brat Summer',
      maskPath: '/static/2024-zeitgeist/brat-mask.png'
    },
    {
      id: 'raygun',
      name: 'Ray Gun',
      maskPath: '/static/2024-zeitgeist/raygun-mask.png'
    },
    {
      id: 'moo-deng',
      name: 'Moo Deng',
      maskPath: '/static/2024-zeitgeist/moo-deng-mask.png'
    },
    {
      id: 'pizza',
      name: 'Glue on Pizza',
      maskPath: '/static/2024-zeitgeist/glue-on-pizza-mask.png'
    },
    {
      id: 'taylor',
      name: 'Taylor Swift',
      maskPath: '/static/2024-zeitgeist/taylor-mask.png'
    },
    {
      id: 'spacex',
      name: 'SpaceX Launch',
      maskPath: '/static/2024-zeitgeist/spacex-mask.png'
    }
  ]
};