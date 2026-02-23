export interface DropdownItem {
  id: string;
  label?: string;
  icon?: string;
  separator?: boolean;
  disabled?: boolean;
  action?: () => void;
}

export interface DropdownOptions {
  trigger: HTMLElement;
  items: DropdownItem[];
}

export interface DropdownResult {
  container: HTMLElement;
  show: () => void;
  hide: () => void;
  toggle: () => void;
}

export function createDropdown(opts: DropdownOptions): DropdownResult {
  const container = document.createElement('div');
  container.className = 'osx-dropdown';
  container.style.display = 'none';

  for (const item of opts.items) {
    if (item.separator) {
      const sep = document.createElement('div');
      sep.className = 'osx-dropdown-separator';
      container.appendChild(sep);
      continue;
    }

    const itemEl = document.createElement('button');
    itemEl.className = 'osx-dropdown-item';

    if (item.disabled) {
      itemEl.classList.add('disabled');
      itemEl.disabled = true;
    }

    if (item.icon) {
      const icon = document.createElement('span');
      icon.className = 'osx-dropdown-icon';
      icon.innerHTML = item.icon;
      itemEl.appendChild(icon);
    }

    if (item.label) {
      const label = document.createElement('span');
      label.textContent = item.label;
      itemEl.appendChild(label);
    }

    if (item.action && !item.disabled) {
      itemEl.addEventListener('click', () => {
        item.action!();
        hide();
      });
    }

    container.appendChild(itemEl);
  }

  document.body.appendChild(container);

  function show() {
    const triggerRect = opts.trigger.getBoundingClientRect();
    container.style.display = 'block';
    const menuRect = container.getBoundingClientRect();

    let top = triggerRect.bottom + 4;
    let left = triggerRect.left;

    if (left + menuRect.width > window.innerWidth) {
      left = window.innerWidth - menuRect.width - 10;
    }

    container.style.top = `${top}px`;
    container.style.left = `${left}px`;
  }

  function hide() {
    container.style.display = 'none';
  }

  function toggle() {
    if (container.style.display === 'none') {
      show();
    } else {
      hide();
    }
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

  return { container, show, hide, toggle };
}
