import { ref, reactive, computed, h, onMounted, onBeforeUnmount, onUnmounted } from 'vue'
import './dropdown.sass'

export default {
  name: 'v-dropdown',
  props: {
    /** align direction */
    align: { type: String, default: 'left' },
    /**
     * dropdown layer embedded to page/component
     */
    embed: { type: Boolean, default: false },
    border: { type: Boolean, default: true },
    /**
     * mouse right click caller area to display dropdown
     */
    rightClick: { type: Boolean, default: false },
    /**
     * click caller and display dropdown, the
     * caller click again whether to close dropdown
     */
    toggle: { type: Boolean, default: true },
    /**
     * manual show / close the dropdown
     */
    manual: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    /**
     * open / close dropdown animation
     * true: use default animation
     * false: don't show animation
     * string value: customized animation
     */
    animated: { type: [String, Boolean], default: true },
    /**
     * the width of drop down menu
     * min-width: 80
     */
    width: Number,
    /**
     * container with
     * false: inline-block
     * true: block
     */
    fullWidth: { type: Boolean, default: false }
  },
  emits: ['show'],
  setup (props, { slots, emit }) {
    const show = ref(false)
    const styleSheet = reactive({ top: '', left: '' })
    const dropdownClass = ref('v-dropdown-container')
    const dropUp = ref(false)
    const x = ref(null)
    const y = ref(null)

    const animate = computed(() => {
      if (typeof props.animated === 'string') {
        return props.animated
      }
      if (!props.embed && props.animated) {
        return dropUp.value ? 'animate-up' : 'animate-down'
      }
      return ''
    })

    function visible (outside = false) {
      if (props.disabled) return
      /**
       * do not toggle show/close when 'toggle' option is set to false
       */
      if (show.value && !props.toggle && !outside) return
      /**
       * calculation display direction(up or down) and top axis
       */
      if (!show.value && !props.embed && 'caller' in slots) adjust()

      show.value = !show.value
      emit('show', show.value)
    }
    /**
     * the dropdown container outside click handle
     * @param e - MouseEvent
     */
    function whole (e) {
      if (!show.value) return
      /**
       * is caller element click
       */
      const inCaller = this.eventPath(e).findIndex(val => val === this.$el) !== -1
      /**
       * do not toggle show/close when 'toggle' option is set to false
       */
      if (inCaller && !props.toggle && !props.rightClick) return
      /**
       * close the dropdown when clicking outside the dropdown container
       * reopen the dropdown when right-click in caller(rightClick = true)
       */
      if (!inCaller || (inCaller && props.rightClick)) {
        visible(true)
      }
    }
    /**
     * adjust dropdown display position
     */
    function adjust () {
      const pos = this.$el.getBoundingClientRect()
      let menu = null

      if (this.show) menu = this.$refs.dropdown.getBoundingClientRect()
      else {
        /**
         * change the way to hide dropdown container from 'display:none' to 'visibility:hidden'
         * be used for get width and height
         */
        this.$refs.dropdown.style.visibility = 'hidden'
        this.$refs.dropdown.style.display = 'inline-block'
        menu = this.$refs.dropdown.getBoundingClientRect()
        /**
         * restore dropdown style after getting position data
         */
        this.$refs.dropdown.style.visibility = 'visible'
        this.$refs.dropdown.style.display = 'none'
      }

      this.adjustTop(pos, menu)
      this.styleSheet.left = `${this.adjustLeft(pos, menu)}px`
    }
    /**
     * calculation direction and top axis
     * @param pos
     * @param menu
     */
    function adjustTop (pos, menu) {
      const gap = 5
      const scrollTop = window.pageYOffset
      const viewHeight = document.documentElement.clientHeight
      const srcTop = this.rightClick ? this.y : pos.top + scrollTop
      let t = this.rightClick ? this.y : pos.top + pos.height + gap + scrollTop
      let overDown = false; let overUp = false; let up = false
      // list over screen
      if ((t + menu.height) > (scrollTop + viewHeight)) overDown = true
      if ((srcTop - gap - menu.height) < scrollTop) overUp = true

      if (!overUp && overDown) {
        t = srcTop - gap - menu.height
        up = true
      }
      this.dropUp = up
      this.styleSheet.top = `${t}px`
    }
    function adjustLeft (pos, menu) {
      const scrollLeft = window.pageXOffset; const viewWid = document.documentElement.clientWidth
      const wid = this.rightClick ? 0 : pos.width
      // align left's left
      const left = this.rightClick ? this.x : pos.left + scrollLeft
      // align center's left
      const center = (left + (wid / 2)) - (menu.width / 2)
      // align right's left
      const right = (left + wid) - menu.width

      switch (this.align) {
        case 'left': return (left + menu.width) > (scrollLeft + viewWid) ? right : left
        case 'center':
          if ((center + menu.width) > (scrollLeft + viewWid)) return right
          else if (right < scrollLeft) return left
          else return center
        case 'right': return (right < scrollLeft) ? left : right
      }
    }
    function scrollInfo () {
      const supportPageOffset = window.pageXOffset !== undefined
      const isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat')

      return {
        x: supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft,
        y: supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop
      }
    }
    /**
     * returns the event’s path which is an array of the objects on which listeners will be invoked
     * @param e - MouseEvent
     * @returns {Array|EventTarget[]|*}
     */
    function eventPath (e) {
      if ('composedPath' in e) return e.composedPath()
      if ('path' in e) return e.path
      // polyfill
      const path = []
      let currentElem = e.target
      while (currentElem) {
        path.push(currentElem)
        currentElem = currentElem.parentElement
      }
      if (path.indexOf(window) === -1 && path.indexOf(document) === -1) path.push(document)
      if (path.indexOf(window) === -1) path.push(window)
      return path
    }

    onMounted(() => {
      if (props.width) {
        styleSheet.width = props.width + 'px'
      }
      if (props.embed) {
        visible()
      } else {
        document.body.appendChild(this.$refs.dropdown)
        document.body.addEventListener('mousedown', whole)
      }
    })
    onBeforeUnmount(() => {
      // remove drop down layer
      if (!this.embed) {
        document.body.removeEventListener('mousedown', whole)
        this.$refs.dropdown.remove()
      }
    })
    onUnmounted(() => {
      if (!props.embed) this.$el.remove()
    })

    return () => {
      // console.log(this.animate)
      const children = []
      // the dropdown layer caller
      if ('caller' in slots && !props.embed) {
        children.push(slots.caller())
      }
      // the dropdown layer container
      children.push(h('transition', {
        props: {
          name: animate.value
        }
      }, [h('div', {
        class: {
          [dropdownClass.value]: true,
          'v-dropdown-embed': props.embed,
          'v-dropdown-no-border': !props.border
        },
        style: styleSheet.value,
        directives: [{ name: 'show', value: show.value }],
        ref: 'dropdown',
        onMousedown: e => {
          // do not close dropdown container layer when do some operations in that
          e.stopPropagation()
        }
      }, slots.default())]))

      return h('div', {
        class: {
          'v-dropdown-caller': true,
          'v-dropdown-caller--full-width': props.fullWidth
        },
        onClick: e => {
          if (props.embed || props.rightClick || props.manual) {
            return
          }
          e.stopPropagation()
          visible()
        },
        // mouse right button click
        onContextmenu: e => {
          if (props.embed || props.manual || !props.rightClick) {
            return
          }
          e.stopPropagation()
          e.preventDefault()

          const info = scrollInfo()
          this.x = e.pageX || (e.clientX + info.x)
          this.y = e.pageY || (e.clientY + info.y)
          visible()
        }
      }, children)
    }
  }
}
