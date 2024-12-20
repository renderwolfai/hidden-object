import { Game } from '@/types/game';

export const zeitgeistGame: Game = {
  id: 'zeitgeist-2024',
  title: '2024 Zeitgeist',
  description: 'Find iconic moments and trends that defined the start of 2024',
  backgroundPath: '/static/2024-zeitgeist/final-image-all-2024.png',
  difficulty: 'medium',
  timeLimit: 90, // 5 minutes
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
      name: 'Bratislava Moment',
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