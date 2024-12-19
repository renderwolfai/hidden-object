export interface Position {
  x: number;
  y: number;
}

export interface Animation {
  id: string;
  imagePath: string;
  startPosition: Position;
  endPosition: Position;
  startTime: number;
  duration: number;
}