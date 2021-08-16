# 模拟复选框输入

源文件 `element-form.js` 片段：

```javascript
const elCheckboxOptions = await elFormItems[4].$$("label.el-checkbox");
for (let option of elCheckboxOptions) {
  // 判断 Checkbox 的状态
  let optionStatus = (
    await (await option.getProperty("className")).jsonValue()
  ).includes("is-checked");

  // 获取 Checkbox Option 的对应值
  let optionValue = await (await option.getProperty("textContent")).jsonValue();

  if (optionStatus !== data.property.includes(optionValue.trim())) {
    await page.waitFor(100);
    await option.click();
  }
}
```

遍历每个选项，检查每个选项的值及状态，是否和待输入值相符。如不相符，则点击该选项。
