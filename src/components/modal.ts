import { createCleanupTracker } from '../utils/events.js'

export interface ModalOptions {
  content: string | HTMLElement
  onClose?: () => void
  closeOnBackdrop?: boolean
}

export interface ModalResult {
  backdrop: HTMLElement
  modal: HTMLElement
  close: () => void
  destroy: () => void
}

export function createModal(opts: ModalOptions): ModalResult {
  const tracker = createCleanupTracker()
  const backdrop = document.createElement('div')
  backdrop.className = 'osx-modal-backdrop'

  const modal = document.createElement('div')
  modal.className = 'osx-modal'
  modal.setAttribute('role', 'dialog')
  modal.setAttribute('aria-modal', 'true')
  modal.tabIndex = -1

  if (typeof opts.content === 'string') {
    modal.innerHTML = opts.content
  } else {
    modal.appendChild(opts.content)
  }

  backdrop.appendChild(modal)

  const previouslyFocused = document.activeElement as HTMLElement | null

  const close = () => {
    tracker.clear()
    backdrop.remove()
    if (previouslyFocused && previouslyFocused.focus) {
      previouslyFocused.focus()
    }
    if (opts.onClose) opts.onClose()
  }

  if (opts.closeOnBackdrop !== false) {
    tracker.on(backdrop, 'click', (e) => {
      if ((e as MouseEvent).target === backdrop) close()
    })
  }

  tracker.on(document, 'keydown', (e) => {
    if ((e as KeyboardEvent).key === 'Escape') close()
  })

  // Focus trap
  tracker.on(modal, 'keydown', (e) => {
    const ke = e as KeyboardEvent
    if (ke.key !== 'Tab') return

    const focusable = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (focusable.length === 0) return

    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (ke.shiftKey && document.activeElement === first) {
      ke.preventDefault()
      last.focus()
    } else if (!ke.shiftKey && document.activeElement === last) {
      ke.preventDefault()
      first.focus()
    }
  })

  document.body.appendChild(backdrop)
  modal.focus()

  return { backdrop, modal, close, destroy: close }
}
