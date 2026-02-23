export interface ContextMenuItem {
  id: string;
  label?: string;
  icon?: string;
  separator?: boolean;
  disabled?: boolean;
  action?: () => void;
}

export interface ContextMenuOptions {
  items: ContextMenuItem[];
}

export interface ContextMenuResult {
  menu: HTMLElement;
  show: (x: number, y: number) => void;
  hide: () => void;
  destroy: () => void;
}

export function createContextMenu(opts: ContextMenuOptions): ContextMenuResult {
  const menu = document.createElement('div');
  menu.className = 'osx-contextmenu';
  menu.style.display = 'none';

  for (const item of opts.items) {
    if (item.separator) {
      const sep = document.createElement('div');
      sep.className = 'osx-contextmenu-separator';
      menu.appendChild(sep);
      continue;
    }

    const itemEl = document.createElement('button');
    itemEl.className = 'osx-contextmenu-item';

    if (item.disabled) {
      itemEl.classList.add('disabled');
      itemEl.disabled = true;
    }

    if (item.icon) {
      const icon = document.createElement('span');
      icon.className = 'osx-contextmenu-icon';
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

    menu.appendChild(itemEl);
  }

  document.body.appendChild(menu);

  function show(x: number, y: number) {
    menu.style.display = 'block';
    const rect = menu.getBoundingClientRect();
    if (x + rect.width > window.innerWidth) {
      x = window.innerWidth - rect.width - 10;
    }
    if (y + rect.height > window.innerHeight) {
      y = window.innerHeight - rect.height - 10;
    }
    menu.style.left = `${x}px`;
    menu.style.top = `${y}px`;
  }

  function hide() {
    menu.style.display = 'none';
  }

  function destroy() {
    hide();
    menu.remove();
  }

  document.addEventListener('click', hide);
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  return { menu, show, hide, destroy };
}
