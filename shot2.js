const { chromium } = require("@playwright/test");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("https://megaumka.dev", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);

  const sections = ["hero","why","projects","services","faq","team","about","contact"];
  for (const id of sections) {
    const el = await page.$("#" + id);
    if (el) {
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);
      await el.screenshot({ path: `scratch-shots/section-${id}.png` });
    } else {
      console.log("missing section:", id);
    }
  }
  await browser.close();
})();
