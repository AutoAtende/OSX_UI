import type { WindowCreateOptions, WindowState } from '../types.js'
import { createTrafficLights } from './traffic-lights.js'
import { initDrag } from './drag.js'
import { initResize } from './resize.js'

export interface WindowCallbacks {
  onClose: (id: string) => void
  onMinimize: (id: string) => void
  onMaximize: (id: string) => void
  onFocus: (id: string) => void
}

export function createWindow(
  opts: WindowCreateOptions,
  desktop: HTMLElement,
  callbacks: WindowCallbacks,
  zIndex: number,
  menuBarHeight: number
): WindowState {
  const minW = opts.minW || 320
  const minH = opts.minH || 200

  const el = document.createElement('div')
  el.className = 'osx-window'
  el.dataset.winId = opts.id
  el.style.left = opts.x + 'px'
  el.style.top = opts.y + 'px'
  el.style.width = opts.width + 'px'
  el.style.height = opts.height + 'px'
  el.style.zIndex = String(zIndex)

  // Build titlebar
  const titlebar = document.createElement('div')
  titlebar.className = 'osx-titlebar'

  const trafficLights = createTrafficLights({
    onClose: () => callbacks.onClose(opts.id),
    onMinimize: () => callbacks.onMinimize(opts.id),
    onMaximize: () => callbacks.onMaximize(opts.id)
  })
  titlebar.appendChild(trafficLights)

  const titleSpan = document.createElement('span')
  titleSpan.className = 'osx-title'
  titleSpan.textContent = opts.title
  titlebar.appendChild(titleSpan)

  el.appendChild(titlebar)

  // Content area
  const contentEl = document.createElement('div')
  contentEl.className = 'osx-content'
  if (typeof opts.content === 'string') {
    contentEl.innerHTML = opts.content
  } else if (opts.content instanceof HTMLElement) {
    contentEl.appendChild(opts.content)
  }
  el.appendChild(contentEl)

  // Resize handles
  const directions = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw']
  for (const dir of directions) {
    const handle = document.createElement('div')
    handle.className = `osx-resize-handle ${dir}`
    el.appendChild(handle)
  }

  desktop.appendChild(el)

  // Open animation
  el.classList.add('anim-open')
  el.addEventListener('animationend', () => el.classList.remove('anim-open'), { once: true })

  const state: WindowState = {
    el,
    id: opts.id,
    title: opts.title,
    minW,
    minH,
    onClose: opts.onClose || null,
    isMaximized: false,
    savedRect: null
  }

  // Focus on click
  el.addEventListener('pointerdown', () => callbacks.onFocus(opts.id))

  // Init drag and resize
  initDrag(state, desktop, menuBarHeight)
  initResize(state)

  return state
}
