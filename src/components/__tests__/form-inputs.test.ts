import { describe, it, expect, vi } from 'vitest'
import { createCheckbox, createRadioGroup, createToggle } from '../form-inputs.js'

describe('createCheckbox', () => {
  it('creates checkbox container', () => {
    const { container } = createCheckbox()
    expect(container.className).toBe('osx-checkbox')
  })

  it('creates with label', () => {
    const { container } = createCheckbox({ label: 'Accept terms' })
    expect(container.querySelector('.osx-checkbox-label')!.textContent).toBe('Accept terms')
  })

  it('starts unchecked by default', () => {
    const { getChecked } = createCheckbox()
    expect(getChecked()).toBe(false)
  })

  it('starts checked when specified', () => {
    const { getChecked } = createCheckbox({ checked: true })
    expect(getChecked()).toBe(true)
  })

  it('setChecked() updates state', () => {
    const { setChecked, getChecked } = createCheckbox()
    setChecked(true)
    expect(getChecked()).toBe(true)
  })

  it('disabled state', () => {
    const { input, container } = createCheckbox({ disabled: true })
    expect(input.disabled).toBe(true)
    expect(container.classList.contains('disabled')).toBe(true)
  })

  it('onChange fires on change event', () => {
    const onChange = vi.fn()
    const { input } = createCheckbox({ onChange })
    input.checked = true
    input.dispatchEvent(new Event('change'))
    expect(onChange).toHaveBeenCalledWith(true)
  })
})

describe('createRadioGroup', () => {
  const options = [
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
    { value: 'c', label: 'Option C' }
  ]

  it('creates radio group container', () => {
    const { container } = createRadioGroup({ name: 'test', options })
    expect(container.className).toBe('osx-radio-group')
  })

  it('renders all options', () => {
    const { container } = createRadioGroup({ name: 'test', options })
    const radios = container.querySelectorAll('.osx-radio')
    expect(radios.length).toBe(3)
  })

  it('sets initial value', () => {
    const { getValue } = createRadioGroup({ name: 'test', options, value: 'b' })
    expect(getValue()).toBe('b')
  })

  it('getValue() returns null when none selected', () => {
    const { getValue } = createRadioGroup({ name: 'test', options })
    expect(getValue()).toBeNull()
  })

  it('setValue() updates selection', () => {
    const result = createRadioGroup({ name: 'test', options })
    result.setValue('c')
    expect(result.getValue()).toBe('c')
  })

  it('onChange fires when radio is changed', () => {
    const onChange = vi.fn()
    const { container } = createRadioGroup({ name: 'test', options, onChange })
    const input = container.querySelector('input[value="a"]') as HTMLInputElement
    input.checked = true
    input.dispatchEvent(new Event('change'))
    expect(onChange).toHaveBeenCalledWith('a')
  })

  it('disabled option', () => {
    const opts = [{ value: 'x', label: 'X', disabled: true }]
    const { container } = createRadioGroup({ name: 'test', options: opts })
    const input = container.querySelector('input') as HTMLInputElement
    expect(input.disabled).toBe(true)
  })
})

describe('createToggle', () => {
  it('creates toggle container', () => {
    const { container } = createToggle()
    expect(container.className).toBe('osx-toggle')
  })

  it('starts unchecked by default', () => {
    const { getChecked } = createToggle()
    expect(getChecked()).toBe(false)
  })

  it('starts checked when specified', () => {
    const { getChecked } = createToggle({ checked: true })
    expect(getChecked()).toBe(true)
  })

  it('setChecked() updates state', () => {
    const { setChecked, getChecked } = createToggle()
    setChecked(true)
    expect(getChecked()).toBe(true)
  })

  it('renders label', () => {
    const { container } = createToggle({ label: 'Dark mode' })
    expect(container.querySelector('.osx-toggle-label')!.textContent).toBe('Dark mode')
  })

  it('disabled state', () => {
    const { input, container } = createToggle({ disabled: true })
    expect(input.disabled).toBe(true)
    expect(container.classList.contains('disabled')).toBe(true)
  })

  it('onChange fires on change event', () => {
    const onChange = vi.fn()
    const { input } = createToggle({ onChange })
    input.checked = true
    input.dispatchEvent(new Event('change'))
    expect(onChange).toHaveBeenCalledWith(true)
  })
})
