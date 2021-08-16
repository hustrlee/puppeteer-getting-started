const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    // executablePath:
    //   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
  });
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36"
  );

  await page.setViewport({ width: 1920, height: 1080 });
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, "webdriver", {
      get: () => undefined,
    });
  });
  await page.goto("https://login.taobao.com/", { waitUntil: "networkidle2" });

  await page.type("#fm-login-id", "qling", { delay: 100 });
  await page.waitFor(1000);
  await page.type("#fm-login-password", "ybl&lr751214", { delay: 100 });
  await page.waitFor(1000);
  await page.click('[type="submit"]');
  await page.waitForNavigation();
  await page.screenshot({ path: "taobao.png" });

  await browser.close();
})();
