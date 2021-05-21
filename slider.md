# 操控滑块

源文件 `slider-js` 片段：

```javascript
  const elSlider = await page.$(sliderSelector);
  // 获取滑块条的位置及大小
  const sliderBox = await elSlider.boundingBox();
  // 计算鼠标点击的位置
  const clickPositon = {
    x: sliderBox.x + sliderBox.width * sliderPosition,
    y: sliderBox.y + sliderBox.height / 2
  };
  // 将鼠标移到指定位置并click
  await page.mouse.click(clickPositon.x, clickPositon.y);
```

可以通过点击滑块条来设置滑块。



## 相关 API

##### `elementHandle.boundingBox()`

- 功能描述：返回元素的边界框。



##### `page.mouse.click(x, y[, options])`

- 功能描述：在指定位置点击鼠标。



## 方式 2

