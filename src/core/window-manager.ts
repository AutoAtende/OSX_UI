import type { WindowCreateOptions, WindowState } from '../types.js'
import { createWindow } from './window.js'
import { Dock } from './dock.js'

export class WindowManager {
  private windows = new Map<string, WindowState>()
  private zCounter = 10
  private _focusedId: string | null = null
  private desktop: HTMLElement
  private dock: Dock
  private menuBarHeight: number

  get focusedId(): string | null {
    return this._focusedId
  }

  constructor(desktop: HTMLElement, menuBarHeight = 28) {
    this.desktop = desktop
    this.menuBarHeight = menuBarHeight
    this.dock = new Dock(desktop.parentElement || document.body, (id) => this.restoreWindow(id))
  }

  createWindow(opts: WindowCreateOptions): WindowState {
    if (this.windows.has(opts.id)) {
      this.focusWindow(opts.id)
      return this.windows.get(opts.id)!
    }

    const state = createWindow(
      opts,
      this.desktop,
      {
        onClose: (id) => this.closeWindow(id),
        onMinimize: (id) => this.minimizeWindow(id),
        onMaximize: (id) => this.maximizeWindow(id),
        onFocus: (id) => this.focusWindow(id)
      },
      ++this.zCounter,
      this.menuBarHeight
    )

    this.windows.set(opts.id, state)
    this.focusWindow(opts.id)
    return state
  }

  closeWindow(id: string): void {
    const win = this.windows.get(id)
    if (!win) return

    if (win.onClose) win.onClose()
    this.windows.delete(id)

    // Remove from dock if minimized
    this.dock.removeItem(id)

    // Focus next window
    if (this._focusedId === id) {
      this._focusedId = null
      let topWin: string | null = null
      let topZ = -1
      for (const [wid, w] of this.windows) {
        const z = parseInt(w.el.style.zIndex) || 0
        if (z > topZ && w.el.style.display !== 'none') {
          topZ = z
          topWin = wid
        }
      }
      if (topWin) this.focusWindow(topWin)
    }

    // Animate removal
    win.el.classList.add('anim-close')
    win.el.addEventListener('animationend', () => win.el.remove(), { once: true })
  }

  minimizeWindow(id: string): void {
    const win = this.windows.get(id)
    if (!win) return

    this.dock.addItem(id, win.title)

    if (this._focusedId === id) {
      this._focusedId = null
    }

    win.el.classList.add('anim-minimize')
    win.el.addEventListener(
      'animationend',
      () => {
        win.el.classList.remove('anim-minimize')
        win.el.style.display = 'none'
      },
      { once: true }
    )
  }

  restoreWindow(id: string): void {
    const win = this.windows.get(id)
    if (!win) return
    win.el.style.display = ''

    win.el.classList.add('anim-open')
    win.el.addEventListener('animationend', () => win.el.classList.remove('anim-open'), {
      once: true
    })

    this.dock.removeItem(id)
    this.focusWindow(id)
  }

  maximizeWindow(id: string): void {
    const win = this.windows.get(id)
    if (!win) return

    if (win.isMaximized) {
      if (win.savedRect) {
        win.el.style.left = win.savedRect.x + 'px'
        win.el.style.top = win.savedRect.y + 'px'
        win.el.style.width = win.savedRect.w + 'px'
        win.el.style.height = win.savedRect.h + 'px'
      }
      win.isMaximized = false
    } else {
      win.savedRect = {
        x: parseInt(win.el.style.left),
        y: parseInt(win.el.style.top),
        w: parseInt(win.el.style.width),
        h: parseInt(win.el.style.height)
      }
      const dr = this.desktop.getBoundingClientRect()
      win.el.style.left = '0px'
      win.el.style.top = '0px'
      win.el.style.width = dr.width + 'px'
      win.el.style.height = dr.height + 'px'
      win.isMaximized = true
    }
  }

  focusWindow(id: string): void {
    const win = this.windows.get(id)
    if (!win) return

    if (this._focusedId && this._focusedId !== id) {
      const prev = this.windows.get(this._focusedId)
      if (prev) prev.el.classList.remove('focused')
    }

    win.el.style.zIndex = String(++this.zCounter)
    win.el.classList.add('focused')
    this._focusedId = id
  }

  getWindow(id: string): WindowState | undefined {
    return this.windows.get(id)
  }

  getAllWindows(): Map<string, WindowState> {
    return this.windows
  }

  destroy(): void {
    for (const [id] of this.windows) {
      this.closeWindow(id)
    }
    this.dock.destroy()
  }
}
