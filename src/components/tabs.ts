export interface Tab {
  id: string
  label: string
  content: HTMLElement | string
}

export interface TabsOptions {
  tabs: Tab[]
  activeTab?: string
  onChange?: (tabId: string) => void
}

export interface TabsResult {
  container: HTMLElement
  setActiveTab: (tabId: string) => void
  getActiveTab: () => string | null
}

export function createTabs(opts: TabsOptions): TabsResult {
  const container = document.createElement('div')
  container.className = 'osx-tabs'

  const nav = document.createElement('div')
  nav.className = 'osx-tabs-nav'
  nav.setAttribute('role', 'tablist')

  const contentContainer = document.createElement('div')
  contentContainer.className = 'osx-tabs-content'

  const tabElements: Map<string, HTMLElement> = new Map()
  let activeTab = opts.activeTab || opts.tabs[0]?.id

  for (const tab of opts.tabs) {
    const tabBtn = document.createElement('button')
    tabBtn.className = 'osx-tabs-tab'
    tabBtn.textContent = tab.label
    tabBtn.dataset.tabId = tab.id
    tabBtn.setAttribute('role', 'tab')
    tabBtn.setAttribute('aria-selected', String(tab.id === activeTab))
    tabBtn.setAttribute('aria-controls', `tabpanel-${tab.id}`)
    tabBtn.id = `tab-${tab.id}`
    tabBtn.tabIndex = tab.id === activeTab ? 0 : -1

    if (tab.id === activeTab) tabBtn.classList.add('active')

    tabBtn.addEventListener('click', () => {
      setActiveTab(tab.id)
      if (opts.onChange) opts.onChange(tab.id)
    })

    // Arrow key navigation between tabs
    tabBtn.addEventListener('keydown', (e) => {
      const tabs = Array.from(nav.querySelectorAll<HTMLElement>('.osx-tabs-tab'))
      const idx = tabs.indexOf(tabBtn)
      let target: HTMLElement | null = null

      if (e.key === 'ArrowRight') {
        e.preventDefault()
        target = tabs[(idx + 1) % tabs.length]
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        target = tabs[(idx - 1 + tabs.length) % tabs.length]
      } else if (e.key === 'Home') {
        e.preventDefault()
        target = tabs[0]
      } else if (e.key === 'End') {
        e.preventDefault()
        target = tabs[tabs.length - 1]
      }

      if (target) {
        target.focus()
        target.click()
      }
    })

    nav.appendChild(tabBtn)

    const contentEl = document.createElement('div')
    contentEl.className = 'osx-tabs-panel'
    contentEl.dataset.tabId = tab.id
    contentEl.setAttribute('role', 'tabpanel')
    contentEl.setAttribute('aria-labelledby', `tab-${tab.id}`)
    contentEl.id = `tabpanel-${tab.id}`
    contentEl.tabIndex = 0

    if (typeof tab.content === 'string') {
      contentEl.innerHTML = tab.content
    } else {
      contentEl.appendChild(tab.content)
    }

    if (tab.id !== activeTab) {
      contentEl.style.display = 'none'
    }

    contentContainer.appendChild(contentEl)
    tabElements.set(tab.id, contentEl)
  }

  container.appendChild(nav)
  container.appendChild(contentContainer)

  function setActiveTab(tabId: string) {
    activeTab = tabId

    nav.querySelectorAll('.osx-tabs-tab').forEach((btn) => {
      const b = btn as HTMLElement
      const isActive = b.dataset.tabId === tabId
      b.classList.toggle('active', isActive)
      b.setAttribute('aria-selected', String(isActive))
      b.tabIndex = isActive ? 0 : -1
    })

    contentContainer.querySelectorAll('.osx-tabs-panel').forEach((panel) => {
      const p = panel as HTMLElement
      p.style.display = p.dataset.tabId === tabId ? 'block' : 'none'
    })
  }

  return {
    container,
    setActiveTab,
    getActiveTab: () => activeTab
  }
}
