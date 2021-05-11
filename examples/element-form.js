const puppeteer = require("puppeteer");
const url =
  "https://element.eleme.cn/#/zh-CN/component/form#biao-dan-yan-zheng";

const data = {
  name: "模拟活动",
  location: "区域二",
  date: "2021-05-11",
  time: "09:00:00",
  instant: true,
  property: ["地推活动", "线下主题活动"],
  resource: "线下场地免费",
  activityForm: "1. 演员表演\n2. 现场抽奖"
};

blockPrefix = "#biao-dan-yan-zheng + p + div > div.source > div > form.el-form";

const blocks = {
  name: `${blockPrefix} > div.el-form-item:nth-child(1)`,
  location: `${blockPrefix} > div.el-form-item:nth-child(2)`,
  dateTime: `${blockPrefix} > div.el-form-item:nth-child(3)`,
  instant: `${blockPrefix} > div.el-form-item:nth-child(4)`,
  property: `${blockPrefix} > div.el-form-item:nth-child(5)`,
  resource: `${blockPrefix} > div.el-form-item:nth-child(6)`,
  activityForm: `${blockPrefix} > div.el-form-item:nth-child(7)`
};

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto(url, { waitUntil: "networkidle2" });

  // 模拟输入“活动名称”
  await page.type(`${blocks.name} input`, data.name);

  // 直接设置“活动区域”
  // await page.$eval(
  //   `${blocks.location} input`,
  //   (el, data) => (el.value = data.location),
  //   data
  // );
  // 模拟设置“活动区域”
  await page.click(`${blocks.name} input`);
  await page.waitForSelector("div.el-select-dropdown:not([style*=display])");

  await page.screenshot({ path: "element-form.png" });
  await browser.close();
})();
