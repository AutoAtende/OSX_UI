import { describe, it, expect } from 'vitest'
import { createProgress, createSpinner } from '../progress.js'

describe('createProgress', () => {
  it('creates progress container', () => {
    const { container } = createProgress()
    expect(container.className).toBe('osx-progress')
  })

  it('defaults to 0 value', () => {
    const { getValue } = createProgress()
    expect(getValue()).toBe(0)
  })

  it('sets initial value', () => {
    const { getValue } = createProgress({ value: 50 })
    expect(getValue()).toBe(50)
  })

  it('renders progress bar with correct width', () => {
    const { container } = createProgress({ value: 50, max: 100 })
    const bar = container.querySelector('.osx-progress-bar') as HTMLElement
    expect(bar.style.width).toBe('50%')
  })

  it('setValue() updates progress', () => {
    const { setValue, getValue, container } = createProgress()
    setValue(75)
    expect(getValue()).toBe(75)
    const bar = container.querySelector('.osx-progress-bar') as HTMLElement
    expect(bar.style.width).toBe('75%')
  })

  it('setValue() clamps to max', () => {
    const { setValue, getValue } = createProgress({ max: 100 })
    setValue(150)
    expect(getValue()).toBe(100)
  })

  it('setValue() clamps to 0', () => {
    const { setValue, getValue } = createProgress()
    setValue(-10)
    expect(getValue()).toBe(0)
  })

  it('shows label when showValue is true', () => {
    const { container } = createProgress({ value: 42, showValue: true })
    const label = container.querySelector('.osx-progress-label')
    expect(label!.textContent).toBe('42%')
  })

  it('updates label on setValue', () => {
    const { container, setValue } = createProgress({ showValue: true })
    setValue(88)
    const label = container.querySelector('.osx-progress-label')
    expect(label!.textContent).toBe('88%')
  })

  it('applies variant class', () => {
    const { container } = createProgress({ variant: 'success' })
    expect(container.classList.contains('success')).toBe(true)
  })

  it('does not add class for default variant', () => {
    const { container } = createProgress({ variant: 'default' })
    expect(container.classList.contains('default')).toBe(false)
  })
})

describe('createSpinner', () => {
  it('creates spinner container', () => {
    const { container } = createSpinner()
    expect(container.className).toBe('osx-spinner')
  })

  it('adds size class', () => {
    const { container } = createSpinner({ size: 'small' })
    expect(container.classList.contains('small')).toBe(true)
  })

  it('does not add class for medium size', () => {
    const { container } = createSpinner({ size: 'medium' })
    expect(container.classList.contains('medium')).toBe(false)
  })
})
