import { Game } from '@/types/game';

/**
 * 
 * To create your own spot-the-difference game:
 * 1. Set type to 'spot-the-difference'
 * 2. Provide originalImagePath - the unmodified "original" image
 * 3. Provide backgroundPath - the modified image with differences to find
 * 4. Create mask images for each difference (same as hidden object masks)
 */
export const spotDiffExampleGame: Game = {
  id: 'spot-diff-example',
  title: 'Spot the Difference 2026',
  description: 'How different is 2026 going to be from 2025? Find the differences before the timer runs out!',
  type: 'spot-the-difference',
  originalImagePath: '/static/spot-the-diff-2026/Img_2025.png', // The original image
  backgroundPath: '/static/spot-the-diff-2026/Img_2026_final.png', // The modified image (replace with actual different image)
  difficulty: 'easy',
  timeLimit: 30, // half a minute
  showInLobby: true, // Show this game in the lobby
  shareText: 'I found all the differences in this spot-the-difference game by @renderwolfai!',
  objects: [
    // Each "object" represents a difference to find
    // The mask should highlight the area where the difference exists
    {
      id: 'diff-balloons',
      name: 'Balloons',
      maskPath: '/static/spot-the-diff-2026/masks/balloons.png'
    },
    {
      id: 'diff-blue-shirt',
      name: 'Blue Shirt',
      maskPath: '/static/spot-the-diff-2026/masks/blueshirt.png'
    },
    {
      id: 'diff-kratos',
      name: 'Kratos smiling',
      maskPath: '/static/spot-the-diff-2026/masks/kratos.png'
    },
    {
      id: 'diff-dj-shades',
      name: 'Shades on DJ',
      maskPath: '/static/spot-the-diff-2026/masks/shades.png'
    },
    {
      id: 'diff-mario-trophy',
      name: 'Trophy with Mario',
      maskPath: '/static/spot-the-diff-2026/masks/trophy.png'
    },
    {
      id: 'diff-year-2026',
      name: 'Happy New Year 2026!',
      maskPath: '/static/spot-the-diff-2026/masks/year.png'
    }
  ]
};

