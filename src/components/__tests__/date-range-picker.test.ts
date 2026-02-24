import { describe, it, expect } from 'vitest'
import { createDateRangePicker } from '../date-range-picker.js'

describe('createDateRangePicker', () => {
  it('creates container', () => {
    const { container } = createDateRangePicker()
    expect(container.className).toBe('osx-daterangepicker')
  })

  it('renders start and end inputs', () => {
    const { container } = createDateRangePicker()
    const inputs = container.querySelectorAll('.osx-daterangepicker-input')
    expect(inputs.length).toBe(2)
  })

  it('renders separator', () => {
    const { container } = createDateRangePicker()
    const sep = container.querySelector('.osx-daterangepicker-separator')
    expect(sep!.textContent).toBe('\u2192')
  })

  it('calendars hidden by default', () => {
    const { container } = createDateRangePicker()
    const cals = container.querySelector('.osx-daterangepicker-calendars') as HTMLElement
    expect(cals.style.display).toBe('none')
  })

  it('getValue() returns initial range', () => {
    const { getValue } = createDateRangePicker()
    expect(getValue()).toEqual({ start: null, end: null })
  })

  it('setValue() updates range and inputs', () => {
    const result = createDateRangePicker()
    const start = new Date(2024, 0, 1)
    const end = new Date(2024, 0, 31)
    result.setValue({ start, end })
    const range = result.getValue()
    expect(range.start).toBe(start)
    expect(range.end).toBe(end)

    const inputs = result.container.querySelectorAll(
      '.osx-daterangepicker-input'
    ) as NodeListOf<HTMLInputElement>
    expect(inputs[0].value).toBe('2024-01-01')
    expect(inputs[1].value).toBe('2024-01-31')
  })

  it('getSelecting() defaults to start', () => {
    const { getSelecting } = createDateRangePicker()
    expect(getSelecting()).toBe('start')
  })

  it('sets initial value', () => {
    const start = new Date(2024, 5, 1)
    const end = new Date(2024, 5, 30)
    const { getValue } = createDateRangePicker({ value: { start, end } })
    const range = getValue()
    expect(range.start).toBe(start)
    expect(range.end).toBe(end)
  })
})
