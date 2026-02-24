import { describe, it, expect, vi, afterEach } from 'vitest'
import { Router } from '../router.js'

describe('Router', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('matches route and calls handler', () => {
    const handler = vi.fn()
    const router = new Router([{ pattern: /^\/home$/, handler }])
    router.routeTo('/home')
    expect(handler).toHaveBeenCalled()
    router.destroy()
  })

  it('passes match array to handler', () => {
    const handler = vi.fn()
    const router = new Router([{ pattern: /^\/users\/(\d+)$/, handler }])
    router.routeTo('/users/42')
    expect(handler).toHaveBeenCalledWith(expect.arrayContaining(['/users/42', '42']))
    router.destroy()
  })

  it('calls fallback when no route matches', () => {
    const fallback = vi.fn()
    const router = new Router([{ pattern: /^\/home$/, handler: vi.fn() }], fallback)
    router.routeTo('/unknown')
    expect(fallback).toHaveBeenCalledOnce()
    router.destroy()
  })

  it('does not call fallback when route matches', () => {
    const fallback = vi.fn()
    const router = new Router([{ pattern: /^\/home$/, handler: vi.fn() }], fallback)
    router.routeTo('/home')
    expect(fallback).not.toHaveBeenCalled()
    router.destroy()
  })

  it('navigate() pushes state and routes', () => {
    const handler = vi.fn()
    const pushStateSpy = vi.spyOn(history, 'pushState')
    const router = new Router([{ pattern: /^\/page$/, handler }])
    router.navigate('/page')
    expect(pushStateSpy).toHaveBeenCalledWith({}, '', '/page')
    expect(handler).toHaveBeenCalled()
    router.destroy()
  })

  it('navigate() with replace uses replaceState', () => {
    const handler = vi.fn()
    const replaceStateSpy = vi.spyOn(history, 'replaceState')
    const router = new Router([{ pattern: /^\/page$/, handler }])
    router.navigate('/page', { replace: true })
    expect(replaceStateSpy).toHaveBeenCalledWith({}, '', '/page')
    router.destroy()
  })

  it('destroy() removes popstate listener', () => {
    const handler = vi.fn()
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
    const router = new Router([{ pattern: /^\/home$/, handler }])
    router.destroy()
    expect(removeEventListenerSpy).toHaveBeenCalledWith('popstate', expect.any(Function))
  })

  it('matches first matching route', () => {
    const handler1 = vi.fn()
    const handler2 = vi.fn()
    const router = new Router([
      { pattern: /^\/page$/, handler: handler1 },
      { pattern: /^\/page$/, handler: handler2 }
    ])
    router.routeTo('/page')
    expect(handler1).toHaveBeenCalled()
    expect(handler2).not.toHaveBeenCalled()
    router.destroy()
  })
})
