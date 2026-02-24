import { describe, it, expect } from 'vitest'
import { createPill, createDot } from '../pill.js'

describe('createPill', () => {
  it('creates a pill element', () => {
    const pill = createPill({ text: 'Active' })
    expect(pill.className).toBe('osx-pill')
    expect(pill.textContent).toBe('Active')
  })

  it('adds compact class', () => {
    const pill = createPill({ text: 'Small', compact: true })
    expect(pill.classList.contains('compact')).toBe(true)
  })

  it('adds dot indicator', () => {
    const pill = createPill({ text: 'Status', dot: 'ok' })
    const dot = pill.querySelector('.osx-dot')
    expect(dot).not.toBeNull()
    expect(dot!.classList.contains('ok')).toBe(true)
  })

  it('renders without dot', () => {
    const pill = createPill({ text: 'No dot' })
    expect(pill.querySelector('.osx-dot')).toBeNull()
  })
})

describe('createDot', () => {
  it('creates a dot element', () => {
    const dot = createDot('danger')
    expect(dot.classList.contains('osx-dot')).toBe(true)
    expect(dot.classList.contains('danger')).toBe(true)
  })
})
