import { createCleanupTracker } from '../utils/events.js'

export interface TooltipOptions {
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
}

export interface TooltipResult {
  container: HTMLElement
  tooltip: HTMLElement
  show: () => void
  hide: () => void
  destroy: () => void
}

export function createTooltip(target: HTMLElement, opts: TooltipOptions): TooltipResult {
  const tracker = createCleanupTracker()
  const tooltip = document.createElement('div')
  tooltip.className = `osx-tooltip osx-tooltip-${opts.position || 'top'}`
  tooltip.setAttribute('role', 'tooltip')
  tooltip.textContent = opts.content
  tooltip.style.display = 'none'

  document.body.appendChild(tooltip)

  let showTimeout: ReturnType<typeof setTimeout>
  const delay = opts.delay ?? 300

  function show() {
    clearTimeout(showTimeout)
    showTimeout = setTimeout(() => {
      const rect = target.getBoundingClientRect()
      const tooltipRect = tooltip.getBoundingClientRect()

      let top: number, left: number

      switch (opts.position || 'top') {
        case 'top':
          top = rect.top - tooltipRect.height - 8
          left = rect.left + (rect.width - tooltipRect.width) / 2
          break
        case 'bottom':
          top = rect.bottom + 8
          left = rect.left + (rect.width - tooltipRect.width) / 2
          break
        case 'left':
          top = rect.top + (rect.height - tooltipRect.height) / 2
          left = rect.left - tooltipRect.width - 8
          break
        case 'right':
          top = rect.top + (rect.height - tooltipRect.height) / 2
          left = rect.right + 8
          break
      }

      tooltip.style.top = `${top + window.scrollY}px`
      tooltip.style.left = `${left + window.scrollX}px`
      tooltip.style.display = 'block'
    }, delay)
  }

  function hide() {
    clearTimeout(showTimeout)
    tooltip.style.display = 'none'
  }

  function destroy() {
    tracker.clear()
    hide()
    tooltip.remove()
  }

  tracker.on(target, 'mouseenter', show)
  tracker.on(target, 'mouseleave', hide)
  tracker.on(target, 'focus', show)
  tracker.on(target, 'blur', hide)

  return {
    container: target,
    tooltip,
    show,
    hide,
    destroy
  }
}
