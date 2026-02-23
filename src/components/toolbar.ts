export function createToolbar(children?: HTMLElement[]): HTMLElement {
  const toolbar = document.createElement('div');
  toolbar.className = 'osx-toolbar';

  if (children) {
    for (const child of children) {
      toolbar.appendChild(child);
    }
  }

  return toolbar;
}
