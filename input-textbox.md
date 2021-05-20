# 模拟文本框输入

源文件 `element-form.js` 片段：

```javascript
// 模拟输入“活动名称”
const elInput = await elFormItems[0].$("input");
await elInput.type(data.name, { delay: 100 });
```

在 Form 的第一个子项中找到 `<input>` 元素，并模拟输入。



## 相关 API

#### `elementHandle.$(selector)`

- 功能描述：在某个元素的后代中，寻找符合 `selector` 的元素。



#### `elementHandle.type(text[, options])`

- 功能描述：将焦点移到 `elementHandle` 上，并模拟输入 `text`。所谓模拟是指：为 `text` 中的每个字符发送 `keydown`、`keypress` / `input`、和 `keyup` 事件。
- 常用 `options`：
  - `delay` `<number>` 按键之间的等待时间，默认为0。某些网站有”反机器人“设定，需要随机设定 `delay`，来欺骗该设定。

