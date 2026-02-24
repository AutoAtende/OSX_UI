import { describe, it, expect, vi, afterEach } from 'vitest'
import { createAutocomplete } from '../autocomplete.js'

describe('createAutocomplete', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' }
  ]

  it('creates autocomplete container', () => {
    const { container } = createAutocomplete({ options })
    expect(container.className).toBe('osx-autocomplete')
  })

  it('creates input element', () => {
    const { input } = createAutocomplete({ options })
    expect(input.type).toBe('text')
  })

  it('sets placeholder', () => {
    const { input } = createAutocomplete({ options, placeholder: 'Type here' })
    expect(input.placeholder).toBe('Type here')
  })

  it('sets initial value', () => {
    const { input } = createAutocomplete({ options, value: 'banana' })
    expect(input.value).toBe('Banana')
  })

  it('setValue() updates input', () => {
    const result = createAutocomplete({ options })
    result.setValue('cherry')
    expect(result.input.value).toBe('Cherry')
  })

  it('setValue(null) clears input', () => {
    const result = createAutocomplete({ options, value: 'apple' })
    result.setValue(null)
    expect(result.input.value).toBe('')
  })

  it('getValue() returns matched value', () => {
    const result = createAutocomplete({ options })
    result.input.value = 'Apple'
    expect(result.getValue()).toBe('apple')
  })

  it('getValue() returns null for unmatched text', () => {
    const result = createAutocomplete({ options })
    result.input.value = 'Grape'
    expect(result.getValue()).toBeNull()
  })

  it('shows dropdown on input', () => {
    const { container, input } = createAutocomplete({ options })
    document.body.appendChild(container)
    input.value = 'a'
    input.dispatchEvent(new Event('input'))
    const dropdown = container.querySelector('.osx-autocomplete-dropdown') as HTMLElement
    expect(dropdown.style.display).toBe('block')
  })

  it('filters options on input', () => {
    const { container, input } = createAutocomplete({ options })
    document.body.appendChild(container)
    input.value = 'ban'
    input.dispatchEvent(new Event('input'))
    const items = container.querySelectorAll('.osx-autocomplete-item')
    expect(items.length).toBe(1)
    expect(items[0].textContent).toBe('Banana')
  })

  it('shows "No results" when filter matches nothing', () => {
    const { container, input } = createAutocomplete({ options })
    document.body.appendChild(container)
    input.value = 'xyz'
    input.dispatchEvent(new Event('input'))
    const empty = container.querySelector('.osx-autocomplete-empty')
    expect(empty).not.toBeNull()
  })

  it('calls onChange when option is selected', () => {
    const onChange = vi.fn()
    const { container, input } = createAutocomplete({ options, onChange })
    document.body.appendChild(container)
    input.value = 'a'
    input.dispatchEvent(new Event('input'))
    const item = container.querySelector('.osx-autocomplete-item') as HTMLElement
    item.click()
    expect(onChange).toHaveBeenCalledWith('apple')
  })

  it('Escape key hides dropdown', () => {
    const { container, input } = createAutocomplete({ options })
    document.body.appendChild(container)
    input.dispatchEvent(new Event('focus'))
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    const dropdown = container.querySelector('.osx-autocomplete-dropdown') as HTMLElement
    expect(dropdown.style.display).toBe('none')
  })
})
