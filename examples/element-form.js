const puppeteer = require("puppeteer");
const url =
  "https://element.eleme.cn/#/zh-CN/component/form#biao-dan-yan-zheng";

const data = {
  name: "模拟活动",
  location: "区域二",
  date: "2021-05-11",
  instant: true,
  property: ["地推活动", "线下主题活动"],
  resource: "线下场地免费",
  activityForm: "1. 演员表演\n2. 现场抽奖",
};

const formItemsSelector =
  "#dian-xing-biao-dan + p + div > div.source > div > form.el-form > div.el-form-item";

(async () => {
  const browser = await puppeteer.launch({
    headless: false, // 为了演示，不使用 headless 模式
    defaultViewport: { width: 1920, height: 1080 },
  });

  const page = await browser.newPage();
  page.on("console", (msg) => {
    console.log(msg.text());
  });
  await page.goto(url, { waitUntil: "networkidle2" });

  // 找到需要提交的 Form
  const elFormItems = await page.$$(formItemsSelector);

  // 模拟输入“活动名称”
  const elInput = await elFormItems[0].$("input");
  await elInput.type(data.name, { delay: 100 });

  // 模拟设置“活动区域”
  const elSelect = await elFormItems[1].$("div.el-select");
  // 模拟点击，等待候选框出现
  await elSelect.click({ delay: 100 });
  const elSelectDropdown = await page.waitForSelector(
    "div.el-select-dropdown:not([style*=display])"
  );
  // 找到候选框中对应项，并点击
  const elSelectDropdownItems = await elSelectDropdown.$x(
    `.//li[contains(., "${data.location}")]`
  );
  await page.waitFor(100);
  await elSelectDropdownItems[0].click();

  // 模拟设置“活动时间 - 日期”
  const elDate = await elFormItems[2].$("input");
  await elDate.type(data.date);
  await page.keyboard.press("Enter");
  // 模拟设置“活动时间 - 时间”
  const elTime = await elFormItems[2].$("div.el-date-editor--time");
  await elTime.click();

  // 模拟设置“即时配送”
  const elSwitch = await elFormItems[3].$("div.el-switch");
  // 判断 Switch 的现在状态
  let switchStatus = await (
    await elSwitch.getProperty("ariaChecked")
  ).jsonValue();
  if (switchStatus === null) {
    switchStatus = false;
  }
  if (switchStatus !== data.instant) {
    await elSwitch.click();
  }

  // 模拟设置“活动性质”
  const elCheckboxOptions = await elFormItems[4].$$("label.el-checkbox");
  for (let option of elCheckboxOptions) {
    // 判断 Checkbox 的状态
    let optionStatus = (
      await (await option.getProperty("className")).jsonValue()
    ).includes("is-checked");

    // 获取 Checkbox Option 的对应值
    let optionValue = await (
      await option.getProperty("textContent")
    ).jsonValue();

    if (optionStatus !== data.property.includes(optionValue.trim())) {
      await page.waitFor(100);
      await option.click();
    }
  }

  // 模拟设置“特殊资源”
  const elRadios = await elFormItems[5].$x(
    `.//label[contains(., "${data.resource}")]`
  );
  await page.waitFor(100);
  await elRadios[0].click();

  // 模拟输入“活动形式”
  const elTextarea = await elFormItems[6].$("textarea");
  await elTextarea.type(data.activityForm);

  // 模拟“提交”
  const elSubmit = await elFormItems[7].$x(
    ".//button[contains(., '立即创建')]"
  );
  await elSubmit[0].click();

  // 原因不明，不延时则会产生一个“JSHandle@error“
  await page.waitFor(500);

  // 截屏，并退出浏览器
  await page.screenshot({ path: "element-form.png" });
  await browser.close();
})();
