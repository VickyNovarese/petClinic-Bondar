import { test, expect } from "@playwright/test";


test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Home page is opened and Welcome message is displayed", async ({
  page,
}) => {
  await expect(page.locator(".title")).toHaveText("Welcome to Petclinic");
});

test("Pet types are displayed correctly", async ({ page }) => {
  
  const expectedPetTypes = [
    "cat",
    "dog",
    "lizard",
    "snake",
    "bird",
    "hamster",
    "monkey",
  ];
  //1. Select the PET TYPES menu item in the navigation bar
  await page.getByTitle("pettypes").click();  
  //2. Add assertion of the "Pet Types" text displayed above the table with the list of pet types
  const inputs = page.locator('#pettypes tbody input[name="pettype_name"]');
  await expect(inputs.first()).toBeVisible();
  const countPetTypes = await inputs.count();
  const petTypes: string[] = [];
  for (let i = 0; i < countPetTypes; i++) {
    const name = await inputs.nth(i).inputValue();
    petTypes.push(name);
  }
  console.log("Pet Types:", petTypes);
  expect(expectedPetTypes).toEqual(petTypes);
  //3.Click on "Edit" button for the "cat" pet type
  const catRow = page.getByRole("row", { name: "cat" });
  await catRow.locator('button:has-text("Edit")').click();
  //4. Add assertion of the "Edit Pet Type" text displayed
  expect(await page.locator("h2").textContent()).toBe("Edit Pet Type");
  //5. Change the pet type name from "cat" to "rabbit" and click "Update" button
  const input = page.locator("input#name");
  await input.click();
  await input.press("Control+A");
  await input.press("Backspace");
  await expect(input).toHaveValue("");
  await input.pressSequentially("rabbit", { delay: 100 });
  await page.getByRole("button", { name: "update" }).click()
   //6. Add the assertion that the first pet type in the list of types has a value "rabbit"
  expect(await inputs.first().inputValue()).toBe("rabbit");
  //7. Click on "Edit" button for the same "rabbit" pet type
  const rabbitRow = page.getByRole("row", { name: "rabbit" });
  //8. Change the pet type name back from "rabbit" to "cat" and click "Update" button
  await rabbitRow.locator('button:has-text("Edit")').click();
  await input.click();
  await input.press("Control+A");
  await input.press("Backspace");
  await expect(input).toHaveValue("");
  await input.fill("")
  await input.pressSequentially("cat", { delay: 100 });
  await page.getByRole("button", { name: "update" }).click();
  //9. Add the assertion that the first pet type in the list of names has a value "cat" */
  expect(await inputs.first().inputValue()).toBe("cat");
});
