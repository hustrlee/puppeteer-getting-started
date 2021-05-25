# 模拟文本域（多行文本）输入

源文件 `element-form.js` 片段：

```javascript
const data = {
	...,
  activityForm: "1. 演员表演\n2. 现场抽奖"
};

const elTextarea = await elFormItems[6].$("textarea");
await elTextarea.type(data.activityForm);
```

直接使用 `\n` 特殊字符，实现多行文本域中的换行。