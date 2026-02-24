import { describe, it, expect, vi, afterEach } from 'vitest'
import { createPopover } from '../popover.js'

describe('createPopover', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  function makeTrigger() {
    const trigger = document.createElement('button')
    document.body.appendChild(trigger)
    return trigger
  }

  it('creates hidden popover container', () => {
    const trigger = makeTrigger()
    const { container } = createPopover({ trigger, content: 'Hello' })
    expect(container.style.display).toBe('none')
    expect(document.body.contains(container)).toBe(true)
  })

  it('defaults to top position', () => {
    const trigger = makeTrigger()
    const { container } = createPopover({ trigger, content: 'Top' })
    expect(container.classList.contains('osx-popover-top')).toBe(true)
  })

  it('applies position class', () => {
    const trigger = makeTrigger()
    const { container } = createPopover({ trigger, content: 'Bottom', position: 'bottom' })
    expect(container.classList.contains('osx-popover-bottom')).toBe(true)
  })

  it('renders string content', () => {
    const trigger = makeTrigger()
    const { container } = createPopover({ trigger, content: '<p>HTML</p>' })
    expect(container.innerHTML).toBe('<p>HTML</p>')
  })

  it('renders HTMLElement content', () => {
    const trigger = makeTrigger()
    const el = document.createElement('div')
    el.textContent = 'Content'
    const { container } = createPopover({ trigger, content: el })
    expect(container.contains(el)).toBe(true)
  })

  it('toggle() shows and hides', () => {
    const trigger = makeTrigger()
    const { container, toggle } = createPopover({ trigger, content: 'Test' })
    toggle()
    expect(container.style.display).toBe('block')
    toggle()
    expect(container.style.display).toBe('none')
  })

  it('calls onShow and onHide callbacks', () => {
    const onShow = vi.fn()
    const onHide = vi.fn()
    const trigger = makeTrigger()
    const { show, hide } = createPopover({ trigger, content: 'Test', onShow, onHide })
    show()
    expect(onShow).toHaveBeenCalledOnce()
    hide()
    expect(onHide).toHaveBeenCalledOnce()
  })

  it('destroy() removes from DOM', () => {
    const trigger = makeTrigger()
    const { container, destroy } = createPopover({ trigger, content: 'Test' })
    destroy()
    expect(document.body.contains(container)).toBe(false)
  })
})
