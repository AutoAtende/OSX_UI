import { describe, it, expect } from 'vitest'
import { createElement } from '../dom.js'

describe('createElement', () => {
  it('creates an element with the given tag', () => {
    const el = createElement('div')
    expect(el.tagName).toBe('DIV')
  })

  it('sets className when provided', () => {
    const el = createElement('span', 'my-class')
    expect(el.className).toBe('my-class')
  })

  it('does not set className when not provided', () => {
    const el = createElement('div')
    expect(el.className).toBe('')
  })

  it('sets attributes from attrs object', () => {
    const el = createElement('input', undefined, { type: 'text', name: 'email' })
    expect(el.getAttribute('type')).toBe('text')
    expect(el.getAttribute('name')).toBe('email')
  })

  it('returns correctly typed element', () => {
    const btn = createElement('button')
    expect(btn).toBeInstanceOf(HTMLButtonElement)

    const input = createElement('input')
    expect(input).toBeInstanceOf(HTMLInputElement)
  })

  it('handles className and attrs together', () => {
    const el = createElement('div', 'wrapper', { id: 'main', role: 'main' })
    expect(el.className).toBe('wrapper')
    expect(el.id).toBe('main')
    expect(el.getAttribute('role')).toBe('main')
  })
})
