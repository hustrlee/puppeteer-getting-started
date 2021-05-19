# 载入页面

源文件 `element-form.js` 片段：

```javascript
const browser = await puppeteer.launch({
    headless: false, // 为了演示，不使用 headless 模式
    defaultViewport: { width: 1920, height: 1080 }
  });

const page = await browser.newPage();

await page.goto(url, { waitUntil: "networkidle2" });
```



## Puppeteer 的层次结构

![puppeteer 层次结构](images\puppeteer-hierarchy.png)

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



## 相关 API

##### `puppeteer.launch([options])`

- 功能描述：启动浏览器，并返回一个 `Browser` 实例。

- 常用 `options`：
  - `headless` `<boolean>` 是否以无头模式运行浏览器，默认是 `true`。
  - `executablePath` `<string>` 可运行 Chromium 或 Chrome 可执行文件的路径，而不是绑定的 Chromium。
  - `defaultViewport` `<Object>` 为每个页面设置一个默认的视口大小。
    - `width` `<number>` 页面宽度像素，默认是 800。
    - `height` `<number>` 页面高度像素，默认是 600。



##### `browser.newPage()`

- 功能描述：在默认的浏览器上下文中创建一个 `Page` 实例。



##### `page.goto(url, [options])`

- 功能描述：跳转到 `url`，如果有多次跳转，将一直持续到最后一跳。
- 常用 `options`：
  - `waitUntil` `<string> | Array <string>` 满足什么条件时认为页面跳转完成，默认是 `load` 事件触发时。指定事件数组时，所有事件都被触发才认为是跳转完成。事件包括：
    - `load` - 页面的 `load` 事件触发时
    - `domcontentloaded` - 页面的 `DOMContentLoaded` 事件触发时
    - `networkidle0` - 不再有网络连接时（至少 500ms 后触发）
    - `networkidle2` - 只有 2 个网络连接时（至少 500ms 后触发）

