const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 926 });
  await page.goto("https://nohu99.org/", { waitUntil: "networkidle0" });
  const links = await page.$$eval("a", (collection) =>
    collection.map((ele) => ele.href)
  );
  const imgs = await page.$$eval("img", (collection) =>
    collection.map((ele) => ele.src)
  );

  console.log(links);
  console.log(imgs);

  await browser.close();
})();
