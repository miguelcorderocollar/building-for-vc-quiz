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
    // Wait for quiz cards to be visible first
    await expect(page.getByText(/what is a vc fund/i).first()).toBeVisible();
    
    // Find all "Start Quiz" links and filter to get one that goes to a specific quiz (not /quiz)
    const allStartLinks = page.getByRole("link", { name: /start quiz|retake quiz/i });
    const count = await allStartLinks.count();
    
    // Find a link that has an href pointing to a specific quiz (contains /quiz/ with a slug after)
    let startLink = null;
    for (let i = 0; i < count; i++) {
      const link = allStartLinks.nth(i);
      const href = await link.getAttribute("href");
      if (href && href.match(/\/quiz\/[^/]+$/) && href !== "/quiz") {
        startLink = link;
        break;
      }
    }
    
    // Verify we found a valid quiz link
    expect(startLink).toBeTruthy();
    const href = await startLink!.getAttribute("href");
    expect(href).toMatch(/\/quiz\/[^/]+$/);
    
    // Click and wait for navigation
    await Promise.all([
      page.waitForURL(/\/quiz\/[^/]+$/, { timeout: 10000 }),
      startLink!.click()
    ]);
    
    // Verify URL is properly formed (not containing template literal syntax)
    const currentUrl = page.url();
    expect(currentUrl).toContain("/quiz/");
    expect(currentUrl).not.toContain("${");
    expect(currentUrl).not.toContain("%7B");
  });
});

test.describe("Quiz Configuration Page", () => {
  test("should display question count options", async ({ page }) => {
    // Use a quiz with 25+ questions to ensure Standard option is available
    await page.goto("/quiz/data-providers");
    
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
    // Wait for navigation to complete
    await page.waitForURL(/\/play/, { timeout: 5000 });
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
