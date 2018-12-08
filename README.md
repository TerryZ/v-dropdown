# v-dropdown

A **Vue2** plugin for dropdown layer container

[![npm version](https://img.shields.io/npm/v/v-dropdown.svg)](https://www.npmjs.com/package/v-dropdown)
[![npm](https://img.shields.io/npm/dy/v-dropdown.svg)](https://www.npmjs.com/package/v-dropdown)
[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://mit-license.org/)



<br><br>

## Projects using `v-dropdown`

- [v-region](https://github.com/TerryZ/v-region)
- [v-selectpage](https://github.com/TerryZ/v-selectpage)
- [v-selectmenu](https://github.com/TerryZ/v-selectmenu)
- [v-suggest](https://github.com/TerryZ/v-suggest)

<br><br>

## Install

```bash
npm i v-dropdown --save
```

<a href="https://nodei.co/npm/v-dropdown/"><img src="https://nodei.co/npm/v-dropdown.png"></a>

Include in your plugin

```vue
<v-dropdown>
    some contents you want
</v-dropdown>

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

## Options

- **position** `string`  
    - `left` ( *default* )
    - `center`
    - `right`  
    <br>
- **embed** `boolean`  
default: *false*  
the drop down panel embedded in page/component  
- **right-click** `boolean`  
default: `false`  
mouse right button click to call dropdown  
- **animated** `boolean|string`  
default: *true*  
- **re-open** `boolean`  
default: `false`  
the dropdown whether re-open when it's has been opened and dropdown caller click again  
- **width** `number`
- **x** `number`
- **y** `number`

<br><br>

## Events

- **show**
- **adjust**
