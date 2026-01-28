import { test, expect } from "@playwright/test";

test.describe("Results History Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/results");
  });

  test("should display results history page", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /your quiz history/i })).toBeVisible();
  });

  test("should show empty state when no results", async ({ page }) => {
    // Clear localStorage
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    await expect(page.getByText(/no quizzes taken yet/i)).toBeVisible();
    // Use main content area to avoid footer link
    await expect(page.getByRole("main").getByRole("link", { name: /browse quizzes/i })).toBeVisible();
  });

  test("should navigate to quiz page from empty state", async ({ page }) => {
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    // Use main content area to avoid footer link
    await page.getByRole("main").getByRole("link", { name: /browse quizzes/i }).click();
    await expect(page).toHaveURL("/quiz");
  });
});
