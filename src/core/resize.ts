import type { WindowState } from '../types.js'

export function initResize(state: WindowState): void {
  const handles = state.el.querySelectorAll('.osx-resize-handle')

  handles.forEach((handle) => {
    let resizing = false
    let startX = 0,
      startY = 0,
      startW = 0,
      startH = 0,
      startL = 0,
      startT = 0
    const dirs: string[] = []
    const cl = handle.classList
    if (cl.contains('n') || cl.contains('ne') || cl.contains('nw')) dirs.push('n')
    if (cl.contains('s') || cl.contains('se') || cl.contains('sw')) dirs.push('s')
    if (cl.contains('e') || cl.contains('ne') || cl.contains('se')) dirs.push('e')
    if (cl.contains('w') || cl.contains('nw') || cl.contains('sw')) dirs.push('w')

    handle.addEventListener('pointerdown', ((e: PointerEvent) => {
      if (state.isMaximized) return
      e.stopPropagation()
      resizing = true
      startX = e.clientX
      startY = e.clientY
      startW = parseInt(state.el.style.width)
      startH = parseInt(state.el.style.height)
      startL = parseInt(state.el.style.left)
      startT = parseInt(state.el.style.top)
      ;(handle as HTMLElement).setPointerCapture(e.pointerId)
    }) as EventListener)

    handle.addEventListener('pointermove', ((e: PointerEvent) => {
      if (!resizing) return
      const dx = e.clientX - startX
      const dy = e.clientY - startY

      let nw = startW,
        nh = startH,
        nl = startL,
        nt = startT

      if (dirs.includes('e')) nw = Math.max(state.minW, startW + dx)
      if (dirs.includes('w')) {
        nw = Math.max(state.minW, startW - dx)
        nl = startL + (startW - nw)
      }
      if (dirs.includes('s')) nh = Math.max(state.minH, startH + dy)
      if (dirs.includes('n')) {
        nh = Math.max(state.minH, startH - dy)
        nt = startT + (startH - nh)
      }

      state.el.style.width = nw + 'px'
      state.el.style.height = nh + 'px'
      state.el.style.left = nl + 'px'
      state.el.style.top = nt + 'px'
    }) as EventListener)

    handle.addEventListener('pointerup', () => {
      resizing = false
    })
    handle.addEventListener('pointercancel', () => {
      resizing = false
    })
  })
}
