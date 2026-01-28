import { test, expect } from "@playwright/test";

test.describe("Quiz Selection Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/quiz");
  });

  test("should display quiz selection page", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /choose your quiz/i })).toBeVisible();
  });

  test("should display quiz cards", async ({ page }) => {
    // Wait for cards to load
    await expect(page.getByText(/what is a vc fund/i).first()).toBeVisible();
  });

  test("should have filter by part options", async ({ page }) => {
    await expect(page.getByText(/part 1/i).first()).toBeVisible();
    await expect(page.getByText(/part 2/i).first()).toBeVisible();
    await expect(page.getByText(/part 3/i).first()).toBeVisible();
  });

  test("should navigate to quiz config when clicking start", async ({ page }) => {
    await page.getByRole("link", { name: /start quiz/i }).first().click();
    // Verify URL is properly formed (not containing template literal syntax)
    const currentUrl = page.url();
    expect(currentUrl).toContain("/quiz/");
    expect(currentUrl).not.toContain("${");
    expect(currentUrl).not.toContain("%7B");
  });
});

test.describe("Quiz Configuration Page", () => {
  test("should display question count options", async ({ page }) => {
    await page.goto("/quiz/what-is-a-vc-fund");
    
    await expect(page.getByText(/quick/i).first()).toBeVisible();
    await expect(page.getByText(/standard/i).first()).toBeVisible();
    await expect(page.getByText(/comprehensive/i).first()).toBeVisible();
  });

  test("should have start quiz button", async ({ page }) => {
    await page.goto("/quiz/what-is-a-vc-fund");
    
    await expect(page.getByRole("button", { name: /start quiz/i })).toBeVisible();
  });

  test("should navigate to play page when starting quiz", async ({ page }) => {
    await page.goto("/quiz/what-is-a-vc-fund");
    
    await page.getByRole("button", { name: /start quiz/i }).click();
    await expect(page.url()).toContain("/play");
  });
});

test.describe("Quiz Play Page", () => {
  test("should display quiz question", async ({ page }) => {
    await page.goto("/quiz/what-is-a-vc-fund/play?count=10");
    
    // Wait for question to load
    await page.waitForTimeout(1000);
    
    // Check for question card elements
    await expect(page.getByText(/question 1/i).first()).toBeVisible();
  });

  test("should have progress indicator", async ({ page }) => {
    await page.goto("/quiz/what-is-a-vc-fund/play?count=10");
    
    await page.waitForTimeout(1000);
    
    // Check for progress elements
    await expect(page.getByText(/of 10/i).first()).toBeVisible();
  });

  test("should have exit button", async ({ page }) => {
    await page.goto("/quiz/what-is-a-vc-fund/play?count=10");
    
    await page.waitForTimeout(1000);
    
    // Check for exit button (X icon)
    await expect(page.getByRole("button").first()).toBeVisible();
  });
});
