const puppeteer = require("puppeteer");
const url =
  "https://element.eleme.cn/#/zh-CN/component/form#biao-dan-yan-zheng";

const textBoxSelector = "#biao-dan-yan-zheng ~ div input";
const 

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  await browser.close();
})();
