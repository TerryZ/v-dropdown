# Changelog

英文 changelog 内容请访问 [CHANGELOG](CHANGELOG.md)

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
