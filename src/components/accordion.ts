export interface AccordionItem {
  id: string;
  title: string;
  content: HTMLElement | string;
}

export interface AccordionOptions {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export interface AccordionResult {
  container: HTMLElement;
  open: (id: string) => void;
  close: (id: string) => void;
  toggle: (id: string) => void;
}

export function createAccordion(opts: AccordionOptions): AccordionResult {
  const container = document.createElement('div');
  container.className = 'osx-accordion';

  const itemMap = new Map<string, { header: HTMLElement; content: HTMLElement; isOpen: boolean }>();

  for (const item of opts.items) {
    const itemEl = document.createElement('div');
    itemEl.className = 'osx-accordion-item';

    const header = document.createElement('button');
    header.className = 'osx-accordion-header';
    header.textContent = item.title;

    const icon = document.createElement('span');
    icon.className = 'osx-accordion-icon';
    icon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>';

    header.appendChild(icon);

    const content = document.createElement('div');
    content.className = 'osx-accordion-content';

    if (typeof item.content === 'string') {
      content.innerHTML = item.content;
    } else {
      content.appendChild(item.content);
    }

    header.addEventListener('click', () => {
      if (opts.allowMultiple) {
        const isOpen = itemMap.get(item.id)?.isOpen;
        if (isOpen) {
          content.style.maxHeight = '0';
          icon.classList.remove('open');
          itemMap.get(item.id)!.isOpen = false;
        } else {
          content.style.maxHeight = content.scrollHeight + 'px';
          icon.classList.add('open');
          itemMap.get(item.id)!.isOpen = true;
        }
      } else {
        for (const [, v] of itemMap) {
          v.content.style.maxHeight = '0';
          v.header.querySelector('.osx-accordion-icon')?.classList.remove('open');
          v.isOpen = false;
        }
        content.style.maxHeight = content.scrollHeight + 'px';
        icon.classList.add('open');
        itemMap.get(item.id)!.isOpen = true;
      }
    });

    itemEl.appendChild(header);
    itemEl.appendChild(content);
    container.appendChild(itemEl);

    itemMap.set(item.id, { header, content, isOpen: false });
  }

  return {
    container,
    open(id: string) {
      const item = itemMap.get(id);
      if (item) {
        item.content.style.maxHeight = item.content.scrollHeight + 'px';
        item.header.querySelector('.osx-accordion-icon')?.classList.add('open');
        item.isOpen = true;
      }
    },
    close(id: string) {
      const item = itemMap.get(id);
      if (item) {
        item.content.style.maxHeight = '0';
        item.header.querySelector('.osx-accordion-icon')?.classList.remove('open');
        item.isOpen = false;
      }
    },
    toggle(id: string) {
      const item = itemMap.get(id);
      if (item) {
        if (item.isOpen) {
          this.close(id);
        } else {
          this.open(id);
        }
      }
    },
  };
}
