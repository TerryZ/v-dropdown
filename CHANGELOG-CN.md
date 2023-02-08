# Changelog

英文 changelog 内容请访问 [CHANGELOG](CHANGELOG.md)

## [3.0.0-beta.1](https://github.com/TerryZ/v-dropdown/compare/v2.1.1...v3.0.0-beta.1) (2022-08-26)

### 新特性

- 使用 vue3 **composition api** 重构 `v-dropdown`
- 工具链从 `webpack` 更换为 `vite`
- 单元测试库从 `mocha` 更换为 `vitest`
- `show` 事件更名为 `visible-change`
- 为触发对象增加作用域插槽功能支持，输出 `visible` 与 `disabled` 数据状态
- 添加 `trigger` prop，用于指定 dropdown 的触发模式
- 移除 `right-click` prop，该功能设置转为使用设置 `trigger` prop 值为 `contextmenu`
- 移除 `embed` prop
