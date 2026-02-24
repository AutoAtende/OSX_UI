import { describe, it, expect, vi, afterEach } from 'vitest'
import { createModal } from '../modal.js'

describe('createModal', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('appends backdrop to body', () => {
    const { backdrop } = createModal({ content: 'Hello' })
    expect(document.body.contains(backdrop)).toBe(true)
    expect(backdrop.className).toBe('osx-modal-backdrop')
  })

  it('renders string content', () => {
    const { modal } = createModal({ content: '<p>Content</p>' })
    expect(modal.innerHTML).toContain('<p>Content</p>')
  })

  it('renders HTMLElement content', () => {
    const el = document.createElement('div')
    el.textContent = 'Test'
    const { modal } = createModal({ content: el })
    expect(modal.contains(el)).toBe(true)
  })

  it('close() removes backdrop from DOM', () => {
    const { backdrop, close } = createModal({ content: 'Test' })
    expect(document.body.contains(backdrop)).toBe(true)
    close()
    expect(document.body.contains(backdrop)).toBe(false)
  })

  it('calls onClose callback when closed', () => {
    const onClose = vi.fn()
    const { close } = createModal({ content: 'Test', onClose })
    close()
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('closes on backdrop click by default', () => {
    const { backdrop } = createModal({ content: 'Test' })
    backdrop.click()
    expect(document.body.contains(backdrop)).toBe(false)
  })

  it('does not close on modal click (only backdrop)', () => {
    const { backdrop, modal } = createModal({ content: 'Test' })
    modal.click()
    expect(document.body.contains(backdrop)).toBe(true)
  })

  it('does not close on backdrop click when closeOnBackdrop is false', () => {
    const { backdrop } = createModal({ content: 'Test', closeOnBackdrop: false })
    backdrop.click()
    expect(document.body.contains(backdrop)).toBe(true)
  })

  it('has role=dialog and aria-modal', () => {
    const { modal } = createModal({ content: 'Test' })
    expect(modal.getAttribute('role')).toBe('dialog')
    expect(modal.getAttribute('aria-modal')).toBe('true')
  })

  it('closes on Escape key', () => {
    const { backdrop } = createModal({ content: 'Test' })
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(document.body.contains(backdrop)).toBe(false)
  })

  it('destroy() is an alias for close()', () => {
    const { backdrop, destroy } = createModal({ content: 'Test' })
    destroy()
    expect(document.body.contains(backdrop)).toBe(false)
  })
})
