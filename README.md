# v-dropdown &middot; [![npm version](https://img.shields.io/npm/v/v-dropdown.svg)](https://www.npmjs.com/package/v-dropdown) [![npm](https://img.shields.io/npm/dy/v-dropdown.svg)](https://www.npmjs.com/package/v-dropdown) [![license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://mit-license.org/) [![language](https://img.shields.io/badge/language-Vue2-brightgreen.svg)](https://www.npmjs.com/package/v-dropdown)

A **Vue2** plugin for dropdown container layer

### Live Examples on [CodePen](https://codepen.io/terry05/pen/BggbrK)

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

<br><br>

## Use case

```vue
<template>
  <v-dropdown ref="drop" @show="showChange">
    <!-- named slot -->
    <template #caller>
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

- **align** `string`  
    - `left` ( *default* )
    - `center`
    - `right`  
    <br>
- **embed** `boolean`  
default: *false*  
the drop down panel embedded in page/component  
- **right-click** `boolean`  
default: *false*  
mouse right button click to call dropdown  
- **animated** `boolean|string`  
default: *true*  
- **re-open** `boolean`  
default: *false*  
the dropdown whether re-open when it's has been opened and dropdown caller click again  
- **width** `number`  
specified number to set width  
- **x** `number`  
mouse right click x axis, work on `right-click` set to `true`
- **y** `number`  
mouse right click y axis, work on `right-click` set to `true`

<br><br>

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

<br><br>

## API

```vue
<template>
    <button type='button' ref='caller' @click="click"></button>
    <v-dropdown ref='drop'>content</v-dropdown>
</template>
<script>
export default {
    methods: {
        click(){
            this.$refs.drop.$emit('api-name', args);
        }
    }
};
</script>
```

- **show** open the drop down layer  
`this.$refs.drop.$emit('show', this.$refs.caller)`  
*arguments*  
    - caller(HTMLDOMELEMENT) - open the caller of the drop down, the drop down layer will align to caller  
- **adjust** adjust drop down layer positiion, make it align to caller  
`this.$refs.drop.$emit('adjust')`  
*arguments*  
    - caller(HTMLDOMELEMENT) - open the caller of the drop down, the drop down layer will align to caller  
