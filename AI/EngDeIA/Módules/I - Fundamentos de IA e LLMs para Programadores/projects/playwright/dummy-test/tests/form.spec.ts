import { test, expect } from "@playwright/test";

test.use({ actionTimeout: 10_000 });

test.beforeEach(async ({ page }) => {
  await page.goto("./");
});

// Shared locator helpers — defined inside each test via closures for readability
// but kept DRY by re-using the same selector strings throughout.

// ── Form submission ────────────────────────────────────────────────────────────

test("valid submit adds a new card to the list", async ({ page }) => {
  const cardsBefore = await page.locator("#card-list .card").count();

  await page.getByRole("textbox", { name: "Image Title" }).fill("Test Card Title");
  await page.getByPlaceholder("https://img.com/erick.png").fill("https://placecats.com/300/200");
  await page.getByRole("button", { name: "Submit Form" }).click();

  await expect(page.locator("#card-list .card")).toHaveCount(cardsBefore + 1);
});

test("new card displays the submitted title", async ({ page }) => {
  await page.getByRole("textbox", { name: "Image Title" }).fill("My Awesome Image");
  await page.getByPlaceholder("https://img.com/erick.png").fill("https://placecats.com/300/200");
  await page.getByRole("button", { name: "Submit Form" }).click();

  await expect(page.locator("#card-list .card").last().locator(".card-title")).toHaveText(
    "My Awesome Image"
  );
});

test("new card uses the submitted URL as image src", async ({ page }) => {
  const imageUrl = "https://placecats.com/300/200";
  await page.getByRole("textbox", { name: "Image Title" }).fill("URL Card");
  await page.getByPlaceholder("https://img.com/erick.png").fill(imageUrl);
  await page.getByRole("button", { name: "Submit Form" }).click();

  await expect(page.locator("#card-list .card").last().locator("img")).toHaveAttribute(
    "src",
    imageUrl
  );
});

test("new card alt text follows the pattern 'Image of an <title>'", async ({ page }) => {
  await page.getByRole("textbox", { name: "Image Title" }).fill("Space Cat");
  await page.getByPlaceholder("https://img.com/erick.png").fill("https://placecats.com/300/200");
  await page.getByRole("button", { name: "Submit Form" }).click();

  await expect(page.locator("#card-list .card").last().locator("img")).toHaveAttribute(
    "alt",
    "Image of an Space Cat"
  );
});

test("inputs are cleared after a valid submit", async ({ page }) => {
  const titleInput = page.getByRole("textbox", { name: "Image Title" });
  const urlInput = page.getByPlaceholder("https://img.com/erick.png");

  await titleInput.fill("Clear Me");
  await urlInput.fill("https://placecats.com/300/200");
  await page.getByRole("button", { name: "Submit Form" }).click();

  await expect(titleInput).toHaveValue("");
  await expect(urlInput).toHaveValue("");
});

test("form validation class is reset after a valid submit", async ({ page }) => {
  await page.getByRole("textbox", { name: "Image Title" }).fill("Reset Class");
  await page.getByPlaceholder("https://img.com/erick.png").fill("https://placecats.com/300/200");
  await page.getByRole("button", { name: "Submit Form" }).click();

  // form should lose 'was-validated' so inline errors don't linger
  await expect(page.locator("form")).not.toHaveClass(/was-validated/);
});

// ── Form validation ────────────────────────────────────────────────────────────

test("submitting empty form shows both validation messages", async ({ page }) => {
  await page.getByRole("button", { name: "Submit Form" }).click();

  await expect(page.locator("#titleFeedback")).toBeVisible();
  await expect(page.locator("#urlFeedback")).toBeVisible();
});

test("submitting empty form does not add a card", async ({ page }) => {
  const cardsBefore = await page.locator("#card-list .card").count();
  await page.getByRole("button", { name: "Submit Form" }).click();

  await expect(page.locator("#card-list .card")).toHaveCount(cardsBefore);
});

test("submitting with title only shows URL validation message", async ({ page }) => {
  await page.getByRole("textbox", { name: "Image Title" }).fill("Title Only");
  await page.getByRole("button", { name: "Submit Form" }).click();

  await expect(page.locator("#urlFeedback")).toBeVisible();
  await expect(page.locator("#card-list .card")).toHaveCount(3);
});

test("submitting with a malformed URL shows URL validation message", async ({ page }) => {
  await page.getByRole("textbox", { name: "Image Title" }).fill("Bad URL Test");
  await page.getByPlaceholder("https://img.com/erick.png").fill("not-a-valid-url");
  await page.getByRole("button", { name: "Submit Form" }).click();

  await expect(page.locator("#urlFeedback")).toBeVisible();
  await expect(page.locator("#card-list .card")).toHaveCount(3);
});
