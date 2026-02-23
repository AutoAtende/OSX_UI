export function centerPosition(container: HTMLElement, w: number, h: number): { x: number; y: number } {
  const rect = container.getBoundingClientRect();
  return {
    x: Math.max(20, Math.round((rect.width - w) / 2)),
    y: Math.max(10, Math.round((rect.height - h) / 2)),
  };
}
