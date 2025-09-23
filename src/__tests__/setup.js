// import ResizeObserver from 'resize-observer-polyfill'
// global.ResizeObserver = ResizeObserver
import { vi } from 'vitest'

class MockResizeObserver {
  _callback

  constructor (callback) {
    this._callback = callback
  }

  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()

  // 提供一个方法方便测试时手动触发
  __trigger (entries) {
    this._callback(entries, this)
  }
}

class IntersectionObserver {
  callback
  elements = []

  constructor (callback) {
    this.callback = callback
  }

  observe = (element) => {
    this.elements.push(element)
  }

  unobserve = (element) => {
    this.elements = this.elements.filter(el => el !== element)
  }

  disconnect = () => {
    this.elements = []
  }

  // 手动触发回调
  trigger = (entries) => {
    this.callback(entries, this)
  }
}

// 全局替换
// vi.stubGlobal('ResizeObserver', ResizeObserver)
// vi.stubGlobal('ResizeObserver', ResizeObserver)
vi.stubGlobal('ResizeObserver', vi.fn().mockImplementation((callback) => {
  return new MockResizeObserver(callback)
}))

global.ResizeObserver = MockResizeObserver
global.IntersectionObserver = IntersectionObserver
