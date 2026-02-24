import { createCleanupTracker } from '../utils/events.js'

export interface AutocompleteOption {
  value: string
  label: string
}

export interface AutocompleteOptions {
  placeholder?: string
  options: AutocompleteOption[]
  value?: string
  onChange?: (value: string | null) => void
}

export interface AutocompleteResult {
  container: HTMLElement
  input: HTMLInputElement
  setValue: (value: string | null) => void
  getValue: () => string | null
  destroy: () => void
}

export function createAutocomplete(opts: AutocompleteOptions): AutocompleteResult {
  if (!opts.options || opts.options.length === 0) {
    console.warn('createAutocomplete: options array is empty')
  }

  const tracker = createCleanupTracker()
  const container = document.createElement('div')
  container.className = 'osx-autocomplete'

  const input = document.createElement('input')
  input.type = 'text'
  input.className = 'osx-autocomplete-input'
  input.placeholder = opts.placeholder || 'Search...'
  input.setAttribute('role', 'combobox')
  input.setAttribute('aria-autocomplete', 'list')
  input.setAttribute('aria-expanded', 'false')
  if (opts.value) {
    const opt = opts.options.find((o) => o.value === opts.value)
    input.value = opt ? opt.label : ''
  }

  const dropdown = document.createElement('div')
  dropdown.className = 'osx-autocomplete-dropdown'
  dropdown.setAttribute('role', 'listbox')
  dropdown.style.display = 'none'

  let selectedIndex = -1

  function renderOptions(filter = '') {
    dropdown.innerHTML = ''
    selectedIndex = -1

    const filtered = opts.options.filter((opt) =>
      opt.label.toLowerCase().includes(filter.toLowerCase())
    )

    if (filtered.length === 0) {
      const noResults = document.createElement('div')
      noResults.className = 'osx-autocomplete-empty'
      noResults.textContent = 'No results'
      dropdown.appendChild(noResults)
      dropdown.style.display = 'block'
      return
    }

    for (let i = 0; i < filtered.length; i++) {
      const opt = filtered[i]
      const item = document.createElement('div')
      item.className = 'osx-autocomplete-item'
      item.setAttribute('role', 'option')
      item.textContent = opt.label

      item.addEventListener('click', () => {
        selectOption(opt)
      })

      dropdown.appendChild(item)
    }

    dropdown.style.display = 'block'
    input.setAttribute('aria-expanded', 'true')
  }

  function selectOption(opt: AutocompleteOption) {
    input.value = opt.label
    dropdown.style.display = 'none'
    input.setAttribute('aria-expanded', 'false')
    if (opts.onChange) opts.onChange(opt.value)
  }

  function highlightItem(index: number) {
    const items = dropdown.querySelectorAll('.osx-autocomplete-item')
    items.forEach((item, i) => {
      item.classList.toggle('active', i === index)
    })
  }

  tracker.on(input, 'input', () => {
    renderOptions(input.value)
  })

  tracker.on(input, 'keydown', (e) => {
    const ke = e as KeyboardEvent
    const items = dropdown.querySelectorAll('.osx-autocomplete-item')

    if (ke.key === 'ArrowDown') {
      ke.preventDefault()
      selectedIndex = Math.min(selectedIndex + 1, items.length - 1)
      highlightItem(selectedIndex)
    } else if (ke.key === 'ArrowUp') {
      ke.preventDefault()
      selectedIndex = Math.max(selectedIndex - 1, 0)
      highlightItem(selectedIndex)
    } else if (ke.key === 'Enter' && selectedIndex >= 0) {
      ke.preventDefault()
      const item = items[selectedIndex] as HTMLElement
      item.click()
    } else if (ke.key === 'Escape') {
      dropdown.style.display = 'none'
      input.setAttribute('aria-expanded', 'false')
    }
  })

  tracker.on(input, 'focus', () => {
    renderOptions(input.value)
  })

  tracker.on(document, 'click', (e) => {
    if (!container.contains((e as MouseEvent).target as Node)) {
      dropdown.style.display = 'none'
    }
  })

  container.appendChild(input)
  container.appendChild(dropdown)

  return {
    container,
    input,
    setValue(value: string | null) {
      if (value) {
        const opt = opts.options.find((o) => o.value === value)
        input.value = opt ? opt.label : ''
      } else {
        input.value = ''
      }
    },
    getValue() {
      const text = input.value.toLowerCase()
      const opt = opts.options.find((o) => o.label.toLowerCase() === text)
      return opt ? opt.value : null
    },
    destroy() {
      tracker.clear()
    }
  }
}
