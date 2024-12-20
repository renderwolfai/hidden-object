export interface GameObject {
  id: string;
  name: string;
  maskPath: string;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  backgroundPath: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit: number;
  objects: GameObject[];
  shareText?: string;
}