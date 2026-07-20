import { test, expect } from "@playwright/test";

const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];

const locales = [
  { code: "ru", option: null }, // default, no switch needed
  { code: "kz", option: "KZ" },
  { code: "en", option: "EN" },
];

const themes: ("light" | "dark")[] = ["light", "dark"];

for (const viewport of viewports) {
  for (const locale of locales) {
    for (const theme of themes) {
      test(`hero - ${locale.code} - ${theme} - ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto("/");

        if (locale.option) {
          await page.getByRole("button", { name: "Язык" }).click();
          await page.getByRole("option", { name: locale.option }).click();
        }
        if (theme === "dark") {
          await page.getByRole("button", { name: /темная тема|dark theme|қараңғы тема/i }).click();
        }

        // Spotlight's radial gradient tracks the last pointer position, which otherwise varies
        // by a few px between runs depending on which control was last clicked - pin it for determinism.
        await page.mouse.move(0, 0);
        // Entrance animations (Reveal/AnimatedHeadline stagger) run up to ~1.2s (longest: CTA
        // buttons at delay 0.7s + duration 0.5s); RU's longer headline is the slowest to settle.
        await page.waitForTimeout(1500);
        await expect(page).toHaveScreenshot(`hero-${locale.code}-${theme}-${viewport.name}.png`, {
          fullPage: false,
          maxDiffPixelRatio: 0.02,
        });
      });
    }
  }
}

test("project overlay - light - desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.getByRole("button", { name: "Проекты", exact: true }).click();
  await page.getByRole("button", { name: /Bonus Shop, превью/ }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.mouse.move(0, 0);
  await page.waitForTimeout(300);
  await expect(page).toHaveScreenshot("overlay-ru-light-desktop.png", { maxDiffPixelRatio: 0.02 });
});
