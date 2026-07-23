const { chromium } = require("@playwright/test");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("https://megaumka.dev", { waitUntil: "networkidle" });
  await page.screenshot({ path: "scratch-shots/full-page.png", fullPage: true });
  await page.screenshot({ path: "scratch-shots/hero.png" });
  await browser.close();
})();
