import { createCleanupTracker } from '../utils/events.js'

export interface DropdownItem {
  id: string
  label?: string
  icon?: string
  separator?: boolean
  disabled?: boolean
  action?: () => void
}

export interface DropdownOptions {
  trigger: HTMLElement
  items: DropdownItem[]
}

export interface DropdownResult {
  container: HTMLElement
  show: () => void
  hide: () => void
  toggle: () => void
  destroy: () => void
}

export function createDropdown(opts: DropdownOptions): DropdownResult {
  const tracker = createCleanupTracker()
  const container = document.createElement('div')
  container.className = 'osx-dropdown'
  container.setAttribute('role', 'menu')
  container.style.display = 'none'

  opts.trigger.setAttribute('aria-haspopup', 'true')
  opts.trigger.setAttribute('aria-expanded', 'false')

  for (const item of opts.items) {
    if (item.separator) {
      const sep = document.createElement('div')
      sep.className = 'osx-dropdown-separator'
      sep.setAttribute('role', 'separator')
      container.appendChild(sep)
      continue
    }

    const itemEl = document.createElement('button')
    itemEl.className = 'osx-dropdown-item'
    itemEl.setAttribute('role', 'menuitem')

    if (item.disabled) {
      itemEl.classList.add('disabled')
      itemEl.disabled = true
    }

    if (item.icon) {
      const icon = document.createElement('span')
      icon.className = 'osx-dropdown-icon'
      icon.innerHTML = item.icon
      itemEl.appendChild(icon)
    }

    if (item.label) {
      const label = document.createElement('span')
      label.textContent = item.label
      itemEl.appendChild(label)
    }

    if (item.action && !item.disabled) {
      itemEl.addEventListener('click', () => {
        item.action!()
        hide()
      })
    }

    // Keyboard navigation within menu
    itemEl.addEventListener('keydown', (e) => {
      const items = Array.from(
        container.querySelectorAll<HTMLElement>('.osx-dropdown-item:not(.disabled)')
      )
      const idx = items.indexOf(itemEl)

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        items[(idx + 1) % items.length]?.focus()
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        items[(idx - 1 + items.length) % items.length]?.focus()
      } else if (e.key === 'Escape') {
        hide()
        opts.trigger.focus()
      }
    })

    container.appendChild(itemEl)
  }

  document.body.appendChild(container)

  function show() {
    const triggerRect = opts.trigger.getBoundingClientRect()
    container.style.display = 'block'
    const menuRect = container.getBoundingClientRect()

    const top = triggerRect.bottom + 4
    let left = triggerRect.left

    if (left + menuRect.width > window.innerWidth) {
      left = window.innerWidth - menuRect.width - 10
    }

    container.style.top = `${top}px`
    container.style.left = `${left}px`
    opts.trigger.setAttribute('aria-expanded', 'true')

    const firstItem = container.querySelector<HTMLElement>('.osx-dropdown-item:not(.disabled)')
    if (firstItem) firstItem.focus()
  }

  function hide() {
    container.style.display = 'none'
    opts.trigger.setAttribute('aria-expanded', 'false')
  }

  function toggle() {
    if (container.style.display === 'none') {
      show()
    } else {
      hide()
    }
  }

  function destroy() {
    tracker.clear()
    container.remove()
  }

  tracker.on(opts.trigger, 'click', (e) => {
    ;(e as MouseEvent).stopPropagation()
    toggle()
  })

  tracker.on(document, 'click', (e) => {
    if (!container.contains(e.target as Node) && e.target !== opts.trigger) {
      hide()
    }
  })

  return { container, show, hide, toggle, destroy }
}
