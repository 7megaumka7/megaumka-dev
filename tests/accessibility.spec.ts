import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const locales: { flagAria: string; option: string }[] = [
  { flagAria: "ru", option: "RU" },
  { flagAria: "kz", option: "KZ" },
  { flagAria: "en", option: "EN" },
];

for (const { option } of locales) {
  test(`no critical/serious a11y violations - locale ${option}, light`, async ({ page }) => {
    await page.goto("/");
    if (option !== "RU") {
      await page.getByRole("button", { name: "Язык" }).click();
      await page.getByRole("option", { name: option }).click();
    }
    await page.waitForTimeout(4500); // let the hero's terminal typing + staggered reveals settle before sampling colors
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((v) => v.impact === "critical" || v.impact === "serious");
    expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
  });
}

test("no critical/serious a11y violations - dark theme", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /темная тема/i }).click();
  await page.waitForTimeout(4500); // let the hero's terminal typing + staggered reveals settle before sampling colors
  const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter((v) => v.impact === "critical" || v.impact === "serious");
  expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
});

test("no critical/serious a11y violations - project overlay open", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Проекты", exact: true }).click();
  await page.getByRole("button", { name: /Bonus Shop, превью/ }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.waitForTimeout(350); // let the open animation settle before sampling colors
  const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter((v) => v.impact === "critical" || v.impact === "serious");
  expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
});

// The demo pages each carry their own colour system (cream/terracotta, red/black, …) -
// scan every one, not just the portfolio chrome.
for (const path of ["/demo/techcore", "/demo/pixelforge", "/demo/uzel", "/demo/dastarkhan", "/demo/fitpulse", "/blog", "/blog/5-dyr-v-kazhdom-sajte"]) {
  test(`no critical/serious a11y violations - ${path}`, async ({ page }) => {
    await page.goto(path);
    await page.waitForTimeout(1200); // let entry animations finish before sampling colors
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((v) => v.impact === "critical" || v.impact === "serious");
    expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
  });
}

test("no critical/serious a11y violations - project overlay info panel open", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Проекты", exact: true }).click();
  await page.getByRole("button", { name: /Bonus Shop, превью/ }).click();
  const dialog = page.getByRole("dialog");
  await dialog.getByRole("button", { name: "Информация о проекте" }).click();
  await page.waitForTimeout(250);
  const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter((v) => v.impact === "critical" || v.impact === "serious");
  expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
});
