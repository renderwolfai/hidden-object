'use client';

import { useState } from 'react';
import { Game } from '@/types/game';
import { CanvasSize } from '@/types/canvas';
import { LoadedOverlay } from '@/hooks/canvas/use-outline-loader';

interface DebugPanelProps {
  game: Game;
  canvasSize: CanvasSize;
  overlayMap: Map<string, LoadedOverlay[]>;
}

const COLORS = ['#ff0000', '#00ff00', '#0000ff', '#ff00ff', '#ffff00', '#00ffff', '#ff8800', '#8800ff', '#00ff88', '#ff0088'];

export function HiddenOutlineDebugPanel({ game, canvasSize, overlayMap }: DebugPanelProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [visibleObjects, setVisibleObjects] = useState<Set<string>>(new Set(game.objects.map(o => o.id)));
  const [showBounds, setShowBounds] = useState(true);
  const [showPixels, setShowPixels] = useState(false);

  const { scale } = canvasSize;

  const toggleObject = (id: string) => {
    setVisibleObjects(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (visibleObjects.size === game.objects.length) {
      setVisibleObjects(new Set());
    } else {
      setVisibleObjects(new Set(game.objects.map(o => o.id)));
    }
  };

  return (
    <>
      {/* Debug overlay rectangles rendered on top of the game */}
      {game.objects.map((obj, i) => {
        if (!visibleObjects.has(obj.id)) return null;
        const overlays = overlayMap.get(obj.id);
        if (!overlays) return null;
        const color = COLORS[i % COLORS.length];

        return overlays.map((loaded, j) => {
          const { overlay, imageData, width, height } = loaded;

          // Count non-transparent pixels
          let opaquePixels = 0;
          let totalPixels = width * height;
          for (let p = 3; p < imageData.data.length; p += 4) {
            if (imageData.data[p] > 0) opaquePixels++;
          }
          const coverage = ((opaquePixels / totalPixels) * 100).toFixed(1);

          return (
            <div key={`${obj.id}-${j}`}>
              {/* Bounding box */}
              {showBounds && (
                <div
                  style={{
                    position: 'absolute',
                    left: `${overlay.x * scale}px`,
                    top: `${overlay.y * scale}px`,
                    width: `${width * scale}px`,
                    height: `${height * scale}px`,
                    border: `2px solid ${color}`,
                    backgroundColor: `${color}22`,
                    pointerEvents: 'none',
                    zIndex: 10,
                  }}
                >
                  <span style={{
                    position: 'absolute',
                    top: -18,
                    left: 0,
                    fontSize: 10,
                    fontWeight: 'bold',
                    color: 'white',
                    backgroundColor: color,
                    padding: '1px 4px',
                    borderRadius: 2,
                    whiteSpace: 'nowrap',
                  }}>
                    {obj.id} [{width}x{height}] {coverage}% opaque
                  </span>
                </div>
              )}
              {/* Pixel-level hit area visualization */}
              {showPixels && (
                <canvas
                  ref={(canvas) => {
                    if (!canvas) return;
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    if (!ctx) return;
                    ctx.clearRect(0, 0, width, height);
                    for (let y = 0; y < height; y++) {
                      for (let x = 0; x < width; x++) {
                        const alpha = imageData.data[(y * width + x) * 4 + 3];
                        if (alpha > 0) {
                          ctx.fillStyle = color;
                          ctx.fillRect(x, y, 1, 1);
                        }
                      }
                    }
                  }}
                  style={{
                    position: 'absolute',
                    left: `${overlay.x * scale}px`,
                    top: `${overlay.y * scale}px`,
                    width: `${width * scale}px`,
                    height: `${height * scale}px`,
                    pointerEvents: 'none',
                    zIndex: 11,
                    opacity: 0.5,
                  }}
                />
              )}
            </div>
          );
        });
      })}

      {/* Debug control panel */}
      <div style={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 100,
        backgroundColor: 'rgba(0,0,0,0.9)',
        color: 'white',
        borderRadius: 8,
        fontSize: 12,
        fontFamily: 'monospace',
        maxHeight: '50vh',
        overflow: 'auto',
        minWidth: 240,
        border: '1px solid rgba(255,255,255,0.2)',
      }}>
        <div
          onClick={() => setIsOpen(!isOpen)}
          style={{
            padding: '8px 12px',
            cursor: 'pointer',
            fontWeight: 'bold',
            borderBottom: isOpen ? '1px solid rgba(255,255,255,0.2)' : 'none',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>Debug Panel</span>
          <span>{isOpen ? '▼' : '▲'}</span>
        </div>

        {isOpen && (
          <div style={{ padding: '8px 12px' }}>
            <div style={{ marginBottom: 8, display: 'flex', gap: 8 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
                <input type="checkbox" checked={showBounds} onChange={() => setShowBounds(!showBounds)} />
                Bounds
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
                <input type="checkbox" checked={showPixels} onChange={() => setShowPixels(!showPixels)} />
                Hit pixels
              </label>
            </div>

            <div
              onClick={toggleAll}
              style={{
                padding: '4px 8px',
                marginBottom: 6,
                cursor: 'pointer',
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: 4,
                textAlign: 'center',
              }}
            >
              {visibleObjects.size === game.objects.length ? 'Hide All' : 'Show All'}
            </div>

            {game.objects.map((obj, i) => {
              const color = COLORS[i % COLORS.length];
              const overlays = overlayMap.get(obj.id);
              const overlayCount = overlays?.length ?? 0;

              return (
                <div
                  key={obj.id}
                  onClick={() => toggleObject(obj.id)}
                  style={{
                    padding: '4px 8px',
                    marginBottom: 2,
                    cursor: 'pointer',
                    borderRadius: 4,
                    backgroundColor: visibleObjects.has(obj.id) ? 'rgba(255,255,255,0.1)' : 'transparent',
                    opacity: visibleObjects.has(obj.id) ? 1 : 0.4,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <span style={{
                    display: 'inline-block',
                    width: 10,
                    height: 10,
                    borderRadius: 2,
                    backgroundColor: color,
                    flexShrink: 0,
                  }} />
                  <span style={{ flex: 1 }}>{obj.name}</span>
                  <span style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {overlayCount} overlay{overlayCount !== 1 ? 's' : ''}
                    {overlayCount === 0 && ' (missing!)'}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
