# v-dropdown &middot; [![npm version](https://img.shields.io/npm/v/v-dropdown.svg)](https://www.npmjs.com/package/v-dropdown) [![npm](https://img.shields.io/npm/dy/v-dropdown.svg)](https://www.npmjs.com/package/v-dropdown) [![license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://mit-license.org/) [![language](https://img.shields.io/badge/language-Vue2-brightgreen.svg)](https://www.npmjs.com/package/v-dropdown)

A **Vue2** plugin for dropdown container layer

## Examples

Live Examples on [CodePen](https://codepen.io/terry05/pen/BggbrK)

## Projects using `v-dropdown`

- [v-region](https://github.com/TerryZ/v-region)
- [v-selectpage](https://github.com/TerryZ/v-selectpage)
- [v-selectmenu](https://github.com/TerryZ/v-selectmenu)
- [v-suggest](https://github.com/TerryZ/v-suggest)

## Installation

<a href="https://nodei.co/npm/v-dropdown/"><img src="https://nodei.co/npm/v-dropdown.png"></a>

```bash
npm i v-dropdown --save
```

Include and install plugin in your component/plugin/page

```vue
<template>
  <v-dropdown>
    some contents you want
  </v-dropdown>
</template>

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
    <button type='button' ref='caller'></button>
    <v-dropdown ref='drop' @show-change="showChange">content</v-dropdown>
</template>
<script>
export default {
    methods: {
        showChange(val){
            console.log(val);//true for shown, false for hidden
        }
    }
};
</script>
```

- **show-change** the dropdown layer container show state  
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

- **visible** open the drop down layer  
`this.$refs.drop.$emit('show', this.$refs.caller)`  
*arguments*  
    - caller(HTMLDOMELEMENT) - open the caller of the drop down, the drop down layer will align to caller  
- **adjust** adjust drop down layer positiion, make it align to caller  
`this.$refs.drop.$emit('adjust')`  
*arguments*  
    - caller(HTMLDOMELEMENT) - open the caller of the drop down, the drop down layer will align to caller  
