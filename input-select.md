# 模拟选择框输入

源文件 `element-form.js` 片段：

```javascript
// 模拟设置“活动区域”
const elSelect = await elFormItems[1].$("div.el-select");
// 模拟点击，等待候选框出现
await elSelect.click({ delay: 100 });
const elSelectDropdown = await page.waitForSelector(
  "div.el-select-dropdown:not([style*=display])"
);
// 找到候选框中对应项，并点击
const elSelectDropdownItems = await elSelectDropdown.$x(
  `.//li[contains(., "${data.location}")]`
);
await page.waitFor(100);
await elSelectDropdownItems[0].click();
```

Puppeteer 可以完全模拟人的操作过程来完成选择框的输入。模拟流程如下：

```mermaid
graph LR
  s1["找到选择框"]-->s2["点击选择框，并等待候选框出现"]
  s2-->s3["在候选框中，找到符合条件的项"]
  s3-->s4["点击符合条件的项"]
```

## 相关 API

#### `elementHandle.click([options])`

- 功能描述：`elementHandle` 对应元素滚动到视野中，并模拟点击，将触发 `mousedown` 和 `mouseup` 事件。
- 常用 `options`：
  - `clickCount` `<number>` 点击的次数，默认是 1。
  - `deley` `<number>` `mousedown` 和 `mouseup` 之间的等待时间，默认是 0。

#### `page.waitForSelector(selector[, options])`

- 功能描述：等待 `selector` 指定的 DOM 元素出现。由于很多 DOM 是动态构造的，使用此方法可以等待它出现后再执行后续操作。
- 常用 `options`：
  - 参数 `visible` 和 `hidden` 似乎没有作用，可以用**伪类**和**属性选择器**的组合来取代这两个参数。

#### `elementHandle.$x(xPath)`

- 功能描述：通过 `xPath` 来搜索所有的匹配的元素，返回 `Array <ElementHandle>`。如果没有匹配元素，则返回 `[]`。

#### `page.waitFor(timeout)`

- 功能描述：等待 `timeout` 毫秒后，完成 `Promise.resovle`

> Puppeteer 在执行中有时会需要插入一些 `waitFor`，否则会报错，尚不知道原因。
>
> 如果单步执行正确，但是正常执行报错，则说明需要插入 `waitFor`。

## XPath 入门

XPath 是一门在 XML 文档中查找信息的语言。DevTools 可以使用 XPath 来查找页面中的 DOM 节点，它提供了比选择器更强大的搜索方式。

相关文档：

- [XPath 教程 - W3school](https://www.w3school.com.cn/xpath/index.asp)

**XPath 基本语法**

| 表达式   | 描述                                                       |
| :------- | :--------------------------------------------------------- |
| nodename | 选取此节点的所有子节点。                                   |
| /        | 从根节点选取。                                             |
| //       | 从匹配选择的当前节点选择文档中的节点，而不考虑它们的位置。 |
| .        | 选取当前节点。                                             |
| ..       | 选取当前节点的父节点。                                     |
| @        | 选取属性。                                                 |
