import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/oportunity");
});

test.describe("Opportunity Page", () => {
  test("should show titles", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Opportunities" })
    ).toBeVisible();
    await expect(
      page.getByText("Track your sales opportunities and their progress")
    ).toBeVisible();
  });

  test("should render not found in lead table", async ({ page }) => {
    const searchInput = page.getByRole("textbox", {
      name: "Search leads by name or",
    });
    await searchInput.click();
    await searchInput.fill("xyz");
    await expect(page.getByText("No leads found")).toBeVisible();
  });
});
