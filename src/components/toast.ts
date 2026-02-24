export type ToastType = 'info' | 'success' | 'warning' | 'error'

export interface ToastOptions {
  message: string
  type?: ToastType
  duration?: number
}

export interface ToastResult {
  toast: HTMLElement
  close: () => void
}

const toastContainer = document.createElement('div')
toastContainer.className = 'osx-toast-container'
toastContainer.setAttribute('aria-live', 'polite')
toastContainer.setAttribute('aria-atomic', 'true')
document.body.appendChild(toastContainer)

export function createToast(opts: ToastOptions): ToastResult {
  const toast = document.createElement('div')
  toast.className = `osx-toast osx-toast-${opts.type || 'info'}`
  toast.setAttribute('role', opts.type === 'error' ? 'alert' : 'status')

  const icon = document.createElement('div')
  icon.className = 'osx-toast-icon'

  const icons: Record<ToastType, string> = {
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
    success:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    warning:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    error:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>'
  }

  icon.innerHTML = icons[opts.type || 'info']

  const message = document.createElement('div')
  message.className = 'osx-toast-message'
  message.textContent = opts.message

  const closeBtn = document.createElement('button')
  closeBtn.className = 'osx-toast-close'
  closeBtn.innerHTML = '&times;'
  closeBtn.setAttribute('aria-label', 'Close notification')

  const close = () => {
    toast.classList.remove('show')
    setTimeout(() => toast.remove(), 300)
  }

  closeBtn.addEventListener('click', close)

  toast.appendChild(icon)
  toast.appendChild(message)
  toast.appendChild(closeBtn)
  toastContainer.appendChild(toast)

  requestAnimationFrame(() => {
    toast.classList.add('show')
  })

  const duration = opts.duration ?? 4000
  if (duration > 0) {
    setTimeout(close, duration)
  }

  return { toast, close }
}

export function createToastStack(): typeof toastContainer {
  return toastContainer
}
