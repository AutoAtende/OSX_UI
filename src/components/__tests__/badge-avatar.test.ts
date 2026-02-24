import { describe, it, expect } from 'vitest'
import { createBadge, createAvatar } from '../badge-avatar.js'

describe('createBadge', () => {
  it('creates badge element', () => {
    const { container } = createBadge({ value: 5 })
    expect(container.className).toBe('osx-badge')
    expect(container.textContent).toBe('5')
  })

  it('shows display none when value is 0', () => {
    const { container } = createBadge({ value: 0 })
    expect(container.style.display).toBe('none')
  })

  it('caps display at max value', () => {
    const { container } = createBadge({ value: 150, max: 99 })
    expect(container.textContent).toBe('99+')
  })

  it('applies variant class', () => {
    const { container } = createBadge({ value: 3, variant: 'danger' })
    expect(container.classList.contains('danger')).toBe(true)
  })

  it('setValue() updates displayed value', () => {
    const { setValue, container } = createBadge({ value: 1 })
    setValue(10)
    expect(container.textContent).toBe('10')
  })

  it('getValue() returns current value', () => {
    const { getValue } = createBadge({ value: 7 })
    expect(getValue()).toBe(7)
  })

  it('handles string value', () => {
    const { container } = createBadge({ value: 'NEW' })
    expect(container.textContent).toBe('NEW')
  })
})

describe('createAvatar', () => {
  it('creates avatar element', () => {
    const { container } = createAvatar()
    expect(container.className).toBe('osx-avatar')
  })

  it('renders image when src provided', () => {
    const { container } = createAvatar({ src: 'photo.jpg', alt: 'Photo' })
    const img = container.querySelector('img')
    expect(img).not.toBeNull()
    expect(img!.src).toContain('photo.jpg')
    expect(img!.alt).toBe('Photo')
  })

  it('renders initials as fallback', () => {
    const { container } = createAvatar({ fallback: 'John Doe' })
    expect(container.textContent).toBe('JD')
  })

  it('renders single initial', () => {
    const { container } = createAvatar({ fallback: 'Alice' })
    expect(container.textContent).toBe('A')
  })

  it('applies size class', () => {
    const { container } = createAvatar({ size: 'large' })
    expect(container.classList.contains('large')).toBe(true)
  })

  it('does not add class for medium size', () => {
    const { container } = createAvatar({ size: 'medium' })
    expect(container.classList.contains('medium')).toBe(false)
  })

  it('setSrc() updates image', () => {
    const { container, setSrc } = createAvatar({ fallback: 'JD' })
    setSrc('new.jpg')
    const img = container.querySelector('img')
    expect(img).not.toBeNull()
    expect(img!.src).toContain('new.jpg')
    expect(container.textContent).toBe('')
  })

  it('setSrc() replaces existing image', () => {
    const { container, setSrc } = createAvatar({ src: 'old.jpg' })
    setSrc('new.jpg')
    const img = container.querySelector('img')
    expect(img!.src).toContain('new.jpg')
  })
})
