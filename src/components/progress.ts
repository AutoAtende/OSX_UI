export interface ProgressOptions {
  value?: number;
  max?: number;
  showValue?: boolean;
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

export interface ProgressResult {
  container: HTMLElement;
  setValue: (value: number) => void;
  getValue: () => number;
}

export function createProgress(opts: ProgressOptions = {}): ProgressResult {
  const container = document.createElement('div');
  container.className = 'osx-progress';

  const max = opts.max || 100;
  let value = opts.value || 0;

  if (opts.variant && opts.variant !== 'default') {
    container.classList.add(opts.variant);
  }

  const track = document.createElement('div');
  track.className = 'osx-progress-track';

  const bar = document.createElement('div');
  bar.className = 'osx-progress-bar';
  bar.style.width = `${(value / max) * 100}%`;

  track.appendChild(bar);
  container.appendChild(track);

  if (opts.showValue) {
    const label = document.createElement('div');
    label.className = 'osx-progress-label';
    label.textContent = `${value}%`;
    container.appendChild(label);
  }

  return {
    container,
    setValue(newValue: number) {
      value = Math.min(Math.max(newValue, 0), max);
      bar.style.width = `${(value / max) * 100}%`;
      if (opts.showValue) {
        const label = container.querySelector('.osx-progress-label') as HTMLElement;
        if (label) label.textContent = `${value}%`;
      }
    },
    getValue() {
      return value;
    },
  };
}

export interface SpinnerOptions {
  size?: 'small' | 'medium' | 'large';
}

export interface SpinnerResult {
  container: HTMLElement;
}

export function createSpinner(opts: SpinnerOptions = {}): SpinnerResult {
  const container = document.createElement('div');
  container.className = 'osx-spinner';

  if (opts.size && opts.size !== 'medium') {
    container.classList.add(opts.size);
  }

  return { container };
}
