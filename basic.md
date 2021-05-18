# Puppeteer 基础

模拟提交表单是自动化测试中最常用的功能，下面通过几个示例的分析来介绍 Puppeteer 的常用功能。



## 模拟提交表单示例

以[“Element-UI 表单 - 典型表单”](https://element.eleme.cn/#/zh-CN/component/form#dian-xing-biao-dan)做为模拟提交的对象。该示例涵盖了几个常见的 **input** 组件：input 输入框、select 选择器、DatePicker 日期选择器、TimePicker 时间选择器、Switch 开关、Checkbox 多选框、Radio 单选框等。



### 载入页面

源文件 `element-form.js` 片段：

```javascript
const browser = await puppeteer.launch({
    headless: false, // 为了演示，不使用 headless 模式
    defaultViewport: { width: 1920, height: 1080 }
  });

const page = await browser.newPage();

await page.goto(url, { waitUntil: "networkidle2" });
```



#### Puppeteer 的层次结构

![puppeteer 层次结构](images/puppeteer-hierarchy.png)

Puppeteer 的层次结构直接对应了浏览器的层次结构：

- `Puppeteer` 通过 `DevTools Protocol` 与浏览器 Chromium 或 Chrome 进行通信，并控制它们的行为。
- `Browser` 是对浏览器的抽象。
- `BrowserContext` 是对浏览器上下文的抽象。
  - 启动浏览器时，自动创建了一个默认的浏览器上下文（`Default BrowserContext`），`browser.newPage()` 方法在默认的浏览器上下文中创建页面（`Page`）。
  - 如果一个页面打开了另一个页面（例如：通过 `window.open` 调用），则弹出窗口将属于父页面的浏览器上下文。
  - 一个浏览器上下文可以包含多个页面，并具有独立的 Session，即具有独立的 cookie 和 cache。
  - 使用 `browser.createIncognitoBrowserContext()` 方法创建”隐身“浏览器上下文。“隐身”浏览器上下文不会将任何浏览器数据写入磁盘。
  - 一般情况下，仅使用默认的浏览器上下文。
- `Page` 是对 tab 页的抽象。
- `Frame` 是对 `<iframe>` 的抽象。
  - 一个页面至少有一个框架
  - 每个框架拥有自己的执行上下文。
  - 如果页面只有一个框架，则程序中无需引入框架。



#### 相关 API



