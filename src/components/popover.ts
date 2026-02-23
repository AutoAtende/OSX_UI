export interface PopoverOptions {
  trigger: HTMLElement;
  content: HTMLElement | string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  onShow?: () => void;
  onHide?: () => void;
}

export interface PopoverResult {
  container: HTMLElement;
  show: () => void;
  hide: () => void;
  toggle: () => void;
  destroy: () => void;
}

export function createPopover(opts: PopoverOptions): PopoverResult {
  const position = opts.position || 'top';
  const container = document.createElement('div');
  container.className = `osx-popover osx-popover-${position}`;
  container.style.display = 'none';

  if (typeof opts.content === 'string') {
    container.innerHTML = opts.content;
  } else {
    container.appendChild(opts.content);
  }

  document.body.appendChild(container);

  function show() {
    const triggerRect = opts.trigger.getBoundingClientRect();
    const popoverRect = container.getBoundingClientRect();

    let top: number, left: number;

    switch (position) {
      case 'top':
        top = triggerRect.top - popoverRect.height - 8;
        left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
        break;
      case 'bottom':
        top = triggerRect.bottom + 8;
        left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
        break;
      case 'left':
        top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
        left = triggerRect.left - popoverRect.width - 8;
        break;
      case 'right':
        top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
        left = triggerRect.right + 8;
        break;
    }

    if (left < 0) left = 0;
    if (left + popoverRect.width > window.innerWidth) {
      left = window.innerWidth - popoverRect.width;
    }

    container.style.top = `${top}px`;
    container.style.left = `${left}px`;
    container.style.display = 'block';

    if (opts.onShow) opts.onShow();
  }

  function hide() {
    container.style.display = 'none';
    if (opts.onHide) opts.onHide();
  }

  function toggle() {
    if (container.style.display === 'none') {
      show();
    } else {
      hide();
    }
  }

  function destroy() {
    hide();
    container.remove();
  }

  opts.trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggle();
  });

  document.addEventListener('click', (e) => {
    if (!container.contains(e.target as Node) && e.target !== opts.trigger) {
      hide();
    }
  });

  return { container, show, hide, toggle, destroy };
}
