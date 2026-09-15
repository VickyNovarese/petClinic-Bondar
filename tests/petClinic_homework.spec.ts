import { test, expect } from "@playwright/test";


test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Pet types are displayed correctly", async ({ page }) => {
  
  //1. Select the PET TYPES menu item in the navigation bar
  await page.getByTitle("pettypes").click();  

  //2. Add assertion of the "Pet Types" text displayed above the table with the list of pet types
  const inputs = page.locator('#pettypes tbody input[name="pettype_name"]');
  expect(page.getByRole('heading')).toHaveText("Pet Types");

  //3.Click on "Edit" button for the "cat" pet type
  await page.getByRole("row", { name: "cat" }).getByRole("button", { name: "Edit" }).click();

  //4. Add assertion of the "Edit Pet Type" text displayed
  expect(page.getByRole('heading')).toHaveText('Edit Pet Type')

  //5. Change the pet type name from "cat" to "rabbit" and click "Update" button  
  const petTypeNameField = page.getByRole("textbox")
  await expect(petTypeNameField).toHaveValue("cat");
  await petTypeNameField.fill("rabbit");
  await petTypeNameField.dispatchEvent("input");
  await petTypeNameField.dispatchEvent("change");
  await expect(petTypeNameField).toHaveValue("rabbit");  
  const updateButton = page.getByRole("button", { name: "Update", exact: true });
  await expect(updateButton).toBeVisible();
  await expect(updateButton).toBeEnabled();
  await updateButton.click();

   //6. Add the assertion that the first pet type in the list of types has a value "rabbit"
  await expect(inputs.first()).toHaveValue("rabbit");

  //7. Click on "Edit" button for the same "rabbit" pet type
  await page.getByRole("row", { name: "rabbit" }).getByRole("button", { name: "Edit" }).click();

  //8. Change the pet type name back from "rabbit" to "cat" and click "Update" button 
  await expect(petTypeNameField).toHaveValue("rabbit");
  await petTypeNameField.fill("cat")
  await petTypeNameField.dispatchEvent("input");
  await petTypeNameField.dispatchEvent("change");
  await expect(petTypeNameField).toHaveValue("cat");
  await expect(updateButton).toBeVisible();
  await expect(updateButton).toBeEnabled();
  await updateButton.click();

  //9. Add the assertion that the first pet type in the list of names has a value "cat" */
  await expect(inputs.first()).toHaveValue("cat");
});
