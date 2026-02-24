import { describe, it, expect } from 'vitest'
import { createAccordion } from '../accordion.js'

describe('createAccordion', () => {
  const items = [
    { id: 'a1', title: 'Section 1', content: 'Content 1' },
    { id: 'a2', title: 'Section 2', content: 'Content 2' },
    { id: 'a3', title: 'Section 3', content: 'Content 3' }
  ]

  it('creates accordion container', () => {
    const { container } = createAccordion({ items })
    expect(container.className).toBe('osx-accordion')
  })

  it('renders all items', () => {
    const { container } = createAccordion({ items })
    const headers = container.querySelectorAll('.osx-accordion-header')
    expect(headers.length).toBe(3)
  })

  it('all items start closed', () => {
    const { container } = createAccordion({ items })
    const contents = container.querySelectorAll('.osx-accordion-content') as NodeListOf<HTMLElement>
    for (const c of contents) {
      expect(c.style.maxHeight).toBe('')
    }
  })

  it('open() sets maxHeight on content', () => {
    const { open, container } = createAccordion({ items })
    open('a1')
    const icon = container.querySelector('.osx-accordion-icon')
    expect(icon!.classList.contains('open')).toBe(true)
  })

  it('close() resets maxHeight', () => {
    const { open, close, container } = createAccordion({ items })
    open('a1')
    close('a1')
    const icon = container.querySelector('.osx-accordion-icon')
    expect(icon!.classList.contains('open')).toBe(false)
  })

  it('toggle() opens and closes', () => {
    const result = createAccordion({ items })
    result.toggle('a1')
    const icon = result.container.querySelector('.osx-accordion-icon')
    expect(icon!.classList.contains('open')).toBe(true)
    result.toggle('a1')
    expect(icon!.classList.contains('open')).toBe(false)
  })

  it('renders string content', () => {
    const { container } = createAccordion({ items })
    const content = container.querySelector('.osx-accordion-content')
    expect(content!.innerHTML).toBe('Content 1')
  })

  it('renders HTMLElement content', () => {
    const el = document.createElement('p')
    el.textContent = 'Custom'
    const { container } = createAccordion({
      items: [{ id: 'x', title: 'X', content: el }]
    })
    const content = container.querySelector('.osx-accordion-content')
    expect(content!.contains(el)).toBe(true)
  })

  it('single mode: opening one closes others on click', () => {
    const { container } = createAccordion({ items })
    const headers = container.querySelectorAll('.osx-accordion-header')

    ;(headers[0] as HTMLElement).click()
    const icon0 = headers[0].querySelector('.osx-accordion-icon')
    expect(icon0!.classList.contains('open')).toBe(true)
    ;(headers[1] as HTMLElement).click()
    expect(icon0!.classList.contains('open')).toBe(false)
    const icon1 = headers[1].querySelector('.osx-accordion-icon')
    expect(icon1!.classList.contains('open')).toBe(true)
  })

  it('allowMultiple: multiple can be open', () => {
    const { container } = createAccordion({ items, allowMultiple: true })
    const headers = container.querySelectorAll('.osx-accordion-header')

    ;(headers[0] as HTMLElement).click()
    ;(headers[1] as HTMLElement).click()

    const icon0 = headers[0].querySelector('.osx-accordion-icon')
    const icon1 = headers[1].querySelector('.osx-accordion-icon')
    expect(icon0!.classList.contains('open')).toBe(true)
    expect(icon1!.classList.contains('open')).toBe(true)
  })
})
