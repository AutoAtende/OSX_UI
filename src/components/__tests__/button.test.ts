import { describe, it, expect, vi } from 'vitest'
import { createButton } from '../button.js'

describe('createButton', () => {
  it('creates a button element', () => {
    const btn = createButton({})
    expect(btn).toBeInstanceOf(HTMLButtonElement)
    expect(btn.className).toBe('osx-btn')
  })

  it('sets label text', () => {
    const btn = createButton({ label: 'Click me' })
    expect(btn.textContent).toBe('Click me')
  })

  it('sets icon HTML instead of label', () => {
    const btn = createButton({ icon: '<svg></svg>' })
    expect(btn.innerHTML).toBe('<svg></svg>')
  })

  it('adds variant class', () => {
    const btn = createButton({ variant: 'primary' })
    expect(btn.classList.contains('primary')).toBe(true)
  })

  it('does not add class for default variant', () => {
    const btn = createButton({ variant: 'default' })
    expect(btn.classList.contains('default')).toBe(false)
  })

  it('adds status color class for status variant', () => {
    const btn = createButton({ variant: 'status', statusColor: 'ok' })
    expect(btn.classList.contains('status')).toBe(true)
    expect(btn.classList.contains('ok')).toBe(true)
  })

  it('sets title attribute', () => {
    const btn = createButton({ title: 'My tooltip' })
    expect(btn.title).toBe('My tooltip')
  })

  it('sets aria-label attribute', () => {
    const btn = createButton({ ariaLabel: 'Close dialog' })
    expect(btn.getAttribute('aria-label')).toBe('Close dialog')
  })

  it('attaches click handler', () => {
    const onClick = vi.fn()
    const btn = createButton({ onClick })
    btn.click()
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('does not error without click handler', () => {
    const btn = createButton({ label: 'No handler' })
    expect(() => btn.click()).not.toThrow()
  })
})
