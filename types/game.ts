export interface FoundOverlay {
  imagePath: string;
  x: number;
  y: number;
}

export interface GameObject {
  id: string;
  name: string;
  description?: string;
  maskPath: string;
  foundOverlays?: FoundOverlay[]; // For hidden-outline games: positioned overlay images
}

export type GameType = 'hidden-object' | 'spot-the-difference' | 'hidden-outline';

export interface Game {
  id: string;
  title: string;
  description: string;
  type: GameType;
  backgroundPath: string;
  originalImagePath?: string; // Required for spot-the-difference games
  bannerPath?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit: number;
  objects: GameObject[];
  shareText?: string;
  showInLobby?: boolean; // Defaults to true if not specified
  showObjectDescriptions?: boolean; // Show descriptions of objects in the game UI
  showUnfoundObjects?: boolean; // Show names/previews of unfound objects by default
  showFoundObjectsOnComplete?: boolean; // Show found object cards in the congratulations popup
}