export const DEBUG = false;

export function debugLog(context: string, data: any) {
  if (DEBUG) {
    console.log(`[${context}]`, data);
  }
}

export function debugPoint(x: number, y: number, color = 'red', size = 4) {
  if (!DEBUG) return;
  
  const dot = document.createElement('div');
  dot.style.position = 'fixed';
  dot.style.left = `${x - size/2}px`;
  dot.style.top = `${y - size/2}px`;
  dot.style.width = `${size}px`;
  dot.style.height = `${size}px`;
  dot.style.backgroundColor = color;
  dot.style.borderRadius = '50%';
  dot.style.zIndex = '9999';
  dot.style.pointerEvents = 'none';
  
  document.body.appendChild(dot);
  setTimeout(() => dot.remove(), 2000);
}