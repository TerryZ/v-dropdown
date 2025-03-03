# Changelog

英文 changelog 内容请访问 [CHANGELOG](CHANGELOG.md)

## [3.2.0](https://github.com/TerryZ/v-dropdown/compare/v3.1.3...v3.2.0) (2025-03-03)

### 新特性

- 插槽数据与 `useDropdown` 工具函数增加 `adjust` 函数
- 触发器位置与高度发生变化时，自动调整下拉栏位置

## [3.1.3](https://github.com/TerryZ/v-dropdown/compare/v3.1.2...v3.1.3) (2025-02-24)

### 问题修复

- 单元测试 `ResizeObserver is not defined` 修复

## [3.1.2](https://github.com/TerryZ/v-dropdown/compare/v3.1.1...v3.1.2) (2025-02-24)

### 新特性

- 优化 `ResizeObserver` 兼容性与 SSR 编译问题处理

## [3.1.1](https://github.com/TerryZ/v-dropdown/compare/v3.1.0...v3.1.1) (2025-02-23)

### 新特性

- 下拉栏容器添加最大宽度限制
- `ResizeObserver` 兼容性处理

## [3.1.0](https://github.com/TerryZ/v-dropdown/compare/v3.0.0...v3.1.0) (2025-02-20)

### 新特性

- 新增 `DropdownContent` 组件，作为下拉内容的容器，提供更好的结构化和样式控制
- 新增 `DropdownTrigger` 组件，作为可选的内置的触发器组件
- `fullWidth` prop 更名为 `block`
- `animated` prop 从 `Dropdown` 组件中移除，改为 `DropdownContent` 组件的 prop
- 移除 `width` 与 `customContainerClass` prop，可在 `DropdownContent` 组件直接通过 style 或 class 进行样式定制
- 移除 `customTriggerClass` prop，可在 `DropdownTrigger` 组件直接通过 style 或 class 进行样式定制
- `Dropdown` 新增 `gap` prop，用于设置触发器与下拉内容之间的间距
- `Dropdown` 新增 `open`、`opened`、`close` 与 `closed` 事件，用于响应下拉栏的打开与关闭状态
- `Dropdown` 的 API 中移除 `adjust` 函数
- 下拉内容尺寸发生变化时，自动调整下拉位置
- 下拉栏与触发器提供 `rounded` prop 设置圆角弧度
- 下拉栏提供 `z-index` prop 设置 z-index 层级
- 提供 `useDropdown` 工具函数，用于获得 dropdown 组件的各种状态与方法

## [3.0.0](https://github.com/TerryZ/v-dropdown/compare/v3.0.0-beta.2...v3.0.0) (2023-09-16)

### 问题修复

- 更新 `.d.ts` 文档内容

## [3.0.0-beta.2](https://github.com/TerryZ/v-dropdown/compare/v3.0.0-beta.1...v3.0.0-beta.2) (2023-09-15)

### 新特性

- 新增 `customTriggerClass` prop，用于自定义触发对象样式
- 新增 `customContainerClass` prop，用于自定义下拉容器样式
- 更新 `.d.ts` 文档内容

### 问题修复

- 在 **FireFox** 下初次打开下拉容器出现位置漂移现象
- 插件辅助提示失效

## [3.0.0-beta.1](https://github.com/TerryZ/v-dropdown/compare/v2.1.1...v3.0.0-beta.1) (2023-02-08)

### 新特性

- 使用 vue3 **composition api** 重构 `v-dropdown`
- 工具链从 `webpack` 更换为 `vite`
- 单元测试库从 `mocha` 更换为 `vitest`
- `show` 事件更名为 `visible-change`
- 为触发对象增加作用域插槽功能支持，输出 `visible` 与 `disabled` 数据状态
- 添加 `trigger` prop，用于指定 dropdown 的触发模式
- 移除 `right-click` prop，该功能设置转为使用设置 `trigger` prop 值为 `contextmenu`
- 移除 `embed` prop
