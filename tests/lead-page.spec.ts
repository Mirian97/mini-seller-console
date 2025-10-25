import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Lead Page", () => {
  test("should show titles", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Leads Management" })
    ).toBeVisible();
    await expect(page.getByText("Manage your sales leads and")).toBeVisible();
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
