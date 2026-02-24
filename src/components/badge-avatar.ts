export interface BadgeOptions {
  value?: number | string
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  max?: number
}

export interface BadgeResult {
  container: HTMLElement
  setValue: (value: number | string) => void
  getValue: () => number | string
}

export function createBadge(opts: BadgeOptions = {}): BadgeResult {
  const container = document.createElement('span')
  container.className = 'osx-badge'

  if (opts.variant && opts.variant !== 'default') {
    container.classList.add(opts.variant)
  }

  let value = opts.value ?? 0

  function updateDisplay() {
    const max = opts.max ?? 99
    let displayValue = value

    if (typeof value === 'number' && value > max) {
      displayValue = `${max}+`
    }

    container.textContent = String(displayValue)
    container.style.display =
      value !== undefined && value !== 0 && value !== '' ? 'inline-block' : 'none'
  }

  updateDisplay()

  return {
    container,
    setValue(newValue: number | string) {
      value = newValue
      updateDisplay()
    },
    getValue() {
      return value
    }
  }
}

export interface AvatarOptions {
  src?: string
  alt?: string
  size?: 'small' | 'medium' | 'large'
  fallback?: string
}

export interface AvatarResult {
  container: HTMLElement
  setSrc: (src: string) => void
}

export function createAvatar(opts: AvatarOptions = {}): AvatarResult {
  const container = document.createElement('div')
  container.className = 'osx-avatar'

  if (opts.size && opts.size !== 'medium') {
    container.classList.add(opts.size)
  }

  if (opts.src) {
    const img = document.createElement('img')
    img.src = opts.src
    img.alt = opts.alt || ''
    container.appendChild(img)
  } else if (opts.fallback) {
    const initials = opts.fallback
      .split(' ')
      .map((w) => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
    container.textContent = initials
  }

  return {
    container,
    setSrc(src: string) {
      let img = container.querySelector('img')
      if (!img) {
        img = document.createElement('img')
        container.textContent = ''
        container.appendChild(img)
      }
      img.src = src
    }
  }
}
