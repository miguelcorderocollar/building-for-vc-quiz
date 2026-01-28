import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display the hero section", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /test your vc tech knowledge/i })).toBeVisible();
    await expect(page.getByText(/questions covering fund structure/i)).toBeVisible();
  });

  test("should have Start Quiz button that navigates to quiz page", async ({ page }) => {
    await page.getByRole("link", { name: /start quiz/i }).first().click();
    await expect(page).toHaveURL("/quiz");
  });

  test("should display features section", async ({ page }) => {
    await expect(page.getByText(/comprehensive coverage/i)).toBeVisible();
    await expect(page.getByText(/flexible quizzes/i)).toBeVisible();
    await expect(page.getByText(/track progress/i)).toBeVisible();
  });

  test("should have attribution to original source", async ({ page }) => {
    await expect(page.getByText(/building for vc/i).first()).toBeVisible();
    await expect(page.getByText(/alex patow/i).first()).toBeVisible();
  });

  test("should display statistics", async ({ page }) => {
    await expect(page.getByText(/questions/i).first()).toBeVisible();
    await expect(page.getByText(/topics/i).first()).toBeVisible();
    await expect(page.getByText(/minutes/i).first()).toBeVisible();
  });
});
