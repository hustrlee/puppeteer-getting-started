const puppeteer = require("puppeteer");
const url = "https://element.eleme.cn/#/zh-CN/component/slider";
const sliderSelector = "#ji-chu-yong-fa + p + div .el-slider__runway";
const sliderPosition = 0.63;

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1920, height: 1080 }
  });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

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

  await page.screenshot({ path: "slider.png" });
  await browser.close();
})();
