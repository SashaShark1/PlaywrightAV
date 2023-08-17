import { Page, Locator } from "@playwright/test";
import {logger as loggerHelper} from '../logger'

export class EditPage {
    public readonly page: Page;
    public readonly firstName: Locator;
    public readonly lastName: Locator;
    public readonly phone: Locator;
    public readonly continueBtn: Locator;     
   
    constructor(page: Page) {
        this.page = page;
        this.firstName = page.locator('//input[@name="firstname"]')
        this.lastName = page.locator('//input[@name="lastname"]')
        this.phone = page.locator('//input[@name="telephone"]')
        this.continueBtn = page.locator('//input[@value="Continue"]')       
    }

    public editName(name: string){
        loggerHelper.info('firstname typing')
        this.firstName.clear()
        return this.firstName.type(name)
    }

    public editLastName(name: string){
        this.lastName.clear()
        return this.lastName.type(name)
    }

    public editPhone(tel: string){
        this.phone.clear()
        return this.phone.type(tel)
    }

    public clickContinue(){
        loggerHelper.debug('Click continueBtn')
        return this.continueBtn.click()
    }

    public async fullEdit(name: string, lastN: string, tel: string) {
       await this.editName(name)
       await this.editLastName(lastN)
       await this.editPhone(tel)
       await this.clickContinue()
    }

    public getName() {        
        this.firstName.waitFor({state: 'attached'})
        return this.firstName.inputValue()
    }

    public getLastName() {        
        this.lastName.waitFor({state: 'attached'})
        return this.lastName.inputValue()
    }

    public getPhone() {
        // this.page.waitForNavigation()
        this.phone.waitFor({state: 'attached'})
        return this.phone.inputValue()
    }
}