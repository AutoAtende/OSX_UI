export interface Tab {
  id: string;
  label: string;
  content: HTMLElement | string;
}

export interface TabsOptions {
  tabs: Tab[];
  activeTab?: string;
  onChange?: (tabId: string) => void;
}

export interface TabsResult {
  container: HTMLElement;
  setActiveTab: (tabId: string) => void;
  getActiveTab: () => string | null;
}

export function createTabs(opts: TabsOptions): TabsResult {
  const container = document.createElement('div');
  container.className = 'osx-tabs';

  const nav = document.createElement('div');
  nav.className = 'osx-tabs-nav';

  const contentContainer = document.createElement('div');
  contentContainer.className = 'osx-tabs-content';

  const tabElements: Map<string, HTMLElement> = new Map();
  let activeTab = opts.activeTab || opts.tabs[0]?.id;

  for (const tab of opts.tabs) {
    const tabBtn = document.createElement('button');
    tabBtn.className = 'osx-tabs-tab';
    tabBtn.textContent = tab.label;
    tabBtn.dataset.tabId = tab.id;

    if (tab.id === activeTab) tabBtn.classList.add('active');

    tabBtn.addEventListener('click', () => {
      setActiveTab(tab.id);
      if (opts.onChange) opts.onChange(tab.id);
    });

    nav.appendChild(tabBtn);

    const contentEl = document.createElement('div');
    contentEl.className = 'osx-tabs-panel';
    contentEl.dataset.tabId = tab.id;

    if (typeof tab.content === 'string') {
      contentEl.innerHTML = tab.content;
    } else {
      contentEl.appendChild(tab.content);
    }

    if (tab.id !== activeTab) {
      contentEl.style.display = 'none';
    }

    contentContainer.appendChild(contentEl);
    tabElements.set(tab.id, contentEl);
  }

  container.appendChild(nav);
  container.appendChild(contentContainer);

  function setActiveTab(tabId: string) {
    activeTab = tabId;

    nav.querySelectorAll('.osx-tabs-tab').forEach((btn) => {
      const b = btn as HTMLElement;
      b.classList.toggle('active', b.dataset.tabId === tabId);
    });

    contentContainer.querySelectorAll('.osx-tabs-panel').forEach((panel) => {
      const p = panel as HTMLElement;
      p.style.display = p.dataset.tabId === tabId ? 'block' : 'none';
    });
  }

  return {
    container,
    setActiveTab,
    getActiveTab: () => activeTab,
  };
}
