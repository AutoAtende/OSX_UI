export interface AccordionItem {
  id: string
  title: string
  content: HTMLElement | string
}

export interface AccordionOptions {
  items: AccordionItem[]
  allowMultiple?: boolean
}

export interface AccordionResult {
  container: HTMLElement
  open: (id: string) => void
  close: (id: string) => void
  toggle: (id: string) => void
}

export function createAccordion(opts: AccordionOptions): AccordionResult {
  const container = document.createElement('div')
  container.className = 'osx-accordion'

  const itemMap = new Map<string, { header: HTMLElement; content: HTMLElement; isOpen: boolean }>()

  for (const item of opts.items) {
    const itemEl = document.createElement('div')
    itemEl.className = 'osx-accordion-item'

    const header = document.createElement('button')
    header.className = 'osx-accordion-header'
    header.textContent = item.title
    header.setAttribute('aria-expanded', 'false')
    header.setAttribute('aria-controls', `accordion-panel-${item.id}`)
    header.id = `accordion-header-${item.id}`

    const icon = document.createElement('span')
    icon.className = 'osx-accordion-icon'
    icon.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>'

    header.appendChild(icon)

    const content = document.createElement('div')
    content.className = 'osx-accordion-content'
    content.setAttribute('role', 'region')
    content.setAttribute('aria-labelledby', `accordion-header-${item.id}`)
    content.id = `accordion-panel-${item.id}`

    if (typeof item.content === 'string') {
      content.innerHTML = item.content
    } else {
      content.appendChild(item.content)
    }

    header.addEventListener('click', () => {
      if (opts.allowMultiple) {
        const isOpen = itemMap.get(item.id)?.isOpen
        if (isOpen) {
          content.style.maxHeight = '0'
          icon.classList.remove('open')
          header.setAttribute('aria-expanded', 'false')
          itemMap.get(item.id)!.isOpen = false
        } else {
          content.style.maxHeight = content.scrollHeight + 'px'
          icon.classList.add('open')
          header.setAttribute('aria-expanded', 'true')
          itemMap.get(item.id)!.isOpen = true
        }
      } else {
        for (const [, v] of itemMap) {
          v.content.style.maxHeight = '0'
          v.header.querySelector('.osx-accordion-icon')?.classList.remove('open')
          v.header.setAttribute('aria-expanded', 'false')
          v.isOpen = false
        }
        content.style.maxHeight = content.scrollHeight + 'px'
        icon.classList.add('open')
        header.setAttribute('aria-expanded', 'true')
        itemMap.get(item.id)!.isOpen = true
      }
    })

    // Keyboard navigation between accordion headers
    header.addEventListener('keydown', (e) => {
      const headers = Array.from(container.querySelectorAll<HTMLElement>('.osx-accordion-header'))
      const idx = headers.indexOf(header)
      let target: HTMLElement | null = null

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        target = headers[(idx + 1) % headers.length]
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        target = headers[(idx - 1 + headers.length) % headers.length]
      } else if (e.key === 'Home') {
        e.preventDefault()
        target = headers[0]
      } else if (e.key === 'End') {
        e.preventDefault()
        target = headers[headers.length - 1]
      }

      if (target) target.focus()
    })

    itemEl.appendChild(header)
    itemEl.appendChild(content)
    container.appendChild(itemEl)

    itemMap.set(item.id, { header, content, isOpen: false })
  }

  return {
    container,
    open(id: string) {
      const item = itemMap.get(id)
      if (item) {
        item.content.style.maxHeight = item.content.scrollHeight + 'px'
        item.header.querySelector('.osx-accordion-icon')?.classList.add('open')
        item.header.setAttribute('aria-expanded', 'true')
        item.isOpen = true
      }
    },
    close(id: string) {
      const item = itemMap.get(id)
      if (item) {
        item.content.style.maxHeight = '0'
        item.header.querySelector('.osx-accordion-icon')?.classList.remove('open')
        item.header.setAttribute('aria-expanded', 'false')
        item.isOpen = false
      }
    },
    toggle(id: string) {
      const item = itemMap.get(id)
      if (item) {
        if (item.isOpen) {
          this.close(id)
        } else {
          this.open(id)
        }
      }
    }
  }
}
