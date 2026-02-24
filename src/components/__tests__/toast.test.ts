import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createToast } from '../toast.js'

describe('createToast', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('creates toast element', () => {
    const { toast } = createToast({ message: 'Hello' })
    expect(toast.className).toContain('osx-toast')
  })

  it('renders message text', () => {
    const { toast } = createToast({ message: 'Test message' })
    const msg = toast.querySelector('.osx-toast-message')
    expect(msg!.textContent).toBe('Test message')
  })

  it('defaults to info type', () => {
    const { toast } = createToast({ message: 'Info' })
    expect(toast.classList.contains('osx-toast-info')).toBe(true)
  })

  it('applies type class', () => {
    const { toast } = createToast({ message: 'Error', type: 'error' })
    expect(toast.classList.contains('osx-toast-error')).toBe(true)
  })

  it('renders icon', () => {
    const { toast } = createToast({ message: 'Test' })
    expect(toast.querySelector('.osx-toast-icon')).not.toBeNull()
  })

  it('renders close button', () => {
    const { toast } = createToast({ message: 'Test' })
    expect(toast.querySelector('.osx-toast-close')).not.toBeNull()
  })

  it('close() removes toast', () => {
    const { toast, close } = createToast({ message: 'Test', duration: 0 })
    const parent = toast.parentElement
    close()
    vi.advanceTimersByTime(300)
    expect(parent!.contains(toast)).toBe(false)
  })

  it('auto-closes after duration', () => {
    const { toast } = createToast({ message: 'Test', duration: 2000 })
    const parent = toast.parentElement
    vi.advanceTimersByTime(2300)
    expect(parent!.contains(toast)).toBe(false)
  })

  it('does not auto-close when duration is 0', () => {
    const { toast } = createToast({ message: 'Persistent', duration: 0 })
    const parent = toast.parentElement
    vi.advanceTimersByTime(10000)
    expect(parent!.contains(toast)).toBe(true)
  })

  it('success type renders correctly', () => {
    const { toast } = createToast({ message: 'OK', type: 'success' })
    expect(toast.classList.contains('osx-toast-success')).toBe(true)
  })

  it('warning type renders correctly', () => {
    const { toast } = createToast({ message: 'Warn', type: 'warning' })
    expect(toast.classList.contains('osx-toast-warning')).toBe(true)
  })
})
