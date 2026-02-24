import { describe, it, expect } from 'vitest'
import { createField } from '../field.js'

describe('createField', () => {
  it('creates text input by default', () => {
    const { container, input } = createField({ label: 'Name', name: 'name' })
    expect(container.className).toBe('osx-field')
    expect(input).toBeInstanceOf(HTMLInputElement)
    expect((input as HTMLInputElement).type).toBe('text')
  })

  it('renders label', () => {
    const { container } = createField({ label: 'Email', name: 'email' })
    const label = container.querySelector('label')
    expect(label!.textContent).toBe('Email')
  })

  it('creates email input', () => {
    const { input } = createField({ label: 'Email', name: 'email', type: 'email' })
    expect((input as HTMLInputElement).type).toBe('email')
  })

  it('creates select element', () => {
    const { input } = createField({
      label: 'Country',
      name: 'country',
      type: 'select',
      options: [
        { value: 'us', label: 'United States' },
        { value: 'br', label: 'Brazil' }
      ]
    })
    expect(input).toBeInstanceOf(HTMLSelectElement)
    expect(input.querySelectorAll('option').length).toBe(2)
  })

  it('selects default value in select', () => {
    const { input } = createField({
      label: 'Country',
      name: 'country',
      type: 'select',
      value: 'br',
      options: [
        { value: 'us', label: 'United States' },
        { value: 'br', label: 'Brazil' }
      ]
    })
    expect((input as HTMLSelectElement).value).toBe('br')
  })

  it('creates textarea', () => {
    const { input } = createField({ label: 'Bio', name: 'bio', type: 'textarea' })
    expect(input).toBeInstanceOf(HTMLTextAreaElement)
  })

  it('sets placeholder', () => {
    const { input } = createField({ label: 'Name', name: 'name', placeholder: 'Enter name' })
    expect((input as HTMLInputElement).placeholder).toBe('Enter name')
  })

  it('sets value', () => {
    const { input } = createField({ label: 'Name', name: 'name', value: 'John' })
    expect(input.value).toBe('John')
  })

  it('sets required attribute', () => {
    const { input } = createField({ label: 'Name', name: 'name', required: true })
    expect((input as HTMLInputElement).required).toBe(true)
  })

  it('setInvalid() toggles invalid class', () => {
    const { input, setInvalid } = createField({ label: 'Name', name: 'name' })
    setInvalid(true)
    expect(input.classList.contains('invalid')).toBe(true)
    setInvalid(false)
    expect(input.classList.contains('invalid')).toBe(false)
  })
})
