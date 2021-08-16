const puppeteer = require("puppeteer");
const filePath = "./examples/upload-sample.jpeg";
const url = "https://postimages.org/";
const uploadButtonSelector = "#uploadFile";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  const elUploadButton = await page.$(uploadButtonSelector);
  const [fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    elUploadButton.click(),
  ]);
  await fileChooser.accept([filePath]);

  await page.waitForNavigation();

  await page.screenshot({ path: "upload.png" });
  await browser.close();
})();
