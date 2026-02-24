import { describe, it, expect } from 'vitest'
import { centerPosition } from '../center-position.js'

describe('centerPosition', () => {
  function makeContainer(width: number, height: number): HTMLElement {
    const el = document.createElement('div')
    Object.defineProperty(el, 'getBoundingClientRect', {
      value: () => ({
        width,
        height,
        top: 0,
        left: 0,
        right: width,
        bottom: height,
        x: 0,
        y: 0,
        toJSON: () => {}
      })
    })
    return el
  }

  it('centers a window in the container', () => {
    const container = makeContainer(800, 600)
    const pos = centerPosition(container, 400, 300)
    expect(pos.x).toBe(200)
    expect(pos.y).toBe(150)
  })

  it('enforces minimum x of 20', () => {
    const container = makeContainer(100, 600)
    const pos = centerPosition(container, 200, 300)
    expect(pos.x).toBe(20)
  })

  it('enforces minimum y of 10', () => {
    const container = makeContainer(800, 100)
    const pos = centerPosition(container, 400, 200)
    expect(pos.y).toBe(10)
  })

  it('returns rounded values', () => {
    const container = makeContainer(801, 601)
    const pos = centerPosition(container, 400, 300)
    expect(pos.x).toBe(Math.max(20, Math.round((801 - 400) / 2)))
    expect(pos.y).toBe(Math.max(10, Math.round((601 - 300) / 2)))
  })
})
