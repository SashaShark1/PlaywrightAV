import { Page, Locator } from "@playwright/test";
import {logger as loggerHelper} from '../logger'

export class LoginPage {
    public readonly page: Page;
    public readonly emailField: Locator;
    public readonly passField: Locator;
    public readonly loginBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailField = page.locator('//input[@name="email"]');
        this.passField = page.locator('//input[@name="password"]')
        this.loginBtn = page.locator('//input[@value="Login"]')
    }

    public goto() {
        return this.page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/login')
    }

    public fillEmail(email: string) {
        return this.emailField.fill(email)
    }

    public fillPassword(password: string) {
        return this.passField.fill(password)
    }

    public clickLogBtn() {
        return this.loginBtn.click()
    }

    public async fullLogin(email: string, password: string){        
        await this.fillEmail(email)
        loggerHelper.error('Email failed typing')
        await this.fillPassword(password)
        loggerHelper.error('Password failed typing')
        await this.clickLogBtn()
    }




}