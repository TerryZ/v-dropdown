# Changelog

Please refer to [CHANGELOG-CN](CHANGELOG-CN.md) for Chinese changelog

## [3.0.0-beta.2](https://github.com/TerryZ/v-dropdown/compare/v3.0.0-beta.1...v3.0.0-beta.2) (2023-09-15)

### Features

- Add `customTriggerClass` prop, used to add custom class to trigger container
- Add `customContainerClass` prop, used to add custom class to dropdown container
- Update `.d.ts` document

### Bug Fixes

- Position drift when first opening a dropdown container in **FireFox**
- Component code assist not working

## [3.0.0-beta.1](https://github.com/TerryZ/v-dropdown/compare/v2.1.1...v3.0.0-beta.1) (2023-02-08)

### Features

- refactor `v-dropdown` with vue3 composition api
- change module bundler library from `webpack` to `vite`
- change unit test library from `mocha` to `vitest`
- `show` event rename to `visible-change`
- add scoped slot feature to trigger slot, response `visible` and `disabled` states
- add `trigger` prop, use to set dropdown trigger mode
- remove `right-click` prop and change to `trigger` set to `contextmenu` instead
- remove `embed` prop
