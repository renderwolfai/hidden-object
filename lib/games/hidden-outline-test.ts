import { Game } from '@/types/game';

export const hiddenOutlineTestGame: Game = {
  id: 'hidden-outline-test',
  title: 'Hiding Pups',
  description: 'Find all the doggos in this scene before the timer runs out!',
  type: 'hidden-outline',
  backgroundPath: '/static/hidden-outline-test/scene.png',
  difficulty: 'medium',
  timeLimit: 180,
  showInLobby: true,
  objects: [
    {
      id: 'object-1',
      name: 'Sitting Pup',
      maskPath: '',
      foundOverlays: [
        { imagePath: '/static/hidden-outline-test/object-1.png', x: 142, y: 792 },
      ],
    },
    {
      id: 'object-2',
      name: 'Sleeping Pup',
      maskPath: '',
      foundOverlays: [
        { imagePath: '/static/hidden-outline-test/object-2.png', x: 525, y: 915 },
      ],
    },
    {
      id: 'object-3',
      name: 'Running Pup',
      maskPath: '',
      foundOverlays: [
        { imagePath: '/static/hidden-outline-test/object-3.png', x: 470, y: 510 },
      ],
    },
  ],
};
