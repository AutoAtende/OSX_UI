import { describe, it, expect, vi, afterEach } from 'vitest'
import { createContextMenu } from '../context-menu.js'

describe('createContextMenu', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('creates hidden menu element', () => {
    const { menu } = createContextMenu({
      items: [{ id: '1', label: 'Cut' }]
    })
    expect(menu.style.display).toBe('none')
    expect(document.body.contains(menu)).toBe(true)
  })

  it('renders menu items', () => {
    const { menu } = createContextMenu({
      items: [
        { id: '1', label: 'Cut' },
        { id: '2', label: 'Copy' }
      ]
    })
    expect(menu.querySelectorAll('.osx-contextmenu-item').length).toBe(2)
  })

  it('renders separators', () => {
    const { menu } = createContextMenu({
      items: [
        { id: '1', label: 'Cut' },
        { id: 'sep', separator: true },
        { id: '2', label: 'Paste' }
      ]
    })
    expect(menu.querySelector('.osx-contextmenu-separator')).not.toBeNull()
  })

  it('show() positions and displays menu', () => {
    const { menu, show } = createContextMenu({
      items: [{ id: '1', label: 'Item' }]
    })
    show(100, 200)
    expect(menu.style.display).toBe('block')
  })

  it('hide() hides the menu', () => {
    const { menu, show, hide } = createContextMenu({
      items: [{ id: '1', label: 'Item' }]
    })
    show(100, 200)
    hide()
    expect(menu.style.display).toBe('none')
  })

  it('destroy() removes menu from DOM', () => {
    const { menu, destroy } = createContextMenu({
      items: [{ id: '1', label: 'Item' }]
    })
    destroy()
    expect(document.body.contains(menu)).toBe(false)
  })

  it('calls action on item click', () => {
    const action = vi.fn()
    const { menu, show } = createContextMenu({
      items: [{ id: '1', label: 'Action', action }]
    })
    show(0, 0)
    const item = menu.querySelector('.osx-contextmenu-item') as HTMLElement
    item.click()
    expect(action).toHaveBeenCalledOnce()
  })

  it('disabled items cannot be clicked', () => {
    const action = vi.fn()
    const { menu } = createContextMenu({
      items: [{ id: '1', label: 'Disabled', disabled: true, action }]
    })
    const item = menu.querySelector('.osx-contextmenu-item') as HTMLButtonElement
    expect(item.disabled).toBe(true)
  })

  it('renders icon in items', () => {
    const { menu } = createContextMenu({
      items: [{ id: '1', label: 'With icon', icon: '<svg></svg>' }]
    })
    expect(menu.querySelector('.osx-contextmenu-icon')).not.toBeNull()
  })
})
