import { describe, it, expect, vi, afterEach } from 'vitest'
import { createColorPicker } from '../color-picker.js'

describe('createColorPicker', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('creates color picker container', () => {
    const { container } = createColorPicker()
    expect(container.className).toBe('osx-colorpicker')
  })

  it('defaults to blue color', () => {
    const { getValue } = createColorPicker()
    expect(getValue()).toBe('#3b82f6')
  })

  it('sets initial value', () => {
    const { getValue } = createColorPicker({ value: '#ff0000' })
    expect(getValue()).toBe('#ff0000')
  })

  it('renders trigger button with background color', () => {
    const { container } = createColorPicker({ value: '#ff0000' })
    const trigger = container.querySelector('.osx-colorpicker-trigger') as HTMLElement
    expect(trigger.style.backgroundColor).toBeTruthy()
  })

  it('renders preset swatches', () => {
    const { container } = createColorPicker()
    const swatches = container.querySelectorAll('.osx-colorpicker-swatch')
    expect(swatches.length).toBe(16)
  })

  it('renders hex input', () => {
    const { container } = createColorPicker({ value: '#ff0000' })
    const hexInput = container.querySelector('.osx-colorpicker-hex') as HTMLInputElement
    expect(hexInput.value).toBe('#ff0000')
  })

  it('popup is hidden by default', () => {
    const { container } = createColorPicker()
    const popup = container.querySelector('.osx-colorpicker-popup') as HTMLElement
    expect(popup.style.display).toBe('none')
  })

  it('setValue() updates color', () => {
    const result = createColorPicker()
    result.setValue('#00ff00')
    expect(result.getValue()).toBe('#00ff00')
  })

  it('clicking swatch calls onChange', () => {
    const onChange = vi.fn()
    const { container } = createColorPicker({ onChange })
    const swatch = container.querySelector('.osx-colorpicker-swatch') as HTMLElement
    swatch.click()
    expect(onChange).toHaveBeenCalled()
  })
})
