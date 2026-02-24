import { describe, it, expect, vi } from 'vitest'
import { createCalendar } from '../calendar.js'

describe('createCalendar', () => {
  it('creates calendar container', () => {
    const { container } = createCalendar()
    expect(container.className).toBe('osx-calendar')
  })

  it('renders month label', () => {
    const date = new Date(2024, 5, 15) // June 2024
    const { container } = createCalendar({ value: date })
    const monthLabel = container.querySelector('.osx-calendar-month')
    expect(monthLabel!.textContent).toBe('June 2024')
  })

  it('renders day names', () => {
    const { container } = createCalendar()
    const dayNames = container.querySelectorAll('.osx-calendar-day-name')
    expect(dayNames.length).toBe(7)
    expect(dayNames[0].textContent).toBe('Su')
  })

  it('renders day buttons', () => {
    const { container } = createCalendar({ value: new Date(2024, 0, 1) })
    const days = container.querySelectorAll('.osx-calendar-day:not(.empty)')
    expect(days.length).toBe(31) // January has 31 days
  })

  it('marks selected date', () => {
    const date = new Date(2024, 0, 15)
    const { container } = createCalendar({ value: date })
    const selected = container.querySelector('.osx-calendar-day.selected')
    expect(selected).not.toBeNull()
    expect(selected!.textContent).toBe('15')
  })

  it('calls onChange when day is clicked', () => {
    const onChange = vi.fn()
    const { container } = createCalendar({ value: new Date(2024, 0, 1), onChange })
    const days = container.querySelectorAll('.osx-calendar-day:not(.empty):not(.disabled)')
    ;(days[9] as HTMLElement).click() // Click day 10
    expect(onChange).toHaveBeenCalled()
  })

  it('navigates to previous month', () => {
    const { container } = createCalendar({ value: new Date(2024, 5, 15) }) // June
    const prevBtn = container.querySelector('.osx-calendar-nav') as HTMLElement
    prevBtn.click()
    const monthLabel = container.querySelector('.osx-calendar-month')
    expect(monthLabel!.textContent).toBe('May 2024')
  })

  it('navigates to next month', () => {
    const { container } = createCalendar({ value: new Date(2024, 5, 15) }) // June
    const navBtns = container.querySelectorAll('.osx-calendar-nav')
    ;(navBtns[1] as HTMLElement).click()
    const monthLabel = container.querySelector('.osx-calendar-month')
    expect(monthLabel!.textContent).toBe('July 2024')
  })

  it('setValue() changes selected date and month', () => {
    const result = createCalendar()
    result.setValue(new Date(2025, 11, 25)) // December 2025
    const monthLabel = result.container.querySelector('.osx-calendar-month')
    expect(monthLabel!.textContent).toBe('December 2025')
    expect(result.getValue()!.getDate()).toBe(25)
  })

  it('getValue() returns null when no date selected', () => {
    const { getValue } = createCalendar()
    expect(getValue()).toBeNull()
  })

  it('getFormattedValue() returns formatted date', () => {
    const result = createCalendar({ value: new Date(2024, 0, 5) })
    expect(result.getFormattedValue()).toBe('2024-01-05')
  })

  it('getFormattedValue() returns null when no date', () => {
    const { getFormattedValue } = createCalendar()
    expect(getFormattedValue()).toBeNull()
  })

  it('disables dates before min', () => {
    const { container } = createCalendar({
      value: new Date(2024, 0, 15),
      min: new Date(2024, 0, 10)
    })
    const disabled = container.querySelectorAll('.osx-calendar-day.disabled')
    expect(disabled.length).toBeGreaterThan(0)
  })
})
