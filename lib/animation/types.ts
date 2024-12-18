import { AnimationPosition } from '@/types/animation';

export interface AnimationConfig {
  duration: number;
  arcHeight: number;
  minScale: number;
  fadeStart: number;
}

export interface AnimationContext {
  startPosition: AnimationPosition;
  endPosition: AnimationPosition;
  progress: number;
  config: AnimationConfig;
}