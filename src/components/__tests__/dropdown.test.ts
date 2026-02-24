import { describe, it, expect, vi, afterEach } from 'vitest'
import { createDropdown } from '../dropdown.js'

describe('createDropdown', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  function makeTrigger() {
    const trigger = document.createElement('button')
    trigger.textContent = 'Open'
    document.body.appendChild(trigger)
    return trigger
  }

  it('creates hidden dropdown container', () => {
    const trigger = makeTrigger()
    const { container } = createDropdown({
      trigger,
      items: [{ id: '1', label: 'Item 1' }]
    })
    expect(container.style.display).toBe('none')
    expect(document.body.contains(container)).toBe(true)
  })

  it('renders dropdown items', () => {
    const trigger = makeTrigger()
    const { container } = createDropdown({
      trigger,
      items: [
        { id: '1', label: 'Item 1' },
        { id: '2', label: 'Item 2' }
      ]
    })
    const items = container.querySelectorAll('.osx-dropdown-item')
    expect(items.length).toBe(2)
  })

  it('renders separators', () => {
    const trigger = makeTrigger()
    const { container } = createDropdown({
      trigger,
      items: [
        { id: '1', label: 'Item 1' },
        { id: 'sep', separator: true },
        { id: '2', label: 'Item 2' }
      ]
    })
    expect(container.querySelector('.osx-dropdown-separator')).not.toBeNull()
  })

  it('disables items with disabled flag', () => {
    const trigger = makeTrigger()
    const { container } = createDropdown({
      trigger,
      items: [{ id: '1', label: 'Disabled', disabled: true }]
    })
    const item = container.querySelector('.osx-dropdown-item') as HTMLButtonElement
    expect(item.disabled).toBe(true)
    expect(item.classList.contains('disabled')).toBe(true)
  })

  it('toggle() shows and hides', () => {
    const trigger = makeTrigger()
    const { container, toggle } = createDropdown({
      trigger,
      items: [{ id: '1', label: 'Item' }]
    })
    toggle()
    expect(container.style.display).toBe('block')
    toggle()
    expect(container.style.display).toBe('none')
  })

  it('calls action and hides on item click', () => {
    const action = vi.fn()
    const trigger = makeTrigger()
    const { container, show } = createDropdown({
      trigger,
      items: [{ id: '1', label: 'Action', action }]
    })
    show()
    const item = container.querySelector('.osx-dropdown-item') as HTMLElement
    item.click()
    expect(action).toHaveBeenCalledOnce()
    expect(container.style.display).toBe('none')
  })

  it('renders icon in item', () => {
    const trigger = makeTrigger()
    const { container } = createDropdown({
      trigger,
      items: [{ id: '1', label: 'With icon', icon: '<svg></svg>' }]
    })
    expect(container.querySelector('.osx-dropdown-icon')).not.toBeNull()
  })
})
