# v-dropdown &middot; [![npm version](https://img.shields.io/npm/v/v-dropdown.svg)](https://www.npmjs.com/package/v-dropdown) [![npm](https://img.shields.io/npm/dy/v-dropdown.svg)](https://www.npmjs.com/package/v-dropdown) [![license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://mit-license.org/) [![language](https://img.shields.io/badge/language-Vue2-brightgreen.svg)](https://www.npmjs.com/package/v-dropdown)

A **Vue2** plugin for dropdown container layer

## Examples

Live Examples on [CodePen](https://codepen.io/terry05/pen/BggbrK)

## Projects using `v-dropdown`

- [v-selectpage](https://github.com/TerryZ/v-selectpage)
- [v-selectmenu](https://github.com/TerryZ/v-selectmenu)
- [v-region](https://github.com/TerryZ/v-region)
- [v-suggest](https://github.com/TerryZ/v-suggest)

## Installation

<a href="https://nodei.co/npm/v-dropdown/"><img src="https://nodei.co/npm/v-dropdown.png"></a>

```node
npm i v-dropdown --save
```

Include and install plugin in your component/plugin/page

```vue
<script>
import Dropdown from 'v-dropdown';
export default {
  components: {
    'v-dropdown': Dropdown
  }
};
</script>
```

## Use case

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
import Dropdown from 'v-dropdown';
export default {
  components: {
    'v-dropdown': Dropdown
  },
  data(){
    return {
      show: false
    }
  },
  methods: {
    showChange(val){
      this.show = val;
    }
  }
};
</script>
```

## Props

- **align** `string` changed direction of alignment the dropdown container to trigger
  - left ( *default* )
  - center
  - right
- **embed** `boolean` the drop down panel embedded in page/component  
default: *false*
- **right-click** `boolean` mouse right button click to call dropdown  
default: *false*
- **animated** `boolean|string`  
default: *true*
- **toggle** `boolean` click trigger and display dropdown container and trigger click again whether to close dropdown  
default: *false*
- **width** `number` custom dropdown container width(px)
- **full-width** `boolean` the dropdown trigger display type, `true` for block, `false` for inline-block  
default: *false*
- **disabled** `boolean` You can disable the menu. Disabled menus can't be opened  
default: *false*
- **animated** `string|boolean`
- **manual** `boolean` disabled auto open/close the dropdown container, when **manual** set to `false`, you can call `visible` methods to manual open/close the dropdown container  
default: *false*

## Events

```vue
<template>
  <v-dropdown @show="showChange">
    <template #caller>
      <button type='button' ref='caller'>trigger</button>
    </template>

    <div>content</div>
  </v-dropdown>
</template>
<script>
export default {
  methods: {
    showChange(val){
      console.log(val);//true for shown, false for hidden
    }
  }
}
</script>
```

- **show** the dropdown layer container show state  
*arguments*  
    - val(boolean) - `true` for shown, `false` for hidden

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
    click(){
      this.$refs.drop.visible();
    }
  }
}
</script>
```

- **visible** open/close the drop down container  
`this.$refs.drop.visible()`  
- **adjust** adjust drop down layer positiion, make it align to trigger  
`this.$refs.drop.adjust()`  
