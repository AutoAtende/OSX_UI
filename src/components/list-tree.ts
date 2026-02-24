export interface ListItem {
  id: string
  label: string
  icon?: string
  action?: () => void
}

export interface ListOptions {
  items: ListItem[]
  onItemClick?: (item: ListItem) => void
}

export interface ListResult {
  container: HTMLElement
  setItems: (items: ListItem[]) => void
  getItems: () => ListItem[]
}

export function createList(opts: ListOptions): ListResult {
  const container = document.createElement('div')
  container.className = 'osx-list'

  function render(items: ListItem[]) {
    container.innerHTML = ''

    for (const item of items) {
      const itemEl = document.createElement('button')
      itemEl.className = 'osx-list-item'

      if (item.icon) {
        const icon = document.createElement('span')
        icon.className = 'osx-list-item-icon'
        icon.innerHTML = item.icon
        itemEl.appendChild(icon)
      }

      const label = document.createElement('span')
      label.className = 'osx-list-item-label'
      label.textContent = item.label
      itemEl.appendChild(label)

      itemEl.addEventListener('click', () => {
        if (item.action) item.action()
        if (opts.onItemClick) opts.onItemClick(item)
      })

      container.appendChild(itemEl)
    }
  }

  render(opts.items)

  return {
    container,
    setItems(items: ListItem[]) {
      render(items)
    },
    getItems() {
      return opts.items
    }
  }
}

export interface TreeNode {
  id: string
  label: string
  icon?: string
  children?: TreeNode[]
  expanded?: boolean
}

export interface TreeOptions {
  data: TreeNode[]
  onNodeClick?: (node: TreeNode) => void
}

export interface TreeResult {
  container: HTMLElement
}

export function createTree(opts: TreeOptions): TreeResult {
  const container = document.createElement('div')
  container.className = 'osx-tree'

  function renderNode(node: TreeNode, level = 0): HTMLElement {
    const nodeEl = document.createElement('div')
    nodeEl.className = 'osx-tree-node'
    nodeEl.style.paddingLeft = `${level * 16}px`

    const row = document.createElement('button')
    row.className = 'osx-tree-row'

    if (node.children && node.children.length > 0) {
      const toggle = document.createElement('span')
      toggle.className = `osx-tree-toggle ${node.expanded ? 'expanded' : ''}`
      toggle.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>'
      row.appendChild(toggle)
    }

    if (node.icon) {
      const icon = document.createElement('span')
      icon.className = 'osx-tree-icon'
      icon.innerHTML = node.icon
      row.appendChild(icon)
    }

    const label = document.createElement('span')
    label.className = 'osx-tree-label'
    label.textContent = node.label
    row.appendChild(label)

    row.addEventListener('click', () => {
      if (node.children && node.children.length > 0) {
        node.expanded = !node.expanded
        render()
      }
      if (opts.onNodeClick) opts.onNodeClick(node)
    })

    nodeEl.appendChild(row)

    if (node.children && node.expanded) {
      const childrenContainer = document.createElement('div')
      childrenContainer.className = 'osx-tree-children'
      for (const child of node.children) {
        childrenContainer.appendChild(renderNode(child, level + 1))
      }
      nodeEl.appendChild(childrenContainer)
    }

    return nodeEl
  }

  function render() {
    container.innerHTML = ''
    for (const node of opts.data) {
      container.appendChild(renderNode(node))
    }
  }

  render()

  return { container }
}
