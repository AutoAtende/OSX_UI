import { describe, it, expect, vi, afterEach } from 'vitest'
import { Dock } from '../dock.js'

describe('Dock', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('creates dock element in container', () => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const dock = new Dock(container, vi.fn())
    expect(container.querySelector('.osx-dock')).not.toBeNull()
    dock.destroy()
  })

  it('addItem() creates dock item', () => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const dock = new Dock(container, vi.fn())
    dock.addItem('win1', 'My Window')
    const item = container.querySelector('[data-dock-id="win1"]')
    expect(item).not.toBeNull()
    expect(item!.textContent).toBe('My Window')
    dock.destroy()
  })

  it('addItem() truncates long titles', () => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const dock = new Dock(container, vi.fn())
    dock.addItem('win1', 'This is a very long window title that should be truncated')
    const item = container.querySelector('[data-dock-id="win1"]')
    expect(item!.textContent!.length).toBeLessThanOrEqual(21)
    expect(item!.textContent).toContain('...')
    dock.destroy()
  })

  it('removeItem() removes dock item', () => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const dock = new Dock(container, vi.fn())
    dock.addItem('win1', 'Window')
    dock.removeItem('win1')
    expect(container.querySelector('[data-dock-id="win1"]')).toBeNull()
    dock.destroy()
  })

  it('clicking item calls onRestore', () => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const onRestore = vi.fn()
    const dock = new Dock(container, onRestore)
    dock.addItem('win1', 'Window')
    const item = container.querySelector('[data-dock-id="win1"]') as HTMLElement
    item.click()
    expect(onRestore).toHaveBeenCalledWith('win1')
    dock.destroy()
  })

  it('destroy() removes dock element', () => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const dock = new Dock(container, vi.fn())
    dock.destroy()
    expect(container.querySelector('.osx-dock')).toBeNull()
  })
})
