import { describe, it, expect } from 'vitest'
import { createFileUpload } from '../file-upload.js'

describe('createFileUpload', () => {
  it('creates file upload container', () => {
    const { container } = createFileUpload()
    expect(container.className).toBe('osx-fileupload')
  })

  it('creates hidden file input', () => {
    const { input } = createFileUpload()
    expect(input.type).toBe('file')
  })

  it('sets accept attribute', () => {
    const { input } = createFileUpload({ accept: '.pdf,.doc' })
    expect(input.accept).toBe('.pdf,.doc')
  })

  it('sets multiple attribute', () => {
    const { input } = createFileUpload({ multiple: true })
    expect(input.multiple).toBe(true)
  })

  it('renders dropzone', () => {
    const { container } = createFileUpload()
    expect(container.querySelector('.osx-fileupload-dropzone')).not.toBeNull()
  })

  it('renders upload icon and text', () => {
    const { container } = createFileUpload()
    expect(container.querySelector('.osx-fileupload-icon')).not.toBeNull()
    expect(container.querySelector('.osx-fileupload-text')).not.toBeNull()
  })

  it('getFiles() returns empty array initially', () => {
    const { getFiles } = createFileUpload()
    expect(getFiles()).toEqual([])
  })

  it('dragover adds dragover class', () => {
    const { container } = createFileUpload()
    const dropzone = container.querySelector('.osx-fileupload-dropzone') as HTMLElement
    dropzone.dispatchEvent(new Event('dragover', { bubbles: true }))
    expect(dropzone.classList.contains('dragover')).toBe(true)
  })

  it('dragleave removes dragover class', () => {
    const { container } = createFileUpload()
    const dropzone = container.querySelector('.osx-fileupload-dropzone') as HTMLElement
    dropzone.dispatchEvent(new Event('dragover', { bubbles: true }))
    dropzone.dispatchEvent(new Event('dragleave'))
    expect(dropzone.classList.contains('dragover')).toBe(false)
  })
})
