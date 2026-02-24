import { describe, it, expect, vi } from 'vitest'
import { createSidebar } from '../sidebar.js'

describe('createSidebar', () => {
  const items = [
    { id: 'home', label: 'Home' },
    { id: 'settings', label: 'Settings' },
    { id: 'about', label: 'About' }
  ]

  it('creates sidebar container', () => {
    const { container } = createSidebar({ items })
    expect(container.className).toBe('osx-sidebar')
  })

  it('sets default width to 240px', () => {
    const { container } = createSidebar({ items })
    expect(container.style.width).toBe('240px')
  })

  it('sets custom width', () => {
    const { container } = createSidebar({ items, width: 300 })
    expect(container.style.width).toBe('300px')
  })

  it('renders all items', () => {
    const { container } = createSidebar({ items })
    const buttons = container.querySelectorAll('.osx-sidebar-item')
    expect(buttons.length).toBe(3)
  })

  it('renders labels', () => {
    const { container } = createSidebar({ items })
    const labels = container.querySelectorAll('.osx-sidebar-item-label')
    expect(labels[0].textContent).toBe('Home')
  })

  it('renders icon when provided', () => {
    const itemsWithIcon = [{ id: 'home', label: 'Home', icon: '<svg></svg>' }]
    const { container } = createSidebar({ items: itemsWithIcon })
    expect(container.querySelector('.osx-sidebar-item-icon')).not.toBeNull()
  })

  it('renders badge when provided', () => {
    const itemsWithBadge = [{ id: 'inbox', label: 'Inbox', badge: 5 }]
    const { container } = createSidebar({ items: itemsWithBadge })
    const badge = container.querySelector('.osx-sidebar-item-badge')
    expect(badge!.textContent).toBe('5')
  })

  it('collapse() reduces width', () => {
    const { container, collapse } = createSidebar({ items })
    collapse()
    expect(container.style.width).toBe('60px')
    expect(container.classList.contains('collapsed')).toBe(true)
  })

  it('expand() restores width', () => {
    const { container, collapse, expand } = createSidebar({ items })
    collapse()
    expand()
    expect(container.style.width).toBe('240px')
    expect(container.classList.contains('collapsed')).toBe(false)
  })

  it('toggle() switches state', () => {
    const { container, toggle } = createSidebar({ items })
    toggle()
    expect(container.classList.contains('collapsed')).toBe(true)
    toggle()
    expect(container.classList.contains('collapsed')).toBe(false)
  })

  it('clicking item calls action and onChange', () => {
    const action = vi.fn()
    const onChange = vi.fn()
    const itemsWithAction = [{ id: 'home', label: 'Home', action }]
    const { container } = createSidebar({ items: itemsWithAction, onChange })
    const btn = container.querySelector('.osx-sidebar-item') as HTMLElement
    btn.click()
    expect(action).toHaveBeenCalledOnce()
    expect(onChange).toHaveBeenCalledWith('home')
  })

  it('clicking item adds active class', () => {
    const { container } = createSidebar({ items })
    const btn = container.querySelector('.osx-sidebar-item') as HTMLElement
    btn.click()
    expect(btn.classList.contains('active')).toBe(true)
  })
})
