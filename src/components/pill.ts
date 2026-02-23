export type DotColor = 'ok' | 'danger' | 'purple' | 'muted';

export interface PillOptions {
  text: string;
  dot?: DotColor;
  compact?: boolean;
}

export function createPill(opts: PillOptions): HTMLElement {
  const pill = document.createElement('span');
  pill.className = 'osx-pill';
  if (opts.compact) pill.classList.add('compact');

  if (opts.dot) {
    const dot = document.createElement('span');
    dot.className = `osx-dot ${opts.dot}`;
    pill.appendChild(dot);
  }

  const text = document.createTextNode(opts.text);
  pill.appendChild(text);

  return pill;
}

export function createDot(color: DotColor): HTMLElement {
  const dot = document.createElement('span');
  dot.className = `osx-dot ${color}`;
  return dot;
}
