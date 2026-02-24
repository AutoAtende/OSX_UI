import { createCleanupTracker } from '../utils/events.js'

export interface ColorPickerOptions {
  value?: string
  onChange?: (color: string) => void
}

export interface ColorPickerResult {
  container: HTMLElement
  setValue: (color: string) => void
  getValue: () => string
  destroy: () => void
}

const PRESET_COLORS = [
  '#ef4444',
  '#f97316',
  '#f59e0b',
  '#84cc16',
  '#22c55e',
  '#14b8a6',
  '#06b6d4',
  '#3b82f6',
  '#6366f1',
  '#8b5cf6',
  '#a855f7',
  '#ec4899',
  '#f43f5e',
  '#ffffff',
  '#94a3b8',
  '#000000'
]

export function createColorPicker(opts: ColorPickerOptions = {}): ColorPickerResult {
  const tracker = createCleanupTracker()
  const container = document.createElement('div')
  container.className = 'osx-colorpicker'

  let currentColor = opts.value || '#3b82f6'

  const trigger = document.createElement('button')
  trigger.className = 'osx-colorpicker-trigger'
  trigger.style.backgroundColor = currentColor

  const popup = document.createElement('div')
  popup.className = 'osx-colorpicker-popup'
  popup.style.display = 'none'

  const hexInput = document.createElement('input')
  hexInput.type = 'text'
  hexInput.className = 'osx-colorpicker-hex'
  hexInput.value = currentColor

  const presetContainer = document.createElement('div')
  presetContainer.className = 'osx-colorpicker-presets'

  for (const color of PRESET_COLORS) {
    const swatch = document.createElement('button')
    swatch.className = 'osx-colorpicker-swatch'
    swatch.style.backgroundColor = color
    if (color === currentColor) swatch.classList.add('selected')

    swatch.addEventListener('click', () => {
      currentColor = color
      trigger.style.backgroundColor = color
      hexInput.value = color
      updateSelection()
      if (opts.onChange) opts.onChange(color)
    })

    presetContainer.appendChild(swatch)
  }

  function updateSelection() {
    const swatches = presetContainer.querySelectorAll('.osx-colorpicker-swatch')
    swatches.forEach((s) => {
      const sw = s as HTMLElement
      sw.classList.toggle(
        'selected',
        sw.style.backgroundColor === currentColor ||
          rgbToHex(sw.style.backgroundColor) === currentColor.toLowerCase()
      )
    })
  }

  function rgbToHex(rgb: string): string {
    if (rgb.startsWith('#')) return rgb.toLowerCase()
    const match = rgb.match(/\d+/g)
    if (!match) return rgb
    return (
      '#' +
      match
        .slice(0, 3)
        .map((x) => parseInt(x).toString(16).padStart(2, '0'))
        .join('')
    )
  }

  hexInput.addEventListener('change', () => {
    let val = hexInput.value.trim()
    if (!val.startsWith('#')) val = '#' + val
    if (/^#[0-9a-fA-F]{6}$/.test(val)) {
      currentColor = val.toLowerCase()
      trigger.style.backgroundColor = currentColor
      updateSelection()
      if (opts.onChange) opts.onChange(currentColor)
    }
  })

  tracker.on(trigger, 'click', (e) => {
    ;(e as MouseEvent).stopPropagation()
    popup.style.display = popup.style.display === 'none' ? 'block' : 'none'
  })

  tracker.on(document, 'click', () => {
    popup.style.display = 'none'
  })

  popup.appendChild(hexInput)
  popup.appendChild(presetContainer)
  container.appendChild(trigger)
  container.appendChild(popup)

  return {
    container,
    setValue(color: string) {
      currentColor = color
      trigger.style.backgroundColor = color
      hexInput.value = color
      updateSelection()
    },
    getValue() {
      return currentColor
    },
    destroy() {
      tracker.clear()
    }
  }
}
