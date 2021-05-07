# Puppeteer 实战指南



## Puppeteer 概述





## Puppeteer 的安装

```sh
# 使用淘宝镜像来加速
npm config set puppeteer_download_host=https://npm.taobao.org/mirrors
npm install puppeteer
# 安装可选包 bufferutil 和 utf-8-validate 来加速 ws，该步骤可省略
npm install --save-optional bufferutil
npm install --save-optional utf-8-validate
```

> 安装 `puppeteer` 时，会自动从 Google 安装 Chromium 作为默认的浏览器，在国内的网络环境下，需要使用“淘宝镜像”。

