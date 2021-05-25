# 获取控制台信息

Puppeteer 可以监听控制台事件，获取控制台信息。

源文件 `element-form.js` 片段：

```javascript
const page = await browser.newPage();
page.on("console", msg => {
  console.log(msg.text());
});
await page.goto(url, { waitUntil: "networkidle2" });
```

