export interface SidebarItem {
  id: string
  icon?: string
  label: string
  badge?: number
  action?: () => void
}

export interface SidebarOptions {
  items: SidebarItem[]
  width?: number
  collapsible?: boolean
  onChange?: (itemId: string) => void
}

export interface SidebarResult {
  container: HTMLElement
  collapse: () => void
  expand: () => void
  toggle: () => void
}

export function createSidebar(opts: SidebarOptions): SidebarResult {
  const width = opts.width || 240
  const container = document.createElement('div')
  container.className = 'osx-sidebar'
  container.style.width = `${width}px`
  container.setAttribute('role', 'navigation')
  container.setAttribute('aria-label', 'Sidebar navigation')

  const header = document.createElement('div')
  header.className = 'osx-sidebar-header'

  const toggleBtn = document.createElement('button')
  toggleBtn.className = 'osx-sidebar-toggle'
  toggleBtn.setAttribute('aria-label', 'Toggle sidebar')
  toggleBtn.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>'

  const nav = document.createElement('nav')
  nav.className = 'osx-sidebar-nav'

  for (const item of opts.items) {
    const itemEl = document.createElement('button')
    itemEl.className = 'osx-sidebar-item'
    itemEl.dataset.id = item.id

    if (item.icon) {
      const icon = document.createElement('span')
      icon.className = 'osx-sidebar-item-icon'
      icon.innerHTML = item.icon
      itemEl.appendChild(icon)
    }

    const label = document.createElement('span')
    label.className = 'osx-sidebar-item-label'
    label.textContent = item.label
    itemEl.appendChild(label)

    if (item.badge) {
      const badge = document.createElement('span')
      badge.className = 'osx-sidebar-item-badge'
      badge.textContent = String(item.badge)
      itemEl.appendChild(badge)
    }

    itemEl.addEventListener('click', () => {
      nav.querySelectorAll('.osx-sidebar-item').forEach((el) => {
        el.classList.remove('active')
        el.setAttribute('aria-current', 'false')
      })
      itemEl.classList.add('active')
      itemEl.setAttribute('aria-current', 'page')
      if (item.action) item.action()
      if (opts.onChange) opts.onChange(item.id)
    })

    nav.appendChild(itemEl)
  }

  header.appendChild(toggleBtn)
  container.appendChild(header)
  container.appendChild(nav)

  let isCollapsed = false

  function collapse() {
    isCollapsed = true
    container.classList.add('collapsed')
    container.style.width = '60px'
    toggleBtn.setAttribute('aria-expanded', 'false')
  }

  function expand() {
    isCollapsed = false
    container.classList.remove('collapsed')
    container.style.width = `${width}px`
    toggleBtn.setAttribute('aria-expanded', 'true')
  }

  toggleBtn.addEventListener('click', () => {
    if (isCollapsed) expand()
    else collapse()
  })

  return {
    container,
    collapse,
    expand,
    toggle: () => (isCollapsed ? expand() : collapse())
  }
}
