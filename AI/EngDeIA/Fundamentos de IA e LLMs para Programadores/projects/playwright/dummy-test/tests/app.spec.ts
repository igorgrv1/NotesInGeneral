import { test, expect } from "@playwright/test";

const APP_PATH = "/vanilla-js-web-app-example/";

// ── Page title ────────────────────────────────────────────────────────────────

test("page title is 'TDD Frontend Example'", async ({ page }) => {
  await page.goto(APP_PATH);
  await expect(page).toHaveTitle("TDD Frontend Example");
});

// ── Form inputs ───────────────────────────────────────────────────────────────

test("title input has correct placeholder", async ({ page }) => {
  await page.goto(APP_PATH);
  await expect(page.locator("#title")).toHaveAttribute("placeholder", "Image Title");
});

test("image URL input has correct placeholder", async ({ page }) => {
  await page.goto(APP_PATH);
  await expect(page.locator("#imageUrl")).toHaveAttribute(
    "placeholder",
    "https://img.com/erick.png"
  );
});

test("submit button has aria-label 'Submit Form'", async ({ page }) => {
  await page.goto(APP_PATH);
  await expect(page.locator("#btnSubmit")).toHaveAttribute("aria-label", "Submit Form");
});

// ── Card list ─────────────────────────────────────────────────────────────────

test("card list section renders 3 cards on load", async ({ page }) => {
  await page.goto(APP_PATH);
  await expect(page.locator("#card-list .card")).toHaveCount(3);
});

test("default cards are AI Alien, Predator Night Vision and ET Bilu", async ({ page }) => {
  await page.goto(APP_PATH);
  const titles = page.locator(".card-title");
  await expect(titles.nth(0)).toHaveText("AI Alien");
  await expect(titles.nth(1)).toHaveText("Predator Night Vision");
  await expect(titles.nth(2)).toHaveText("ET Bilu");
});

test("each card has a visible image", async ({ page }) => {
  await page.goto(APP_PATH);
  const images = page.locator("#card-list .card img");
  await expect(images).toHaveCount(3);
  for (let i = 0; i < 3; i++) {
    await expect(images.nth(i)).toBeVisible();
  }
});
