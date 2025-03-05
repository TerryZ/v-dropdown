# v-dropdown &middot; [![CircleCI](https://dl.circleci.com/status-badge/img/gh/TerryZ/v-dropdown/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/TerryZ/v-dropdown/tree/master) [![codecov](https://codecov.io/gh/TerryZ/v-dropdown/branch/master/graph/badge.svg?token=veg52RGaZg)](https://codecov.io/gh/TerryZ/v-dropdown) [![npm version](https://img.shields.io/npm/v/v-dropdown.svg)](https://www.npmjs.com/package/v-dropdown) [![npm downloads](https://img.shields.io/npm/dy/v-dropdown.svg)](https://www.npmjs.com/package/v-dropdown) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A dropdown container for Vue3

If you are using vue `2.x` version, please use [v-dropdown 2.x](https://github.com/TerryZ/v-dropdown/tree/dev-vue-2) version instead

## Features

- Multiple drop-down bar triggering methods
- Built-in trigger button component for quick use
- When the position and size of the trigger and the drop-down bar content change, the drop-down bar content position is automatically adjusted to align - with the trigger
- Provide `Dropdown` status and tool functions for each slot
- Provide `useDropdown` tool function
- Flexible style customization method

## Documentation and Examples

Documentation and examples please visit below sites

- [github-pages](https://terryz.github.io/docs-vue3/dropdown/)

## My repositories using `v-dropdown`

- [v-selectpage](https://github.com/TerryZ/v-selectpage)
- [v-selectmenu](https://github.com/TerryZ/v-selectmenu)
- [v-region](https://github.com/TerryZ/v-region)
- [v-suggest](https://github.com/TerryZ/v-suggest)

## Installation

[![https://nodei.co/npm/v-dropdown.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/v-dropdown.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/v-dropdown)

```sh
# npm
npm i v-dropdown
# yarn
yarn add v-dropdown
# pnpm
pnpm add v-dropdown
```

## Usage

```vue
<template>
  <Dropdown>
    <template #trigger>
      <DropdownTrigger />
    </template>

    <DropdownContent>
      <div>some contents</div>
    </DropdownContent>
  </Dropdown>
</template>

<script setup>
import { Dropdown, DropdownContent, DropdownTrigger } from 'v-dropdown'
</script>
```

## License

[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://mit-license.org/)
