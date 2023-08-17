// import { PageFactory } from '../Page Factory/pageFactory';
// import { Pages } from '../Page Factory/pageEnum';
import { Page, test, expect } from "@playwright/test";
import { MainPage } from "../POM/mainPage";
import { RegisterPage } from "../POM/registerPage";
import { User } from "../testData/loginData";

test.describe("Testing registration page", () => {
  let main: MainPage;
  let register: RegisterPage;

  test.beforeAll(async () => {
    test.setTimeout(60000);
  });

  test.afterEach(async ({ page }) => {
    await page.waitForTimeout(3000);
  });

  test.beforeEach(async ({ page }) => {
    main = new MainPage(page);
    register = new RegisterPage(page);
  });

  test(`Registration links redirect to registration form`, async ({ page }) => {
    await main.goto();
    await main.hoverAccLink();
    await main.clickRegisterLink();
    const text = await register.getText();
    expect(text).toBe("Register Account");
    expect(page.url()).toBe(
      "https://ecommerce-playground.lambdatest.io/index.php?route=account/register"
    );
  });

  test(`Successfull registration with valid data`, async ({ page }) => {
    await register.goto();
    await register.fillData(
      User.name,
      User.lastName,
      User.changeEmail,
      User.phone
    );
    await register.fillAllPass(User.password, User.confirm);
    await register.pressRegBtn();
    const newUrl =
      "https://ecommerce-playground.lambdatest.io/index.php?route=account/success";
    expect(page.url()).toBe(newUrl);
  });

  test(`Failed registration without policy agreement`, async ({ page }) => {
    await register.goto();
    await register.fillData(
      User.name,
      User.lastName,
      User.changeEmail,
      User.phone
    );
    await register.fillAllPass(User.password, User.confirm);
    await register.pressContinue();
    const visible = await register.checkAlert();
    expect(visible).toBeTruthy();
    const text = await register.checkTextAlert();
    expect(text).toBe(" Warning: You must agree to the Privacy Policy!");
  });

  test(`Failed registration with empty first name`, async ({ page }) => {
    await register.goto();
    await register.fillData("", User.lastName, User.changeEmail, User.phone);
    await register.fillAllPass(User.password, User.confirm);
    await register.pressRegBtn();
    const visible = await register.checkInputDanger();
    expect(visible).toBeTruthy();
    const text = await register.getInputDangText();
    expect(text).toBe("First Name must be between 1 and 32 characters!");
  });

  test(`Successful registration with 1 symbol first name`, async ({ page }) => {
    await register.goto();
    await register.fillData("T", User.lastName, User.changeEmail, User.phone);
    await register.fillAllPass(User.password, User.confirm);
    await register.pressRegBtn();
    const newUrl =
      "https://ecommerce-playground.lambdatest.io/index.php?route=account/success";
    await page.waitForLoadState("load");
    expect(page.url()).toBe(newUrl);
  });

  test(`Successful registration with 32 symbols first name`, async ({
    page,
  }) => {
    const name = "Tomtomtomtomtomtomtomtomtomtomto";
    await register.goto();
    await register.fillData(name, User.lastName, User.changeEmail, User.phone);
    await register.fillAllPass(User.password, User.confirm);
    await register.pressRegBtn();
    const newUrl =
      "https://ecommerce-playground.lambdatest.io/index.php?route=account/success";

    expect(page.url()).toBe(newUrl);
  });

  test.only(`Failed registration with 33 symbols first name`, async ({ page }) => {
    const name = "Tomtomtomtomtomtomtomtomtomtomtom";
    await register.goto();
    await register.fillData(name, User.lastName, User.changeEmail, User.phone);
    await register.fillAllPass(User.password, User.confirm);
    await register.pressRegBtn();
    const visible = await register.checkInputDanger();
    expect(visible).toBeTruthy();
    const text = await register.getInputDangText();
    expect(text).toBe("First Name must be between 1 and 32 characters!");
  });
});
