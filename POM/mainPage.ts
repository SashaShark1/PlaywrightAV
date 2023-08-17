import { Page, Locator } from "@playwright/test";

export class MainPage {
    public readonly page: Page;
    public readonly accountLink : Locator;
    public readonly registerLink: Locator;  
    public readonly loginLink: Locator;  
    
    constructor(page: Page) {
        this.page = page
        this.accountLink = page.locator('//a[@role="button"]//span[contains(text(),"My account")]')
        this.registerLink = page.locator('//span[contains(text(),"Register")]')
        this.loginLink = page.locator('//span[contains(text(),"Login")]')
    }
    public goto() {
      return this.page.goto('https://ecommerce-playground.lambdatest.io/')
    }

    public hoverAccLink() {
       return this.accountLink.hover()
    }

    public clickRegisterLink() { 
        this.registerLink.waitFor({state: 'visible'})   
        return this.registerLink.click()
    }

    public clickLoginLink() { 
        this.loginLink.waitFor({state: 'visible'})   
        return this.loginLink.click()
    }    
}