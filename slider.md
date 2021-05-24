# 操控滑块



## 方式1

可以通过点击滑块条来设置滑块。

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



## 相关 API

##### `elementHandle.boundingBox()`

- 功能描述：返回元素的边界框。



##### `page.mouse.click(x, y[, options])`

- 功能描述：在指定位置点击鼠标。



## 方式 2

通过模拟鼠标拖动来设置滑块。

源文件 `slider-2.js` 片段：

```javascript
  // 获取滑块条及滑块的位置及大小
  const sliderBox = await elSlider.boundingBox();
  const sliderButtonBox = await elSliderButton.boundingBox();

  // 将鼠标移动到滑块的中心
  await page.mouse.move(
    sliderButtonBox.x + sliderButtonBox.width / 2,
    sliderButtonBox.y + sliderButtonBox.height / 2
  );
  // 按下鼠标
  await page.mouse.down();
  // 拖动滑块
  await page.mouse.move(
    sliderBox.x + sliderBox.width * sliderPosition,
    sliderBox.y + sliderBox.height / 2,
    { steps: 100 }
  );
  // 释放鼠标
  await page.mouse.up();
```



## 相关 API

##### `page.mouse.move(x, y[, options])`

- 功能描述：将鼠标移动到指定位置。
- 常用 `options`：
  - `steps` `<number>` 将移动过程分解成若干步，并在中间出发 `mousemove` 事件，默认为 1。



##### `page.mouse.down()`

- 功能描述：按下鼠标。



##### `page.mouse.up()`

- 功能描述：释放鼠标。
