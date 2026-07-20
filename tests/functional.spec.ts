import { test, expect } from "@playwright/test";

test.describe("language switcher", () => {
  test("defaults to ru, switches language, persists across reload", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "ru");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("аудит");

    await page.getByRole("button", { name: "Язык" }).click();
    await page.getByRole("option", { name: "EN" }).click();

    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("audit");

    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("audit");
  });

  test("switches to kz (html lang uses the valid BCP-47 'kk' subtag)", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Язык" }).click();
    await page.getByRole("option", { name: "KZ" }).click();
    await expect(page.locator("html")).toHaveAttribute("lang", "kk");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Аудиттен");
  });
});

test.describe("theme toggle", () => {
  test("defaults to light, toggles to dark, persists across reload without flash", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).not.toHaveAttribute("data-theme", "dark");

    await page.getByRole("button", { name: /темная тема/i }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

    await page.reload();
    // anti-flash inline script should set data-theme before first paint
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });
});

test.describe("floating navigation", () => {
  test("scrolls to sections and highlights the active one", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Контакты" }).click();
    await expect(page.locator("#contact")).toBeInViewport();
    await expect(page.getByRole("button", { name: "Контакты" })).toHaveAttribute("aria-current", "true");
  });
});

test.describe("project carousel", () => {
  test("opens overlay on click, navigates with arrows, closes with Escape", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Проекты", exact: true }).click();

    const firstCard = page.getByRole("button", { name: /Bonus Shop, превью/ });
    await firstCard.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("heading", { name: "Bonus Shop" })).toBeVisible();

    await page.getByRole("button", { name: "Следующий проект" }).click();
    await expect(dialog.getByRole("heading", { name: "TechCore" })).toBeVisible();

    await page.getByRole("button", { name: "Предыдущий проект" }).click();
    await expect(dialog.getByRole("heading", { name: "Bonus Shop" })).toBeVisible();

    await page.keyboard.press("ArrowRight");
    await expect(dialog.getByRole("heading", { name: "TechCore" })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
  });

  test("info panel is hidden by default and toggles via the i button; Escape closes it before the dialog", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Проекты", exact: true }).click();
    await page.getByRole("button", { name: /Bonus Shop, превью/ }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog.getByRole("heading", { name: "Bonus Shop", level: 3 })).toBeHidden();

    await dialog.getByRole("button", { name: "Информация о проекте" }).click();
    await expect(dialog.getByRole("heading", { name: "Bonus Shop", level: 3 })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("heading", { name: "Bonus Shop", level: 3 })).toBeHidden();

    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
  });

  test("closing returns focus to the trigger card", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Проекты", exact: true }).click();
    const firstCard = page.getByRole("button", { name: /Bonus Shop, превью/ });
    await firstCard.click();
    await page.keyboard.press("Escape");
    await expect(firstCard).toBeFocused();
  });

  test("the three new demos (Uzel, Dastarkhan, FitPulse) are reachable and show real screenshots", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Проекты", exact: true }).click();
    await page.getByRole("button", { name: /Bonus Shop, превью/ }).click();

    const dialog = page.getByRole("dialog");
    const nextInOverlay = page.getByRole("button", { name: "Следующий проект" });

    // order: Bonus Shop(0) -> TechCore(1) -> Pixelforge(2) -> Узел(3) -> Dastarkhan(4) -> FitPulse(5)
    for (let i = 0; i < 3; i++) await nextInOverlay.click();
    await expect(dialog.getByAltText(/Узел, скриншот 1/)).toBeVisible();

    for (const title of ["Dastarkhan", "FitPulse"]) {
      await nextInOverlay.click();
      await expect(dialog.getByAltText(new RegExp(`${title}, скриншот 1`))).toBeVisible();
    }

    // info panel confirms the same project identity behind the "i" toggle
    await dialog.getByRole("button", { name: "Информация о проекте" }).click();
    await expect(dialog.getByRole("heading", { name: "FitPulse", level: 3 })).toBeVisible();
  });
});

test.describe("screenshot gallery", () => {
  test("browses real screenshots inside the overlay with prev/next arrows", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Проекты", exact: true }).click();
    await page.getByRole("button", { name: /Bonus Shop, превью/ }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog.getByText("Реальный скриншот")).toBeVisible();
    await expect(dialog.getByAltText(/скриншот 1 из 4/)).toBeVisible();

    await dialog.getByRole("button", { name: "Следующий скриншот" }).click();
    await expect(dialog.getByAltText(/скриншот 2 из 4/)).toBeVisible();

    await dialog.getByRole("button", { name: "Предыдущий скриншот" }).click();
    await expect(dialog.getByAltText(/скриншот 1 из 4/)).toBeVisible();
  });
});

test.describe("services & faq sections", () => {
  test("nav scrolls to services and faq sections", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Услуги" }).click();
    await expect(page.locator("#services")).toBeInViewport();

    await page.getByRole("button", { name: "Вопросы" }).click();
    await expect(page.locator("#faq")).toBeInViewport();
  });

  test("faq accordion opens and closes an item", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Вопросы" }).click();

    const question = page.getByRole("button", { name: "Какие сроки разработки?" });
    await expect(question).toHaveAttribute("aria-expanded", "false");
    await question.click();
    await expect(question).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByText("около недели")).toBeVisible();

    await question.click();
    await expect(question).toHaveAttribute("aria-expanded", "false");
  });
});

test.describe("bear hero illustration", () => {
  test("renders as a static, non-interactive image", async ({ page }) => {
    await page.goto("/");
    const bear = page.getByRole("img", { name: /веселый медведь в очках/ });
    await expect(bear).toBeVisible();
    // decorative illustration, not a control - no button role, no click affordance
    await expect(page.getByRole("button", { name: /медведь/i })).toHaveCount(0);
  });
});
