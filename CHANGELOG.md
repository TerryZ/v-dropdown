# Changelog

Please refer to [CHANGELOG-CN](CHANGELOG-CN.md) for Chinese changelog

## [3.4.0](https://github.com/TerryZ/v-dropdown/compare/v3.3.0...v3.4.0) (2025-03-14)

### Features

- `Dropdown` component add `appendTo` prop, used to specify after which element the dropdown container is inserted

## [3.3.0](https://github.com/TerryZ/v-dropdown/compare/v3.2.1...v3.3.0) (2025-03-08)

### Features

- `DropdownContent` component remove `animationName` prop

### Bug Fixes

- Fixed the issue of opening/closing the dropdown content transition animation failing


## [3.2.1](https://github.com/TerryZ/v-dropdown/compare/v3.2.0...v3.2.1) (2025-03-05)

### Bug Fixes

- Fixed the issue where the resize observer's target element does not exist after code hot updates during development

## [3.2.0](https://github.com/TerryZ/v-dropdown/compare/v3.1.3...v3.2.0) (2025-03-03)

### Features

- Added `adjust` function to slot data and `useDropdown` utility function
- Automatically adjust the dropdown content position when the trigger position and height change

## [3.1.3](https://github.com/TerryZ/v-dropdown/compare/v3.1.2...v3.1.3) (2025-02-24)

### Bug Fixes

- Unit test `ResizeObserver is not defined` fixed

## [3.1.2](https://github.com/TerryZ/v-dropdown/compare/v3.1.1...v3.1.2) (2025-02-24)

### Features

- Optimize `ResizeObserver` compatibility and SSR compilation problem handling

## [3.1.1](https://github.com/TerryZ/v-dropdown/compare/v3.1.0...v3.1.1) (2025-02-23)

### Features

- Added maximum width limit for drop-down bar container
- `ResizeObserver` compatibility processing

## [3.1.0](https://github.com/TerryZ/v-dropdown/compare/v3.0.0...v3.1.0) (2025-02-20)

### Features

- Added the `DropdownContent` component as a container for dropdown content, enabling better structural organization and style control
- Added the `DropdownTrigger` component as an optional built-in trigger component
- The `fullWidth` prop has been renamed to `block`
- The `animated` prop has been removed from the `Dropdown` component and is now a prop of the `DropdownContent` component
- Removed the `width` and `customContainerClass` props; styles can now be directly customized via `style` or `class` on the `DropdownContent` component
- Removed the `customTriggerClass` prop; styles can now be directly customized via `style` or `class` on the `DropdownTrigger` component
- Added a `gap` prop to the `Dropdown` component to set spacing between the trigger and dropdown content
- Added `open`, `opened`, `close`, and `closed` events to the `Dropdown` component to respond to dropdown state changes
- The `adjust` function has been removed from the `Dropdown` API
- Dropdown position now automatically adjusts when content dimensions change
- Added a `rounded` prop to both the dropdown and trigger for configuring border radius
- Added a `z-index` prop to the dropdown for controlling layer hierarchy
- Provides `useDropdown` utility function to obtain various states and methods of the dropdown component

## [3.0.0](https://github.com/TerryZ/v-dropdown/compare/v3.0.0-beta.2...v3.0.0) (2023-09-16)

### Bug Fixes

- Update `.d.ts` document

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
