# 获取 DOM 节点

Puppeteer 使用 `ElementHandle` 来抽象页面的 DOM 节点。要操作 DOM 节点，首先要对它进行定位。

源文件 `element-form.js` 片段：

```javascript
const formItemsSelector =
  "#dian-xing-biao-dan + p + div > div.source > div > form.el-form > div.el-form-item";

// 找到需要提交的 Form
const elFormItems = await page.$$(formItemsSelector);
```



## 相关 API

##### `page.$(selector)`

- 功能描述：通过 `selector` 来搜索匹配的第一个 DOM 节点，返回 `ElementHandle`。如果没有匹配元素，则返回 `null`。



##### `page.$$(selector)`

- 功能描述：通过 `selector` 来搜索匹配的所有 DOM 节点，返回 `Array <ElementHandle>`。如果没有匹配元素，则返回 `[]`。



## selector（选择器）入门

这里的选择器指的是：CSS 选择器。相关的文档：

- [CSS 选择器 - MDN Web Docs](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Selectors)
- [CSS 选择器参考手册 - W3school](https://www.w3school.com.cn/cssref/css_selectors.asp)

**常见选择器**

| 选择器         | 用法                | 描述                                                         |
| -------------- | ------------------- | ------------------------------------------------------------ |
| id 选择器      | `#myid`             | `id = myid` 的元素，对每个页面 ID 属性应该是唯一的。         |
| 类选择器       | `.myclassname`      | `class` 含有 `myclassname` 的所有元素。                      |
| 标签选择器     | `div, h1, p`        | 标签为 `<div>`、`<h>`、或 `<p>` 的所有元素。                 |
| 相邻兄弟选择器 | `h1+p`              | 紧接着 `<h1>` 元素后的 `<p>` 元素，且 `<h1>` 和 `<p>` 共享同一个父节点。 |
| 直接子代选择器 | `ul > li`           | 直接嵌套在 `<ul>` 元素内的所有 `<li>` 元素。                 |
| 后代选择器     | `div span`          | 位于 `<div>` 元素内的所有 `<span>` 元素                      |
| 属性选择器     | `a[rel="external"]` | 具有属性 `rel="external"` 的所有 `<a>` 元素。                |
| 伪类选择器     | `li:nth-child(2)`   | 找到第 3 个 `<li>` 元素                                      |



### 利用 DevTools 快速复制 selector

#### step1：使用“检查”功能快速打开 DevTools，并定位元素

![Inspect](images\inspect.png)

#### Step2：在 DevTools 中该元素上点击右键，选择 Copy -> Copy selector

![Copy selector](images\copy-selector.png)

这里获得的百度搜索框 `selector` 为：`#kw`



### 利用 DevTools 验证 selector

在 DevTools -> Console 中输入：`$("kw")`，即可验证书写的 selector 是否选中了我们期望的元素。当鼠标悬浮在搜索结果上时，页面上的对应元素会被加亮。

![验证 selector](images\validate-selector.png)

