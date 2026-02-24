export interface TableColumn {
  key: string
  label: string
  sortable?: boolean
  width?: string
}

export interface TableOptions {
  columns: TableColumn[]
  data: Record<string, unknown>[]
  pageSize?: number
  onRowClick?: (row: Record<string, unknown>, index: number) => void
}

export interface TableResult {
  container: HTMLElement
  setData: (data: Record<string, unknown>[]) => void
  getData: () => Record<string, unknown>[]
  sort: (key: string) => void
}

export function createTable(opts: TableOptions): TableResult {
  if (!opts.columns || opts.columns.length === 0) {
    throw new Error('createTable: columns array is required and must not be empty')
  }
  if (!opts.data) {
    throw new Error('createTable: data array is required')
  }

  const container = document.createElement('div')
  container.className = 'osx-table-container'

  const pageSize = opts.pageSize || 10
  let currentPage = 1
  let sortKey: string | null = null
  let sortDir: 'asc' | 'desc' = 'asc'
  let displayData = [...opts.data]

  const table = document.createElement('table')
  table.className = 'osx-table'

  const thead = document.createElement('thead')
  const headerRow = document.createElement('tr')

  for (const col of opts.columns) {
    const th = document.createElement('th')
    th.textContent = col.label
    th.style.width = col.width || 'auto'

    if (col.sortable) {
      th.className = 'sortable'
      th.setAttribute('aria-sort', 'none')
      th.style.cursor = 'pointer'
      th.tabIndex = 0
      th.addEventListener('click', () => {
        if (sortKey === col.key) {
          sortDir = sortDir === 'asc' ? 'desc' : 'asc'
        } else {
          sortKey = col.key
          sortDir = 'asc'
        }
        sortKey = col.key
        updateSortAria()
        renderBody()
      })
      th.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          th.click()
        }
      })
    }

    headerRow.appendChild(th)
  }

  thead.appendChild(headerRow)
  table.appendChild(thead)

  function updateSortAria() {
    headerRow.querySelectorAll('th.sortable').forEach((th) => {
      const el = th as HTMLElement
      const key = opts.columns.find((c) => c.label === el.textContent)?.key
      if (key === sortKey) {
        el.setAttribute('aria-sort', sortDir === 'asc' ? 'ascending' : 'descending')
      } else {
        el.setAttribute('aria-sort', 'none')
      }
    })
  }

  const tbody = document.createElement('tbody')

  function renderBody() {
    tbody.innerHTML = ''

    const sortedData = [...displayData]
    if (sortKey) {
      sortedData.sort((a, b) => {
        const aVal = a[sortKey!]
        const bVal = b[sortKey!]
        if (aVal === bVal) return 0
        const cmp = aVal! < bVal! ? -1 : 1
        return sortDir === 'asc' ? cmp : -cmp
      })
    }

    const start = (currentPage - 1) * pageSize
    const pageData = sortedData.slice(start, start + pageSize)

    for (let i = 0; i < pageData.length; i++) {
      const row = pageData[i]
      const tr = document.createElement('tr')

      if (opts.onRowClick) {
        tr.style.cursor = 'pointer'
        tr.addEventListener('click', () => opts.onRowClick!(row, start + i))
      }

      for (const col of opts.columns) {
        const td = document.createElement('td')
        const val = row[col.key]
        td.textContent = val !== undefined ? String(val) : ''
        tr.appendChild(td)
      }

      tbody.appendChild(tr)
    }
  }

  table.appendChild(tbody)
  container.appendChild(table)

  const pagination = document.createElement('div')
  pagination.className = 'osx-table-pagination'

  function renderPagination() {
    pagination.innerHTML = ''

    const totalPages = Math.ceil(displayData.length / pageSize)

    const prevBtn = document.createElement('button')
    prevBtn.className = 'osx-table-page-btn'
    prevBtn.textContent = 'Prev'
    prevBtn.setAttribute('aria-label', 'Previous page')
    prevBtn.disabled = currentPage === 1
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--
        renderBody()
        renderPagination()
      }
    })

    const pageInfo = document.createElement('span')
    pageInfo.className = 'osx-table-page-info'
    pageInfo.textContent = `${currentPage} / ${totalPages}`

    const nextBtn = document.createElement('button')
    nextBtn.className = 'osx-table-page-btn'
    nextBtn.textContent = 'Next'
    nextBtn.setAttribute('aria-label', 'Next page')
    nextBtn.disabled = currentPage === totalPages
    nextBtn.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++
        renderBody()
        renderPagination()
      }
    })

    pagination.appendChild(prevBtn)
    pagination.appendChild(pageInfo)
    pagination.appendChild(nextBtn)
  }

  container.appendChild(pagination)

  renderBody()
  renderPagination()

  return {
    container,
    setData(data: Record<string, unknown>[]) {
      displayData = [...data]
      currentPage = 1
      renderBody()
      renderPagination()
    },
    getData() {
      return displayData
    },
    sort(key: string) {
      sortKey = key
      sortDir = sortDir === 'asc' ? 'desc' : 'asc'
    }
  }
}
