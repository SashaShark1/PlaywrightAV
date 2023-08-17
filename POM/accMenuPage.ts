import { Page, Locator } from "@playwright/test";

export class AccountMenuPage {
    public readonly page: Page;
    public readonly editInfo: Locator;
    public readonly logOut: Locator;
    public readonly alertInfo: Locator;
    public readonly login: Locator;
   
    constructor(page: Page) {
        this.page = page;
        this.editInfo = page.locator('//a[contains(text(), "Edit your")]')
        this.logOut = page.locator('//a[contains(text(),"Logout")]')
        this.alertInfo= page.locator("//div[contains(@class, 'alert-dismissible')]")
        this.login= page.locator("//a[contains(text(),'Login')]")
    }

    public goto() {
        return this.page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/account')
    }

    public clickEditInfo() {
        return this.editInfo.click()
    }

    public clickLogout() {
        this.page.waitForNavigation()
        this.logOut.waitFor({state: "visible"})
        return this.logOut.click()
    }

    public clickLogin() {
        this.page.waitForNavigation()
        this.login.waitFor({state: "visible"})
        return this.login.click()
    }

    public checkAlert() {
        this.alertInfo.waitFor({state: 'visible'})
        return this.alertInfo.isVisible()
    }

    public checkTextAlert() {
        this.alertInfo.waitFor({state: 'visible'})
     return this.alertInfo.textContent()
    }
}