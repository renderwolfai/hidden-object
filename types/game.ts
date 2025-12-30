export interface GameObject {
  id: string;
  name: string;
  maskPath: string;
}

export type GameType = 'hidden-object' | 'spot-the-difference';

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
}