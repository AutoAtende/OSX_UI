import { describe, it, expect, vi } from 'vitest'
import { createTable } from '../table.js'

describe('createTable', () => {
  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'age', label: 'Age', sortable: true },
    { key: 'email', label: 'Email' }
  ]

  const data = [
    { name: 'Alice', age: 30, email: 'alice@test.com' },
    { name: 'Bob', age: 25, email: 'bob@test.com' },
    { name: 'Charlie', age: 35, email: 'charlie@test.com' }
  ]

  it('creates table container', () => {
    const { container } = createTable({ columns, data })
    expect(container.className).toBe('osx-table-container')
  })

  it('renders header columns', () => {
    const { container } = createTable({ columns, data })
    const ths = container.querySelectorAll('th')
    expect(ths.length).toBe(3)
    expect(ths[0].textContent).toBe('Name')
    expect(ths[1].textContent).toBe('Age')
  })

  it('renders data rows', () => {
    const { container } = createTable({ columns, data })
    const rows = container.querySelectorAll('tbody tr')
    expect(rows.length).toBe(3)
  })

  it('renders cell values', () => {
    const { container } = createTable({ columns, data })
    const firstRow = container.querySelector('tbody tr')
    const cells = firstRow!.querySelectorAll('td')
    expect(cells[0].textContent).toBe('Alice')
    expect(cells[1].textContent).toBe('30')
  })

  it('sortable columns have sortable class', () => {
    const { container } = createTable({ columns, data })
    const ths = container.querySelectorAll('th')
    expect(ths[0].classList.contains('sortable')).toBe(true)
    expect(ths[2].classList.contains('sortable')).toBe(false)
  })

  it('clicking sortable header sorts data', () => {
    const { container } = createTable({ columns, data })
    const nameHeader = container.querySelector('th.sortable') as HTMLElement
    nameHeader.click()
    const rows = container.querySelectorAll('tbody tr')
    const firstCell = rows[0].querySelector('td')
    expect(firstCell!.textContent).toBe('Alice')
  })

  it('setData() updates table data', () => {
    const result = createTable({ columns, data })
    result.setData([{ name: 'Dave', age: 40, email: 'dave@test.com' }])
    const rows = result.container.querySelectorAll('tbody tr')
    expect(rows.length).toBe(1)
    expect(rows[0].querySelector('td')!.textContent).toBe('Dave')
  })

  it('getData() returns current data', () => {
    const result = createTable({ columns, data })
    expect(result.getData().length).toBe(3)
  })

  it('pagination renders when needed', () => {
    const bigData = Array.from({ length: 25 }, (_, i) => ({
      name: `User ${i}`,
      age: 20 + i,
      email: `user${i}@test.com`
    }))
    const { container } = createTable({ columns, data: bigData, pageSize: 10 })
    const pagination = container.querySelector('.osx-table-pagination')
    expect(pagination).not.toBeNull()
    const rows = container.querySelectorAll('tbody tr')
    expect(rows.length).toBe(10)
  })

  it('onRowClick callback fires', () => {
    const onRowClick = vi.fn()
    const { container } = createTable({ columns, data, onRowClick })
    const row = container.querySelector('tbody tr') as HTMLElement
    row.click()
    expect(onRowClick).toHaveBeenCalledWith(data[0], 0)
  })

  it('handles undefined cell values', () => {
    const { container } = createTable({
      columns: [{ key: 'x', label: 'X' }],
      data: [{ y: 'val' }]
    })
    const cell = container.querySelector('tbody td')
    expect(cell!.textContent).toBe('')
  })

  it('throws on empty columns', () => {
    expect(() => createTable({ columns: [], data: [] })).toThrow('columns array is required')
  })
})
