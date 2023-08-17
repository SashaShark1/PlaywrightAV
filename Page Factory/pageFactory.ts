import {Pages} from './pageEnum' 
import {MainPage }  from '../POM/mainPage'
import {RegisterPage} from '../POM/registerPage'
import { AccountMenuPage } from "../POM/accMenuPage";
import { EditPage } from "../POM/editPage";
import {LoginPage} from '../POM/loginPage'
import { Page } from "@playwright/test";

export class PageFactory {
    public static page: Page;
    
    public static getPage(pageName: Pages.main): MainPage;
    public static getPage(pageName: Pages.register):RegisterPage;
    public static getPage(pageName: Pages.login): LoginPage;
    public static getPage(pageName: Pages.accountMenu):AccountMenuPage;
    public static getPage(pageName: Pages.edit):EditPage;
    public static getPage(pageName: Pages) {
        switch(pageName) {
            case Pages.main: 
            return new MainPage(this.page);
            case Pages.register: 
            return new RegisterPage(this.page);
            case Pages.login: 
            return new LoginPage(this.page);
            case Pages.accountMenu: 
            return new AccountMenuPage(this.page);
            case Pages.edit: 
            return new EditPage(this.page);
            default:  throw new Error(`PageFactory is not implemented for ${pageName} `)
            break;
        }
    }

}

