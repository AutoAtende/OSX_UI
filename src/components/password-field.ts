const EYE_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
  <circle cx="12" cy="12" r="3"/>
</svg>`

const EYE_OFF_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
  <line x1="1" y1="1" x2="23" y2="23"/>
</svg>`

export interface PasswordFieldOptions {
  label?: string
  name?: string
  placeholder?: string
  autocomplete?: string
  required?: boolean
}

export interface PasswordFieldResult {
  container: HTMLElement
  input: HTMLInputElement
}

export function createPasswordField(opts: PasswordFieldOptions = {}): PasswordFieldResult {
  const container = document.createElement('div')
  container.className = 'osx-field'

  if (opts.label) {
    const label = document.createElement('label')
    label.textContent = opts.label
    container.appendChild(label)
  }

  const wrapper = document.createElement('div')
  wrapper.className = 'osx-password-wrapper'

  const input = document.createElement('input')
  input.type = 'password'
  input.name = opts.name || 'password'
  if (opts.placeholder) input.placeholder = opts.placeholder
  if (opts.autocomplete) input.autocomplete = opts.autocomplete as AutoFill
  if (opts.required) input.required = true
  wrapper.appendChild(input)

  const toggleBtn = document.createElement('button')
  toggleBtn.type = 'button'
  toggleBtn.className = 'osx-password-toggle'
  toggleBtn.setAttribute('aria-label', 'Toggle password visibility')

  const eyeSpan = document.createElement('span')
  eyeSpan.innerHTML = EYE_SVG
  const eyeOffSpan = document.createElement('span')
  eyeOffSpan.innerHTML = EYE_OFF_SVG
  eyeOffSpan.style.display = 'none'

  toggleBtn.appendChild(eyeSpan)
  toggleBtn.appendChild(eyeOffSpan)
  wrapper.appendChild(toggleBtn)

  toggleBtn.addEventListener('click', () => {
    if (input.type === 'password') {
      input.type = 'text'
      eyeSpan.style.display = 'none'
      eyeOffSpan.style.display = ''
    } else {
      input.type = 'password'
      eyeSpan.style.display = ''
      eyeOffSpan.style.display = 'none'
    }
  })

  container.appendChild(wrapper)

  return { container, input }
}
