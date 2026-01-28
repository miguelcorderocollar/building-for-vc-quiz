import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("should navigate between pages using header links", async ({ page }) => {
    await page.goto("/");

    // Navigate to Quizzes via header
    await page.locator("header").getByRole("link", { name: /quizzes/i }).click();
    await expect(page).toHaveURL("/quiz");

    // Navigate to Results via header
    await page.locator("header").getByRole("link", { name: /my results/i }).click();
    await expect(page).toHaveURL("/results");

    // Navigate back to home via logo
    await page.goto("/");
    await expect(page).toHaveURL("/");
  });

  test("should have theme toggle", async ({ page }) => {
    await page.goto("/");

    // Find theme toggle button
    const themeToggle = page.getByRole("button", { name: /toggle theme/i });
    await expect(themeToggle).toBeVisible();
  });

  test("should display footer with attribution links", async ({ page }) => {
    await page.goto("/");

    // Check footer links
    await expect(page.getByRole("link", { name: /read the guide/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /original github/i })).toBeVisible();
  });

  test("should have correct meta title", async ({ page }) => {
    await page.goto("/");
    
    // Check page title contains "Test"
    const title = await page.title();
    expect(title.toLowerCase()).toContain("test");
  });
});

test.describe("Responsive Navigation", () => {
  test("should work on mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Page should still be functional
    await expect(page.getByRole("heading", { name: /test your vc tech knowledge/i })).toBeVisible();
  });

  test("should show hamburger menu on mobile and navigate via it", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Mobile menu button should be visible - target the sheet trigger button
    const menuButton = page.locator("[data-slot='sheet-trigger']");
    await expect(menuButton).toBeVisible();

    // Open mobile menu
    await menuButton.click();

    // Wait for sheet to open and check menu title
    await expect(page.getByRole("heading", { name: /menu/i })).toBeVisible();

    // Navigate to quizzes via mobile menu (inside sheet)
    await page.locator("[data-slot='sheet-content']").getByRole("link", { name: /quizzes/i }).click();
    await expect(page).toHaveURL("/quiz");
  });

  test("should show hamburger menu on mobile and navigate to results", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Open mobile menu - target the sheet trigger button
    await page.locator("[data-slot='sheet-trigger']").click();

    // Navigate to results via mobile menu (inside sheet)
    await page.locator("[data-slot='sheet-content']").getByRole("link", { name: /my results/i }).click();
    await expect(page).toHaveURL("/results");
  });
});
