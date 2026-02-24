import { describe, it, expect, vi } from 'vitest'
import { createTabs } from '../tabs.js'

describe('createTabs', () => {
  const baseTabs = [
    { id: 'tab1', label: 'Tab 1', content: 'Content 1' },
    { id: 'tab2', label: 'Tab 2', content: 'Content 2' },
    { id: 'tab3', label: 'Tab 3', content: 'Content 3' }
  ]

  it('creates tab container with nav and content', () => {
    const { container } = createTabs({ tabs: baseTabs })
    expect(container.className).toBe('osx-tabs')
    expect(container.querySelector('.osx-tabs-nav')).not.toBeNull()
    expect(container.querySelector('.osx-tabs-content')).not.toBeNull()
  })

  it('renders all tab buttons', () => {
    const { container } = createTabs({ tabs: baseTabs })
    const buttons = container.querySelectorAll('.osx-tabs-tab')
    expect(buttons.length).toBe(3)
  })

  it('activates first tab by default', () => {
    const { container, getActiveTab } = createTabs({ tabs: baseTabs })
    expect(getActiveTab()).toBe('tab1')
    const firstBtn = container.querySelector('.osx-tabs-tab')
    expect(firstBtn!.classList.contains('active')).toBe(true)
  })

  it('activates specified tab', () => {
    const { getActiveTab } = createTabs({ tabs: baseTabs, activeTab: 'tab2' })
    expect(getActiveTab()).toBe('tab2')
  })

  it('shows only active tab panel', () => {
    const { container } = createTabs({ tabs: baseTabs, activeTab: 'tab2' })
    const panels = container.querySelectorAll('.osx-tabs-panel') as NodeListOf<HTMLElement>
    expect(panels[0].style.display).toBe('none')
    expect(panels[1].style.display).not.toBe('none')
    expect(panels[2].style.display).toBe('none')
  })

  it('setActiveTab() switches active tab', () => {
    const { container, setActiveTab, getActiveTab } = createTabs({ tabs: baseTabs })
    setActiveTab('tab3')
    expect(getActiveTab()).toBe('tab3')

    const panels = container.querySelectorAll('.osx-tabs-panel') as NodeListOf<HTMLElement>
    expect(panels[0].style.display).toBe('none')
    expect(panels[2].style.display).toBe('block')
  })

  it('calls onChange when tab is clicked', () => {
    const onChange = vi.fn()
    const { container } = createTabs({ tabs: baseTabs, onChange })
    const buttons = container.querySelectorAll('.osx-tabs-tab')
    ;(buttons[1] as HTMLElement).click()
    expect(onChange).toHaveBeenCalledWith('tab2')
  })

  it('renders HTMLElement content', () => {
    const el = document.createElement('div')
    el.textContent = 'Custom'
    const { container } = createTabs({
      tabs: [{ id: 't1', label: 'T1', content: el }]
    })
    const panel = container.querySelector('.osx-tabs-panel')
    expect(panel!.contains(el)).toBe(true)
  })
})
