import type { MenuBarConfig, MenuConfig } from '../types.js'

export class MenuBar {
  private el: HTMLElement | null = null
  private dropdownEl: HTMLElement | null = null
  private openMenuId: string | null = null
  private config: MenuBarConfig
  private clockInterval: ReturnType<typeof setInterval> | null = null

  constructor(config: MenuBarConfig) {
    this.config = config
  }

  init(container: HTMLElement = document.body): void {
    const bar = document.createElement('div')
    bar.className = 'osx-menu-bar'

    // Icon button
    const iconBtn = document.createElement('button')
    iconBtn.className = 'osx-menu-bar-icon'
    iconBtn.innerHTML = this.config.icon || ''
    bar.appendChild(iconBtn)

    // App name
    const appName = document.createElement('span')
    appName.className = 'osx-menu-bar-app'
    appName.textContent = this.config.appName || ''
    bar.appendChild(appName)

    // Menu items
    for (const menu of this.config.menus) {
      const btn = document.createElement('button')
      btn.className = 'osx-menu-bar-item'
      btn.dataset.menu = menu.id
      btn.textContent = menu.label
      bar.appendChild(btn)
    }

    // Right side
    const right = document.createElement('div')
    right.className = 'osx-menu-bar-right'

    const authBtn = document.createElement('button')
    authBtn.className = 'osx-menu-bar-auth'
    right.appendChild(authBtn)

    if (this.config.showClock) {
      const clock = document.createElement('span')
      clock.className = 'osx-menu-bar-clock'
      right.appendChild(clock)
    }

    bar.appendChild(right)

    // Dropdown container
    const dropdown = document.createElement('div')
    dropdown.className = 'osx-menu-bar-dropdown'
    dropdown.style.display = 'none'

    // Insert into DOM
    container.insertBefore(bar, container.firstChild)
    container.appendChild(dropdown)

    this.el = bar
    this.dropdownEl = dropdown

    // Click on menu items
    bar.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement
      const item = target.closest('.osx-menu-bar-item') as HTMLElement | null
      if (item) {
        const menuId = item.dataset.menu!
        if (this.openMenuId === menuId) {
          this.closeDropdown()
        } else {
          this.openDropdown(menuId)
        }
        return
      }

      const authClick = target.closest('.osx-menu-bar-auth')
      if (authClick && this.config.onAuthClick) {
        this.config.onAuthClick()
      }
    })

    // Hover switch
    bar.addEventListener('mouseover', (e: Event) => {
      if (!this.openMenuId) return
      const target = e.target as HTMLElement
      const item = target.closest('.osx-menu-bar-item') as HTMLElement | null
      if (item && item.dataset.menu !== this.openMenuId) {
        this.openDropdown(item.dataset.menu!)
      }
    })

    // Click outside closes dropdown
    document.addEventListener('pointerdown', (e: Event) => {
      if (!this.openMenuId) return
      const target = e.target as HTMLElement
      if (target.closest('.osx-menu-bar') || target.closest('.osx-menu-bar-dropdown')) return
      this.closeDropdown()
    })

    // Start clock
    if (this.config.showClock) {
      this.updateClock()
      this.clockInterval = setInterval(() => this.updateClock(), 15000)
    }
  }

  private updateClock(): void {
    if (!this.el) return
    const clockEl = this.el.querySelector('.osx-menu-bar-clock')
    if (!clockEl) return
    const now = new Date()
    const hh = String(now.getHours()).padStart(2, '0')
    const mm = String(now.getMinutes()).padStart(2, '0')
    clockEl.textContent = hh + ':' + mm
  }

  updateAuthDisplay(text: string): void {
    if (!this.el) return
    const authBtn = this.el.querySelector('.osx-menu-bar-auth')
    if (authBtn) {
      authBtn.textContent = text
    }
  }

  openDropdown(menuId: string): void {
    if (!this.el || !this.dropdownEl) return

    const menuCfg = this.config.menus.find((m) => m.id === menuId)
    if (!menuCfg) return

    // Dynamic menus call onOpen before rendering
    if (menuCfg.dynamic && menuCfg.onOpen) {
      menuCfg.onOpen()
    }

    const btn = this.el.querySelector(
      `.osx-menu-bar-item[data-menu="${menuId}"]`
    ) as HTMLElement | null
    if (!btn) return
    const rect = btn.getBoundingClientRect()

    // Build dropdown content
    this.dropdownEl.innerHTML = ''
    for (const item of menuCfg.items) {
      if (item.type === 'separator') {
        const sep = document.createElement('div')
        sep.className = 'osx-dropdown-separator'
        this.dropdownEl.appendChild(sep)
        continue
      }

      const el = document.createElement('button')
      el.className = 'osx-dropdown-item'
      if (item.checked) el.classList.add('checked')
      if (item.disabled) {
        el.style.opacity = '0.4'
        el.style.cursor = 'default'
      }

      const labelSpan = document.createElement('span')
      labelSpan.textContent = item.label || ''
      el.appendChild(labelSpan)

      if (item.shortcut) {
        const sc = document.createElement('span')
        sc.className = 'osx-dropdown-shortcut'
        sc.textContent = item.shortcut
        el.appendChild(sc)
      }

      if (item.action && !item.disabled) {
        el.addEventListener('click', () => {
          this.closeDropdown()
          item.action!()
        })
      }

      this.dropdownEl.appendChild(el)
    }

    this.dropdownEl.style.display = ''
    this.dropdownEl.style.left = rect.left + 'px'

    // Mark active
    this.el.querySelectorAll('.osx-menu-bar-item').forEach((i) => i.classList.remove('active'))
    btn.classList.add('active')

    this.openMenuId = menuId
  }

  closeDropdown(): void {
    if (!this.el || !this.dropdownEl) return
    this.dropdownEl.style.display = 'none'
    this.dropdownEl.innerHTML = ''
    this.el.querySelectorAll('.osx-menu-bar-item').forEach((i) => i.classList.remove('active'))
    this.openMenuId = null
  }

  getMenuConfig(menuId: string): MenuConfig | undefined {
    return this.config.menus.find((m) => m.id === menuId)
  }

  destroy(): void {
    if (this.clockInterval) clearInterval(this.clockInterval)
    if (this.el) this.el.remove()
    if (this.dropdownEl) this.dropdownEl.remove()
  }
}
