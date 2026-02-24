import { createCalendar, type CalendarOptions, type CalendarResult } from './calendar.js'

export interface DateRange {
  start: Date | null
  end: Date | null
}

export interface DateRangePickerOptions {
  min?: Date
  max?: Date
  value?: DateRange
  onChange?: (range: DateRange) => void
}

export interface DateRangePickerResult {
  container: HTMLElement
  setValue: (range: DateRange) => void
  getValue: () => DateRange
  getSelecting: () => 'start' | 'end'
}

function formatDate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function createDateRangePicker(opts: DateRangePickerOptions = {}): DateRangePickerResult {
  if (opts.min && opts.max && opts.min > opts.max) {
    console.warn('createDateRangePicker: min date is after max date')
  }
  if (opts.value?.start && opts.value?.end && opts.value.start > opts.value.end) {
    console.warn('createDateRangePicker: start date is after end date')
  }

  const container = document.createElement('div')
  container.className = 'osx-daterangepicker'

  let range: DateRange = opts.value || { start: null, end: null }

  const inputsContainer = document.createElement('div')
  inputsContainer.className = 'osx-daterangepicker-inputs'

  const startInput = document.createElement('input')
  startInput.type = 'text'
  startInput.className = 'osx-daterangepicker-input'
  startInput.placeholder = 'Start date'

  const separator = document.createElement('span')
  separator.className = 'osx-daterangepicker-separator'
  separator.textContent = '→'

  const endInput = document.createElement('input')
  endInput.type = 'text'
  endInput.className = 'osx-daterangepicker-input'
  endInput.placeholder = 'End date'

  inputsContainer.appendChild(startInput)
  inputsContainer.appendChild(separator)
  inputsContainer.appendChild(endInput)
  container.appendChild(inputsContainer)

  let startCal: CalendarResult | null = null
  let endCal: CalendarResult | null = null
  let selecting: 'start' | 'end' = 'start'

  const calendarsContainer = document.createElement('div')
  calendarsContainer.className = 'osx-daterangepicker-calendars'
  calendarsContainer.style.display = 'none'

  const calendarsWrapper = document.createElement('div')
  calendarsWrapper.className = 'osx-daterangepicker-wrapper'

  function renderCalendars() {
    calendarsWrapper.innerHTML = ''

    const startCalOpts: CalendarOptions = {
      value: range.start || undefined,
      min: opts.min,
      max: opts.max,
      onChange: (date) => {
        range.start = date
        selecting = 'end'
        renderCalendars()
        updateInputs()
        if (opts.onChange) opts.onChange(range)
      }
    }

    const endCalOpts: CalendarOptions = {
      value: range.end || undefined,
      min: range.start || opts.min,
      max: opts.max,
      onChange: (date) => {
        range.end = date
        selecting = 'start'
        renderCalendars()
        updateInputs()
        if (opts.onChange) opts.onChange(range)
      }
    }

    startCal = createCalendar(startCalOpts)
    endCal = createCalendar(endCalOpts)

    calendarsWrapper.appendChild(startCal.container)
    calendarsWrapper.appendChild(endCal.container)
    calendarsContainer.appendChild(calendarsWrapper)
  }

  function updateInputs() {
    startInput.value = range.start ? formatDate(range.start) : ''
    endInput.value = range.end ? formatDate(range.end) : ''
  }

  function toggleCalendars() {
    if (calendarsContainer.style.display === 'none') {
      renderCalendars()
      calendarsContainer.style.display = 'block'
    } else {
      calendarsContainer.style.display = 'none'
    }
  }

  startInput.addEventListener('focus', toggleCalendars)
  endInput.addEventListener('focus', toggleCalendars)

  container.appendChild(calendarsContainer)

  return {
    container,
    setValue(newRange: DateRange) {
      range = newRange
      updateInputs()
      if (calendarsContainer.style.display !== 'none') {
        renderCalendars()
      }
    },
    getValue() {
      return range
    },
    getSelecting() {
      return selecting
    }
  }
}
