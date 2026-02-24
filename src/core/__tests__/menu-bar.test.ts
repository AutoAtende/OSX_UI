import { describe, it, expect, vi, afterEach } from 'vitest'
import { MenuBar } from '../menu-bar.js'

describe('MenuBar', () => {
  afterEach(() => {
    document.body.innerHTML = ''
    vi.restoreAllMocks()
  })

  const baseConfig = {
    appName: 'TestApp',
    icon: '<svg></svg>',
    menus: [
      {
        id: 'file',
        label: 'File',
        items: [
          { label: 'New', action: vi.fn() },
          { type: 'separator' as const },
          { label: 'Quit', action: vi.fn() }
        ]
      },
      {
        id: 'edit',
        label: 'Edit',
        items: [{ label: 'Copy', shortcut: '⌘C', action: vi.fn() }]
      }
    ],
    showClock: false
  }

  it('creates menu bar element', () => {
    const menuBar = new MenuBar(baseConfig)
    menuBar.init()
    expect(document.querySelector('.osx-menu-bar')).not.toBeNull()
    menuBar.destroy()
  })

  it('renders app name', () => {
    const menuBar = new MenuBar(baseConfig)
    menuBar.init()
    const appName = document.querySelector('.osx-menu-bar-app')
    expect(appName!.textContent).toBe('TestApp')
    menuBar.destroy()
  })

  it('renders menu buttons', () => {
    const menuBar = new MenuBar(baseConfig)
    menuBar.init()
    const items = document.querySelectorAll('.osx-menu-bar-item')
    expect(items.length).toBe(2)
    expect(items[0].textContent).toBe('File')
    menuBar.destroy()
  })

  it('openDropdown() shows menu items', () => {
    const menuBar = new MenuBar(baseConfig)
    menuBar.init()
    menuBar.openDropdown('file')
    const dropdown = document.querySelector('.osx-menu-bar-dropdown') as HTMLElement
    expect(dropdown.style.display).not.toBe('none')
    const items = dropdown.querySelectorAll('.osx-dropdown-item')
    expect(items.length).toBe(2) // New and Quit (separator is not a dropdown-item)
    menuBar.destroy()
  })

  it('closeDropdown() hides dropdown', () => {
    const menuBar = new MenuBar(baseConfig)
    menuBar.init()
    menuBar.openDropdown('file')
    menuBar.closeDropdown()
    const dropdown = document.querySelector('.osx-menu-bar-dropdown') as HTMLElement
    expect(dropdown.style.display).toBe('none')
    menuBar.destroy()
  })

  it('getMenuConfig() returns menu config', () => {
    const menuBar = new MenuBar(baseConfig)
    const config = menuBar.getMenuConfig('file')
    expect(config).not.toBeUndefined()
    expect(config!.label).toBe('File')
  })

  it('getMenuConfig() returns undefined for unknown menu', () => {
    const menuBar = new MenuBar(baseConfig)
    expect(menuBar.getMenuConfig('unknown')).toBeUndefined()
  })

  it('updateAuthDisplay() updates auth button text', () => {
    const menuBar = new MenuBar(baseConfig)
    menuBar.init()
    menuBar.updateAuthDisplay('John Doe')
    const authBtn = document.querySelector('.osx-menu-bar-auth')
    expect(authBtn!.textContent).toBe('John Doe')
    menuBar.destroy()
  })

  it('destroy() removes elements', () => {
    const menuBar = new MenuBar(baseConfig)
    menuBar.init()
    menuBar.destroy()
    expect(document.querySelector('.osx-menu-bar')).toBeNull()
  })

  it('renders separator in dropdown', () => {
    const menuBar = new MenuBar(baseConfig)
    menuBar.init()
    menuBar.openDropdown('file')
    const dropdown = document.querySelector('.osx-menu-bar-dropdown')
    expect(dropdown!.querySelector('.osx-dropdown-separator')).not.toBeNull()
    menuBar.destroy()
  })

  it('renders shortcut in menu item', () => {
    const menuBar = new MenuBar(baseConfig)
    menuBar.init()
    menuBar.openDropdown('edit')
    const shortcut = document.querySelector('.osx-dropdown-shortcut')
    expect(shortcut!.textContent).toBe('⌘C')
    menuBar.destroy()
  })
})
