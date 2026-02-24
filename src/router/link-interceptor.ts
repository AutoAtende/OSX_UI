export class LinkInterceptor {
  private container: HTMLElement
  private navigate: (path: string) => void
  private handler: (e: Event) => void

  constructor(container: HTMLElement, navigate: (path: string) => void) {
    this.container = container
    this.navigate = navigate

    this.handler = (e: Event) => {
      const target = e.target as HTMLElement
      const a = target.closest('a[href]') as HTMLAnchorElement | null
      if (a && a.href.startsWith(location.origin)) {
        e.preventDefault()
        this.navigate(new URL(a.href).pathname)
      }
    }

    this.container.addEventListener('click', this.handler)
  }

  destroy(): void {
    this.container.removeEventListener('click', this.handler)
  }
}
