export interface CanvasSize {
  width: number;
  height: number;
  scale: number;
}

export interface ClickDetectorOptions {
  scale: number;
  masks: Map<string, ImageData>;
  foundObjects: Set<string>;
}

export interface ClickPosition {
  x: number;
  y: number;
}

export interface ClickResult {
  id: string;
  position: ClickPosition;
  objectCenter: ClickPosition;
}

export interface OverlayRendererOptions {
  width: number;
  height: number;
  scale?: number;
}

export interface ImageBounds {
  left: number;
  right: number;
  top: number;
  bottom: number;
}