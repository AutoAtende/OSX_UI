import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createTooltip } from '../tooltip.js'

describe('createTooltip', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    document.body.innerHTML = ''
  })

  it('creates tooltip element', () => {
    const target = document.createElement('button')
    const { tooltip } = createTooltip(target, { content: 'Help text' })
    expect(tooltip.textContent).toBe('Help text')
    expect(tooltip.style.display).toBe('none')
  })

  it('defaults to top position', () => {
    const target = document.createElement('button')
    const { tooltip } = createTooltip(target, { content: 'Tip' })
    expect(tooltip.classList.contains('osx-tooltip-top')).toBe(true)
  })

  it('applies position class', () => {
    const target = document.createElement('button')
    const { tooltip } = createTooltip(target, { content: 'Tip', position: 'bottom' })
    expect(tooltip.classList.contains('osx-tooltip-bottom')).toBe(true)
  })

  it('appends to body', () => {
    const target = document.createElement('button')
    const { tooltip } = createTooltip(target, { content: 'Tip' })
    expect(document.body.contains(tooltip)).toBe(true)
  })

  it('hide() hides tooltip', () => {
    const target = document.createElement('button')
    const { tooltip, show, hide } = createTooltip(target, { content: 'Tip', delay: 0 })
    show()
    vi.advanceTimersByTime(10)
    hide()
    expect(tooltip.style.display).toBe('none')
  })

  it('destroy() removes tooltip from DOM', () => {
    const target = document.createElement('button')
    const { tooltip, destroy } = createTooltip(target, { content: 'Tip' })
    destroy()
    expect(document.body.contains(tooltip)).toBe(false)
  })

  it('returns target as container', () => {
    const target = document.createElement('button')
    const { container } = createTooltip(target, { content: 'Tip' })
    expect(container).toBe(target)
  })
})
