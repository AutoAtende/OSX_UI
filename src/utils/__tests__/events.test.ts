import { describe, it, expect, vi } from 'vitest'
import { createCleanupTracker } from '../events.js'

describe('createCleanupTracker', () => {
  it('adds event listener via on()', () => {
    const tracker = createCleanupTracker()
    const el = document.createElement('div')
    const fn = vi.fn()

    tracker.on(el, 'click', fn)
    el.click()
    expect(fn).toHaveBeenCalledOnce()
  })

  it('removes all listeners on clear()', () => {
    const tracker = createCleanupTracker()
    const el = document.createElement('div')
    const fn = vi.fn()

    tracker.on(el, 'click', fn)
    tracker.clear()
    el.click()
    expect(fn).not.toHaveBeenCalled()
  })

  it('tracks multiple listeners on different elements', () => {
    const tracker = createCleanupTracker()
    const el1 = document.createElement('div')
    const el2 = document.createElement('div')
    const fn1 = vi.fn()
    const fn2 = vi.fn()

    tracker.on(el1, 'click', fn1)
    tracker.on(el2, 'click', fn2)

    el1.click()
    el2.click()
    expect(fn1).toHaveBeenCalledOnce()
    expect(fn2).toHaveBeenCalledOnce()

    tracker.clear()
    el1.click()
    el2.click()
    expect(fn1).toHaveBeenCalledOnce()
    expect(fn2).toHaveBeenCalledOnce()
  })

  it('can be reused after clear()', () => {
    const tracker = createCleanupTracker()
    const el = document.createElement('div')
    const fn1 = vi.fn()
    const fn2 = vi.fn()

    tracker.on(el, 'click', fn1)
    tracker.clear()

    tracker.on(el, 'click', fn2)
    el.click()
    expect(fn1).not.toHaveBeenCalled()
    expect(fn2).toHaveBeenCalledOnce()
  })
})
