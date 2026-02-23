export type ButtonVariant = 'default' | 'primary' | 'danger' | 'ghost' | 'icon' | 'status';
export type StatusColor = 'ok' | 'danger' | 'purple' | 'muted';

export interface ButtonOptions {
  label?: string;
  variant?: ButtonVariant;
  statusColor?: StatusColor;
  icon?: string;
  title?: string;
  ariaLabel?: string;
  onClick?: () => void;
}

export function createButton(opts: ButtonOptions): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.className = 'osx-btn';

  if (opts.variant && opts.variant !== 'default') {
    btn.classList.add(opts.variant);
  }

  if (opts.variant === 'status' && opts.statusColor) {
    btn.classList.add(opts.statusColor);
  }

  if (opts.title) btn.title = opts.title;
  if (opts.ariaLabel) btn.setAttribute('aria-label', opts.ariaLabel);

  if (opts.icon) {
    btn.innerHTML = opts.icon;
  } else if (opts.label) {
    btn.textContent = opts.label;
  }

  if (opts.onClick) {
    btn.addEventListener('click', opts.onClick);
  }

  return btn;
}
