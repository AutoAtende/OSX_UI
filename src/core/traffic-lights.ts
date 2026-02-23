export interface TrafficLightCallbacks {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
}

export function createTrafficLights(callbacks: TrafficLightCallbacks): HTMLElement {
  const container = document.createElement('div');
  container.className = 'osx-traffic-lights';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'osx-tl close';
  closeBtn.title = 'Close';
  closeBtn.addEventListener('click', (e) => { e.stopPropagation(); callbacks.onClose(); });

  const minBtn = document.createElement('button');
  minBtn.className = 'osx-tl minimize';
  minBtn.title = 'Minimize';
  minBtn.addEventListener('click', (e) => { e.stopPropagation(); callbacks.onMinimize(); });

  const maxBtn = document.createElement('button');
  maxBtn.className = 'osx-tl maximize';
  maxBtn.title = 'Maximize';
  maxBtn.addEventListener('click', (e) => { e.stopPropagation(); callbacks.onMaximize(); });

  container.appendChild(closeBtn);
  container.appendChild(minBtn);
  container.appendChild(maxBtn);

  return container;
}
