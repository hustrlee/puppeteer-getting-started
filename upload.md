# 上传文件

源文件 `upload-image.js` 片段：

```javascript
const elUploadButton = await page.$(uploadButtonSelector);
const [fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    elUploadButton.click()
]);
await fileChooser.accept([filePath]);

await page.waitForNavigation();
```

Puppeteer 使用 `FileChooser` 来模拟文件对话框（`FileDialog`）。



## 相关 API

##### `page.waitForFileChooser([Options])`

- 功能描述：等待弹出文件对话框，并返回 `FileChooser` 来操控文件对话框。



##### `fileChooser.accept(filePaths)`

- 功能描述：关闭文件对话框，并将 `filePaths` `Array <string>` 作为多个文件路径返回给页面。



##### `page.waitForNavigation([Options])`

- 功能描述：等待跳转完成。上传文件会触发跳转动作，等待跳转也就是等待文件上传完毕。
