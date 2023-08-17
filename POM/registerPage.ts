import { Page, Locator } from "@playwright/test";

export class RegisterPage {
  public readonly page: Page;
  public readonly firstName: Locator;
  public readonly lastName: Locator;
  public readonly emailInput: Locator;
  public readonly phoneInput: Locator;
  public readonly passInput: Locator;
  public readonly confirmInput: Locator;
  public readonly continueBtn: Locator;
  public readonly agreeCheck: Locator;
  public readonly regTitle: Locator;
  public readonly alertInfo: Locator;
  public readonly inputDanger: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator("//input[@name='firstname']");
    this.lastName = page.locator("//input[@name='lastname']");
    this.emailInput = page.locator("//input[@name='email']");
    this.phoneInput = page.locator("//input[@name='telephone']");
    this.passInput = page.locator("//input[@name='password']");
    this.confirmInput = page.locator("//input[@name='confirm']");
    this.continueBtn = page.locator("//input[@value='Continue']");
    this.agreeCheck = page.locator("//label[@for='input-agree']");
    this.regTitle = page.locator("//h1[@class='page-title h3']");
    this.alertInfo = page.locator(
      "//div[contains(@class, 'alert-dismissible')]"
    );
    this.inputDanger = page.locator("//div[contains(@class, 'text-danger')]");
  }

  public goto() {
    return this.page.goto(
      "https://ecommerce-playground.lambdatest.io/index.php?route=account/register"
    );
  }

  public getText() {
    return this.regTitle.textContent();
  }

  public fillFirstName(name: string) {
    return this.firstName.fill(name);
  }

  public fillLastName(name: string) {
    return this.lastName.fill(name);
  }

  public fillEmail(email: string) {
    return this.emailInput.fill(email);
  }

  public fillPhone(phone: string) {
    return this.phoneInput.fill(phone);
  }

  public fillPassword(password: string) {
    return this.passInput.fill(password);
  }

  public fillConfirm(password: string) {
    return this.confirmInput.fill(password);
  }

  public pressCheck() {
    return this.agreeCheck.check();
  }

  public pressContinue() {
    return this.continueBtn.click();
  }

  public async fillData(
    fname: string,
    lname: string,
    email: string,
    phone: string
  ) {
    await this.fillFirstName(fname);
    await this.fillLastName(lname);
    await this.fillEmail(email);
    await this.fillPhone(phone);
  }

  public async fillAllPass(pass: string, confirm: string) {
    await this.fillPassword(pass);
    await this.fillConfirm(confirm);
  }
  public async pressRegBtn() {
    await this.pressCheck();
    await this.pressContinue();
  }

  public checkAlert() {
    this.alertInfo.waitFor({ state: "visible" });
    return this.alertInfo.isVisible();
  }

  public checkTextAlert() {
    this.alertInfo.waitFor({ state: "visible" });
    return this.alertInfo.textContent();
  }

  public checkInputDanger() {
    this.inputDanger.waitFor({ state: "visible" });
    return this.inputDanger.isVisible();
  }

  public getInputDangText() {
    this.inputDanger.waitFor({ state: "visible" });
    return this.inputDanger.textContent();
  }
}
