# Puppeteer 概述

[TOC]

## 简介

**Puppeteer** 是一个 Node 库，它提供了一个高级 API 来通过 Devtools 协议控制 Chromium 或 Chrome。浏览器中手动执行的绝大多数操作都可以使用 Puppeteer 来完成！

Puppeteer 可用来：

- 页面截图，生成页面 PDF。
- 抓取 SPA（单页应用）并生成预渲染内容（即 “SSR” - 服务器端渲染）。
- 自动提交表单，进行 UI 测试，模拟键盘、鼠标输入。
- 创建一个时时更新的自动化测试环境。
- 捕获网站的 timeline trace，用来帮助分析性能问题。
- 测试浏览器扩展。



## 安装

```sh
# 使用淘宝镜像来加速
npm config set puppeteer_download_host=https://npm.taobao.org/mirrors
npm install puppeteer
# 安装可选包 bufferutil 和 utf-8-validate 来加速 ws，该步骤可省略
npm install --save-optional bufferutil
npm install --save-optional utf-8-validate
```

> 安装 `puppeteer` 时，会自动从 Google 安装 Chromium 作为浏览器，在国内的网络环境下，需要使用“淘宝镜像”。



## 初次尝试

**Example** - 跳转到 https://baidu.com，并保存截图至 *baidu.png*：

文件为：`examples/firt-try.js`

```javascript
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080
  });
  await page.goto("https://baidu.com");
  await page.screenshot({ path: "baidu.png" });

  await browser.close();
})();
```

在命令行中执行：

```shell
node examples/first-try.js
```

> Puppeteer 初始化的屏幕大小默认为 800px * 600px。由于现代的大部分 Web 应用都使用更高的分辨率，因此需要使用 `Page.setViewport()` 来进行设置。



## 浏览器设置

### 无头模式（headless）

Puppeteer 默认运行 Chromium 的“无头模式”。可以通过设置，使用完全版本的 Chromium，这对调试 Puppeteer 程序很有用。

```javascript
const browser = await puppeteer.launch({ headless: false }); // defalut is true
```



### 使用 Chrome

默认情况下，Puppeteer 下载并使用特定版本的 Chromium 以及其 API，保证开箱即用。如果要将 Puppeteer 与其它版本的 Chrome 或 Chromium 一起使用，在创建 `Browser` 实例时传入 Chrome 可执行文件的路径即可：

```javascript
const browser = await puppeteer.launch({ executablePath: "/path/to/chrome" });
```



## FAQ

### Q：除了 Puppeteer，还有哪些自动化测试框架？

常用的自动化测试框架包括：**Selenium、Puppeteer、Cypress、Playwright**。

|              | Selenium                                                     | Puppeteer                            | Playwright                                          | Cypress                                |
| ------------ | ------------------------------------------------------------ | ------------------------------------ | --------------------------------------------------- | -------------------------------------- |
| 支持语言     | Java<br>Python<br>ruby<br>C#<br>C++<br>Javascript            | Javascript/TypeScript<br>Python      | Javascript/TypeScript<br>Python<br>C#<br>Go<br>Java | Javascript/TypeScript                  |
| 覆盖浏览器   | 支持目前所有主流浏览器。不同的浏览器需要使用不同的 Webdriver，例如：chromedriver。 | Chrome<br>Firefox                    | Chromium<br>WebKit<br>Firefox                       | Chrome<br/>Firefox                     |
| 多标签和表单 | 通过 `switch_to` 切换，但是不好用                            | 更符合操作习惯的 API                 | 更符合操作习惯的 API                                | 不支持                                 |
| 测试编写速度 | 可以使用 elenium IDE 录制脚本                                | 可以使用 Puppeteer Recorder 录制脚本 | 使用 `playwright codegen` 命令录制脚本              | 不支持                                 |
| 文档和资源   | 官方文档写得一般，但是第三方资料太丰富                       | 社区比较小，但是有大量的教程         | 工具比较新，API 也在变化，文档和教程可能跟不上      | 官方文档写得很好，社区很小，但是很活跃 |

如果是 toC 项目，需兼容主流浏览器，毫无疑问，选择**Selenium**；如果项目中只使用 Chrome 浏览器，**Puppeteer** 是更好的选择：

- Puppeteer 的 API 更简单，更直观，它几乎是在模拟人的操作。
- 原生支持 Javascript，对 Web 前端程序员更为友好。
- Puppeteer 无需借助 Webdriver，直接通过 Devtools 协议控制 Chromium/Chrome，效率更高，速度更快。
- 提供了生成页面截图、PDF 的功能，更方便测试。



### Q: Chrome、Chromium、Chrome Canary这三个版本之间的关系和异同是什么？

1. **Chrome** - stable 最稳定的版本。
2. **Canary** - daily build，这个是最新且可以用于哪些不怕死的开发者和极客们玩新功能的版本。反正 bug 和漏洞是很多的，但是新玩意也是很多的。这个经过了一定的测试，但是 bug 应该还是蛮多的。
3. **Chromium** - 开源的，而且不包括哪些非开源的东西，比如 flash 插件，商业解码器什么的，也不包括 google 的标识。你可以去下载源码自己编译。编译时间那是相当的长啊。另外这个版本是不会自动更新的，如果要更新，需要去手动下载。Ubuntu 安装这个会很方便，apt 升级也很容易。

一般 google 是这样的： canary > dev > beta > regular。regular 就是大家普通人都在用的正式版 chrome 了。bug 越来越少，少到可以投放市场。

