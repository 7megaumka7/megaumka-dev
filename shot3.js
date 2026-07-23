const { chromium } = require("@playwright/test");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("https://megaumka.dev", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  const height = await page.evaluate(() => document.body.scrollHeight);
  const step = 900;
  let i = 0;
  for (let y = 0; y < height; y += step) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(700);
    await page.screenshot({ path: `scratch-shots/scroll-${String(i).padStart(2,"0")}.png` });
    i++;
  }
  await browser.close();
})();
