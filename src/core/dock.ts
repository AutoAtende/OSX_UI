export class Dock {
  private el: HTMLElement;
  private onRestore: (id: string) => void;

  constructor(container: HTMLElement, onRestore: (id: string) => void) {
    this.el = document.createElement('div');
    this.el.className = 'osx-dock';
    container.appendChild(this.el);
    this.onRestore = onRestore;
  }

  addItem(id: string, title: string): void {
    const item = document.createElement('div');
    item.className = 'osx-dock-item';
    item.dataset.dockId = id;
    item.textContent = title.length > 20 ? title.slice(0, 18) + '...' : title;
    item.addEventListener('click', () => this.onRestore(id));
    this.el.appendChild(item);
  }

  removeItem(id: string): void {
    const item = this.el.querySelector(`[data-dock-id="${id}"]`);
    if (item) item.remove();
  }

  destroy(): void {
    this.el.remove();
  }
}
