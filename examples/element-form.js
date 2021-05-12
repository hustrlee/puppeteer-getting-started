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

const formItems =
  "#biao-dan-yan-zheng + p + div > div.source > div > form.el-form > div.el-form-item";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1920, height: 1080 }
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  // 找到需要提交的 Form
  const elFormItems = await page.$$(formItems);

  // 模拟输入“活动名称”
  const elTextbox = await elFormItems[0].$("input[type=text]");
  await elTextbox.type(data.name);

  // 模拟设置“活动区域”
  const elSelect = await elFormItems[1].$("div.el-select");
  // 模拟点击，等待候选框出现
  await elSelect.click();
  const elSelectDropdown = await page.waitForSelector(
    "div.el-select-dropdown:not([style*=display])"
  );
  // 找到候选框中对应项，并点击
  const elDropdownItems = await elSelectDropdown.$$("ul li");
  for (let item of elDropdownItems) {
    let innerText = await item.$eval("span", node => node.innerText);
    if (innerText === data.location) {
      await item.click();
    }
  }

  await page.screenshot({ path: "element-form.png" });
  await browser.close();
})();
