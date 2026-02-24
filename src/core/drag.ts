import type { WindowState } from '../types.js'

export function initDrag(state: WindowState, desktop: HTMLElement, menuBarHeight: number): void {
  const titlebar = state.el.querySelector('.osx-titlebar') as HTMLElement
  if (!titlebar) return

  let dragging = false
  let offsetX = 0
  let offsetY = 0

  titlebar.addEventListener('pointerdown', (e: PointerEvent) => {
    if ((e.target as HTMLElement).closest('.osx-traffic-lights')) return
    if (state.isMaximized) return

    dragging = true
    offsetX = e.clientX - parseInt(state.el.style.left)
    offsetY = e.clientY - parseInt(state.el.style.top)
    titlebar.setPointerCapture(e.pointerId)
  })

  titlebar.addEventListener('pointermove', (e: PointerEvent) => {
    if (!dragging) return
    const dr = desktop.getBoundingClientRect()
    let nx = e.clientX - offsetX
    let ny = e.clientY - offsetY

    // Clamp
    nx = Math.max(-parseInt(state.el.style.width) + 100, Math.min(dr.width - 100, nx))
    ny = Math.max(menuBarHeight, Math.min(dr.height - 38, ny))

    state.el.style.left = nx + 'px'
    state.el.style.top = ny + 'px'
  })

  titlebar.addEventListener('pointerup', () => {
    dragging = false
  })
  titlebar.addEventListener('pointercancel', () => {
    dragging = false
  })
}
