import { describe, it, expect } from 'vitest'
import { createPasswordField } from '../password-field.js'

describe('createPasswordField', () => {
  it('creates password input', () => {
    const { input } = createPasswordField()
    expect(input.type).toBe('password')
  })

  it('sets name attribute', () => {
    const { input } = createPasswordField({ name: 'secret' })
    expect(input.name).toBe('secret')
  })

  it('defaults name to password', () => {
    const { input } = createPasswordField()
    expect(input.name).toBe('password')
  })

  it('renders label when provided', () => {
    const { container } = createPasswordField({ label: 'Password' })
    const label = container.querySelector('label')
    expect(label!.textContent).toBe('Password')
  })

  it('does not render label when not provided', () => {
    const { container } = createPasswordField()
    expect(container.querySelector('label')).toBeNull()
  })

  it('sets placeholder', () => {
    const { input } = createPasswordField({ placeholder: 'Enter password' })
    expect(input.placeholder).toBe('Enter password')
  })

  it('sets required attribute', () => {
    const { input } = createPasswordField({ required: true })
    expect(input.required).toBe(true)
  })

  it('toggle button switches visibility', () => {
    const { container, input } = createPasswordField()
    const toggleBtn = container.querySelector('.osx-password-toggle') as HTMLButtonElement
    expect(input.type).toBe('password')

    toggleBtn.click()
    expect(input.type).toBe('text')

    toggleBtn.click()
    expect(input.type).toBe('password')
  })

  it('has aria-label on toggle button', () => {
    const { container } = createPasswordField()
    const toggleBtn = container.querySelector('.osx-password-toggle')
    expect(toggleBtn!.getAttribute('aria-label')).toBe('Toggle password visibility')
  })
})
