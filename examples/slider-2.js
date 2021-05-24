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
  const elSliderButton = await page.$(`${sliderSelector} .el-slider__button`);

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

  await page.screenshot({ path: "slider.png" });
  await browser.close();
})();
