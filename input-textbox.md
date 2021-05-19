# 模拟文本框输入

源文件 `element-form.js` 片段：

```javascript
// 模拟输入“活动名称”
const elInput = await elFormItems[0].$("input");
await elInput.type(data.name, { delay: 100 });
```

