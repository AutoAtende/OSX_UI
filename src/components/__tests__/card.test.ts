import { describe, it, expect } from 'vitest'
import { createCard } from '../card.js'

describe('createCard', () => {
  it('creates a card element', () => {
    const card = createCard()
    expect(card.className).toBe('osx-card')
  })

  it('adds custom className', () => {
    const card = createCard({ className: 'my-card' })
    expect(card.classList.contains('osx-card')).toBe(true)
    expect(card.classList.contains('my-card')).toBe(true)
  })

  it('renders string header', () => {
    const card = createCard({ header: '<strong>Title</strong>' })
    const hd = card.querySelector('.osx-card-hd')
    expect(hd).not.toBeNull()
    expect(hd!.innerHTML).toBe('<strong>Title</strong>')
  })

  it('renders HTMLElement header', () => {
    const h2 = document.createElement('h2')
    h2.textContent = 'Title'
    const card = createCard({ header: h2 })
    const hd = card.querySelector('.osx-card-hd')
    expect(hd!.contains(h2)).toBe(true)
  })

  it('renders string body', () => {
    const card = createCard({ body: 'Body content' })
    const bd = card.querySelector('.osx-card-bd')
    expect(bd).not.toBeNull()
    expect(bd!.innerHTML).toBe('Body content')
  })

  it('renders HTMLElement body', () => {
    const p = document.createElement('p')
    p.textContent = 'Paragraph'
    const card = createCard({ body: p })
    const bd = card.querySelector('.osx-card-bd')
    expect(bd!.contains(p)).toBe(true)
  })

  it('renders without header or body', () => {
    const card = createCard()
    expect(card.querySelector('.osx-card-hd')).toBeNull()
    expect(card.querySelector('.osx-card-bd')).toBeNull()
  })
})
