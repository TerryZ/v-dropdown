# v-dropdown &middot; [![CircleCI](https://dl.circleci.com/status-badge/img/gh/TerryZ/v-dropdown/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/TerryZ/v-dropdown/tree/master) [![codecov](https://codecov.io/gh/TerryZ/v-dropdown/branch/master/graph/badge.svg?token=veg52RGaZg)](https://codecov.io/gh/TerryZ/v-dropdown) [![npm downloads](https://img.shields.io/npm/dy/v-dropdown.svg)](https://www.npmjs.com/package/v-dropdown) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://mit-license.org/)

A dropdown container for Vue3

If you are using vue `2.x` version, please use [v-dropdown 2.x](https://github.com/TerryZ/v-dropdown/tree/dev-vue-2) version instead

## Documentation and Examples

Documentation and examples please visit below sites

- [Github Pages](https://terryz.github.io/vue3/dropdown/)

## Repositories using `v-dropdown`

- [v-selectpage](https://github.com/TerryZ/v-selectpage)
- [v-selectmenu](https://github.com/TerryZ/v-selectmenu)
- [v-region](https://github.com/TerryZ/v-region)
- [v-suggest](https://github.com/TerryZ/v-suggest)

## Installation

[![https://nodei.co/npm/v-dropdown.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/v-dropdown.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/v-dropdown)

```sh
npm i v-dropdown
```

## Usage

```vue
<template>
  <Dropdown @visible-change="visibleChange">
    <template #trigger>
      <!-- dropdown trigger -->
      <button
        type="button"
        class="btn"
      >
        click me
      </button>
    </template>

    <div>
      some contents
    </div>
  </Dropdown>
</template>

<script setup>
import Dropdown from 'v-dropdown'

visibleChange (val) {
  console.log(val)
}
</script>
```
