# 模拟单选框输入

源文件 `element-form.js` 片段：

```javascript
const elRadios = await elFormItems[5].$x(
  `.//label[contains(., "${data.resource}")]`
);
await page.waitForTimeout(100);
await elRadios[0].click();
```

单选框比较简单：找到对应项，并点击，无需检查状态。