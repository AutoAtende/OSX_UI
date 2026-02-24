import { describe, it, expect } from 'vitest'
import { createToolbar } from '../toolbar.js'

describe('createToolbar', () => {
  it('creates toolbar element', () => {
    const toolbar = createToolbar()
    expect(toolbar.className).toBe('osx-toolbar')
  })

  it('appends children', () => {
    const btn1 = document.createElement('button')
    const btn2 = document.createElement('button')
    const toolbar = createToolbar([btn1, btn2])
    expect(toolbar.children.length).toBe(2)
    expect(toolbar.contains(btn1)).toBe(true)
    expect(toolbar.contains(btn2)).toBe(true)
  })

  it('handles no children', () => {
    const toolbar = createToolbar()
    expect(toolbar.children.length).toBe(0)
  })

  it('handles empty array', () => {
    const toolbar = createToolbar([])
    expect(toolbar.children.length).toBe(0)
  })
})
