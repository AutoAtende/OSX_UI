export function createDesktop(container: HTMLElement, background?: string): HTMLElement {
  const desktop = document.createElement('div');
  desktop.className = 'osx-desktop';
  if (background) {
    desktop.style.background = background;
  }
  container.appendChild(desktop);
  return desktop;
}
