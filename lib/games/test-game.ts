import { Game } from '@/types/game';

export const testGame: Game = {
  id: 'test-game',
  title: 'Magical Room',
  description: 'Find magical objects hidden in this mysterious room',
  backgroundPath: '/static/test-game/background.jpg',
  difficulty: 'medium',
  timeLimit: 300, // 5 minutes
  objects: [
    {
      id: 'wizard',
      name: 'Wizard Figurine',
      maskPath: '/static/test-game/wizard.png'
    },
    {
      id: 'teddy',
      name: 'Teddy Bear',
      maskPath: '/static/test-game/teddy.png'
    },
    {
      id: 'pot',
      name: 'Magic Pot',
      maskPath: '/static/test-game/pot.png'
    },
    {
      id: 'plant',
      name: 'Mystical Plant',
      maskPath: '/static/test-game/plant.png'
    },
    {
      id: 'bottle',
      name: 'Potion Bottle',
      maskPath: '/static/test-game/bottle.png'
    }
  ]
};