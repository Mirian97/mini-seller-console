import { expect, Page, test } from "@playwright/test";

const clickOnLeadRow = async (page: Page) => {
  const leadRow = page.getByTestId("lead-row").first();
  await leadRow.click();
  const leadDetailsHeadingDialog = page.getByRole("heading", {
    name: "Lead Details",
  });
  const closeButtonDialog = page.getByRole("button").filter({ hasText: /^$/ });

  return {
    leadDetailsHeadingDialog,
    closeButtonDialog,
    leadRow,
  };
};

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Lead Details Dialog", () => {
  test("click on lead row, open lead details dialog and close it", async ({
    page,
  }) => {
    const { leadDetailsHeadingDialog, closeButtonDialog } =
      await clickOnLeadRow(page);
    await expect(leadDetailsHeadingDialog).toBeVisible();
    await closeButtonDialog.click();
    await expect(leadDetailsHeadingDialog).not.toBeVisible();
  });

  test("should update lead and save changes", async ({ page }) => {
    const { leadRow, closeButtonDialog } = await clickOnLeadRow(page);
    const statusCombobox = page.getByRole("combobox", { name: "Status *" });
    await statusCombobox.click();
    await page.getByRole("option", { name: "Lost" }).click();
    await expect(statusCombobox).toHaveText("Lost");
    await page.getByRole("button", { name: "Save Changes" }).click();
    closeButtonDialog.click();
    await expect(leadRow.getByText("Lost")).toBeVisible();
  });

  test("should convert lead to opportunity", async ({ page }) => {
    const { closeButtonDialog, leadDetailsHeadingDialog } =
      await clickOnLeadRow(page);
    await page.getByRole("button", { name: "Convert to Opportunity" }).click();
    await closeButtonDialog.click();
    await expect(leadDetailsHeadingDialog).not.toBeVisible();
  });
});
