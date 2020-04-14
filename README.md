# v-dropdown &middot; [![npm version](https://img.shields.io/npm/v/v-dropdown.svg)](https://www.npmjs.com/package/v-dropdown) [![npm downloads](https://img.shields.io/npm/dy/v-dropdown.svg)](https://www.npmjs.com/package/v-dropdown) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://mit-license.org/) [![language](https://img.shields.io/badge/language-Vue2-brightgreen.svg)](https://www.npmjs.com/package/v-dropdown)

A dropdown container layer for Vue2

## Examples

Live Examples on [CodePen](https://codepen.io/terry05/pen/BggbrK)

## Projects using `v-dropdown`

- [v-selectpage](https://github.com/TerryZ/v-selectpage)
- [v-selectmenu](https://github.com/TerryZ/v-selectmenu)
- [v-region](https://github.com/TerryZ/v-region)
- [v-suggest](https://github.com/TerryZ/v-suggest)

## Installation

<a href="https://nodei.co/npm/v-dropdown/"><img src="https://nodei.co/npm/v-dropdown.png"></a>

```
npm i -S v-dropdown
```

Include and install plugin in your component/plugin/page

```vue
<script>
import Dropdown from 'v-dropdown'
export default {
  components: {
    'v-dropdown': Dropdown
  }
}
</script>
```

## Usage

```vue
<template>
  <v-dropdown @show="showChange">
    <!-- named slot -->
    <template #caller>
      <!-- dropdown container trigger -->
      <button type="button" class="btn">Open</button>
    </template>
    
    <div>
      some contents you want
    </div>
  </v-dropdown>
</template>

<script>
import Dropdown from 'v-dropdown'
export default {
  components: {
    'v-dropdown': Dropdown
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    showChange (val) {
      this.show = val
    }
  }
}
</script>
```

## Props

**align** `'left' (string)`  
changed direction of alignment the dropdown container to trigger

- 'left'
- 'center'
- 'right'

**embed** `false (boolean)`  
the drop down panel embedded in page/component

**right-click** `false (boolean)`  
mouse right button click to call dropdown

**animated** `true (boolean|string)`

**toggle** `false (boolean)`  
click trigger and display dropdown container and trigger click again whether to close dropdown

**width** `undefined (number)`  
custom dropdown container width(px)

**full-width** `false (boolean)`  
the dropdown trigger display type

- true - `display: block`
- false - `display: inline-block`

**disabled** `false (boolean)`  
you can disable the menu. Disabled menus can't be opened

**manual** `false (boolean)`  
disabled auto open/close the dropdown container, when **manual** set to `false`, you can call `visible` methods to manual open/close the dropdown container

## Events

```vue
<template>
  <v-dropdown @show="showChange">
    <template #caller>
      <button type='button' class="btn">trigger</button>
    </template>

    <div>content</div>
  </v-dropdown>
</template>
<script>
export default {
  methods: {
    showChange (val) {
      //true for shown, false for hidden
      console.log(val)
    }
  }
}
</script>
```

### show(state)
the dropdown layer container show state

- **state** `boolean`
  
  - `true` for shown
  - `false` for hidden

## API

```vue
<template>
  <v-dropdown ref='drop'>
    <template #caller>
      <button type='button' class="btn">Button</button>
    </template>
  </v-dropdown>
</template>
<script>
export default {
  methods: {
    click () {
      this.$refs.drop.visible()
    }
  }
}
</script>
```

**visible()**  
open/close the drop down container  

**adjust()**  
adjust drop down layer positiion, make it align to trigger  
