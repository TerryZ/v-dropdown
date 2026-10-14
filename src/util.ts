import type { DropdownElementRect } from './types'

function isHidden(el: HTMLElement) {
  return window.getComputedStyle(el).display === 'none'
}

function getRect(el: HTMLElement): DropdownElementRect {
  // 通过 getComputedStyle(el).width 获得的值更精准，精确到小数点后三位
  const rect = el.getBoundingClientRect()
  return {
    width: el.offsetWidth,
    height: el.offsetHeight,
    top: rect.top,
    left: rect.left
  }
}
export function getElementRect(el: HTMLElement | null): DropdownElementRect {
  if (!el) {
    return {
      width: 0,
      height: 0,
      top: 0,
      left: 0
    }
  }
  if (isHidden(el)) {
    // 防止空间占用时，内容超出边界，导致出现不应出现的滚动条
    el.style.left = '10px'
    el.style.top = '10px'
    /**
     * change the way to hide dropdown container from
     * 'display:none' to 'visibility:hidden'
     * be used for get width and height
     */
    el.style.visibility = 'hidden'
    el.style.display = 'inline-flex'

    const rect = getRect(el)
    /**
     * restore style after getting position data
     */
    el.style.visibility = 'visible'
    el.style.display = 'none'
    el.style.left = ''
    el.style.top = ''
    return rect
  }
  return getRect(el)
}
