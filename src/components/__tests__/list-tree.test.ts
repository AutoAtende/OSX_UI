import { describe, it, expect, vi } from 'vitest'
import { createList, createTree } from '../list-tree.js'

describe('createList', () => {
  const items = [
    { id: '1', label: 'Item 1' },
    { id: '2', label: 'Item 2' },
    { id: '3', label: 'Item 3' }
  ]

  it('creates list container', () => {
    const { container } = createList({ items })
    expect(container.className).toBe('osx-list')
  })

  it('renders all items', () => {
    const { container } = createList({ items })
    expect(container.querySelectorAll('.osx-list-item').length).toBe(3)
  })

  it('renders labels', () => {
    const { container } = createList({ items })
    const labels = container.querySelectorAll('.osx-list-item-label')
    expect(labels[0].textContent).toBe('Item 1')
  })

  it('renders icon when provided', () => {
    const itemsWithIcon = [{ id: '1', label: 'With icon', icon: '<svg></svg>' }]
    const { container } = createList({ items: itemsWithIcon })
    expect(container.querySelector('.osx-list-item-icon')).not.toBeNull()
  })

  it('calls item action on click', () => {
    const action = vi.fn()
    const { container } = createList({
      items: [{ id: '1', label: 'Click me', action }]
    })
    const item = container.querySelector('.osx-list-item') as HTMLElement
    item.click()
    expect(action).toHaveBeenCalledOnce()
  })

  it('calls onItemClick on click', () => {
    const onItemClick = vi.fn()
    const { container } = createList({ items, onItemClick })
    const item = container.querySelector('.osx-list-item') as HTMLElement
    item.click()
    expect(onItemClick).toHaveBeenCalledWith(items[0])
  })

  it('setItems() replaces items', () => {
    const result = createList({ items })
    result.setItems([{ id: '4', label: 'New' }])
    expect(result.container.querySelectorAll('.osx-list-item').length).toBe(1)
  })

  it('getItems() returns original items', () => {
    const result = createList({ items })
    expect(result.getItems()).toBe(items)
  })
})

describe('createTree', () => {
  const data = [
    {
      id: 'root',
      label: 'Root',
      children: [
        { id: 'child1', label: 'Child 1' },
        { id: 'child2', label: 'Child 2' }
      ]
    }
  ]

  it('creates tree container', () => {
    const { container } = createTree({ data })
    expect(container.className).toBe('osx-tree')
  })

  it('renders root nodes', () => {
    const { container } = createTree({ data })
    const rows = container.querySelectorAll('.osx-tree-row')
    expect(rows.length).toBe(1) // Only root visible when collapsed
  })

  it('renders toggle for nodes with children', () => {
    const { container } = createTree({ data })
    const toggle = container.querySelector('.osx-tree-toggle')
    expect(toggle).not.toBeNull()
  })

  it('shows children when expanded', () => {
    const expandedData = [
      {
        id: 'root',
        label: 'Root',
        expanded: true,
        children: [
          { id: 'child1', label: 'Child 1' },
          { id: 'child2', label: 'Child 2' }
        ]
      }
    ]
    const { container } = createTree({ data: expandedData })
    const rows = container.querySelectorAll('.osx-tree-row')
    expect(rows.length).toBe(3)
  })

  it('clicking node toggles expansion', () => {
    const { container } = createTree({ data })
    const row = container.querySelector('.osx-tree-row') as HTMLElement
    row.click()
    const rows = container.querySelectorAll('.osx-tree-row')
    expect(rows.length).toBe(3)
  })

  it('calls onNodeClick', () => {
    const onNodeClick = vi.fn()
    const { container } = createTree({ data, onNodeClick })
    const row = container.querySelector('.osx-tree-row') as HTMLElement
    row.click()
    expect(onNodeClick).toHaveBeenCalledWith(data[0])
  })

  it('renders node label', () => {
    const { container } = createTree({ data })
    const label = container.querySelector('.osx-tree-label')
    expect(label!.textContent).toBe('Root')
  })
})
