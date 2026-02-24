export interface CardOptions {
  header?: string | HTMLElement
  body?: string | HTMLElement
  className?: string
}

export function createCard(opts: CardOptions = {}): HTMLElement {
  const card = document.createElement('div')
  card.className = 'osx-card'
  if (opts.className) card.classList.add(opts.className)

  if (opts.header) {
    const hd = document.createElement('div')
    hd.className = 'osx-card-hd'
    if (typeof opts.header === 'string') {
      hd.innerHTML = opts.header
    } else {
      hd.appendChild(opts.header)
    }
    card.appendChild(hd)
  }

  if (opts.body) {
    const bd = document.createElement('div')
    bd.className = 'osx-card-bd'
    if (typeof opts.body === 'string') {
      bd.innerHTML = opts.body
    } else {
      bd.appendChild(opts.body)
    }
    card.appendChild(bd)
  }

  return card
}
