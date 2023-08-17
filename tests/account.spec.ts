import {test, expect  } from "@playwright/test";
import {MainPage }  from '../POM/mainPage'
import {LoginPage} from '../POM/loginPage'
import {User} from '../testData/loginData'
import { AccountMenuPage } from "../POM/accMenuPage";
import { EditPage } from "../POM/editPage";
import {logger as loggerHelper} from '../logger'

// function random(){
//   return Math.floor(Math.random() * 999)
// }
test.describe('Testing account page', ()=> {
  let main: MainPage;
  let login: LoginPage;
  let accMenu: AccountMenuPage;
  let edit: EditPage;
    
test.beforeAll(async () => {      
    test.setTimeout(60000);
  });
    
test.afterEach(async ({page}) => {      
    await page.waitForTimeout(3000)
  });

test.beforeEach(async ({page}) => {      
    main = new MainPage(page)
    login = new LoginPage(page)
    accMenu = new AccountMenuPage(page)
    edit = new EditPage(page)
  })

    test(`Login links redirect to login form`, async ({page}) => { 
        loggerHelper.fatal('MainPage failed load')
      await main.goto()   
        await main.hoverAccLink()
        await main.clickLoginLink()       
        expect(page.url()).toBe("https://ecommerce-playground.lambdatest.io/index.php?route=account/login")
    })

    test(`Successful log in`, async ({page}) => { 
      await login.goto() 
      await login.fullLogin(User.logEmail, User.password)
      
      const newUrl = `https://ecommerce-playground.lambdatest.io/index.php?route=account/account`
      expect(page.url()).toBe(newUrl)
    })

    test(`Edit section is opened`, async ({page}) => { 
      await login.goto() 
      await login.fullLogin(User.logEmail, User.password)  
      await accMenu.clickEditInfo()
      const newUrl = 'https://ecommerce-playground.lambdatest.io/index.php?route=account/edit'
      expect(page.url()).toBe(newUrl)     
    })

    test(`Edit account name and last name`, async ({page}) => { 
      await login.goto() 
      await login.fullLogin(User.logEmail, User.password)  
      await accMenu.clickEditInfo()
      await edit.fullEdit('John', 'Deph', '159034')
      const visible = await accMenu.checkAlert()
      expect(visible).toBeTruthy()
      const text = await accMenu.checkTextAlert()
      expect(text).toBe(' Success: Your account has been successfully updated.')    
    })

    test(`Edited data is saved after logout:name`, async ({page}) => { 
      const defname = 'Marry'     
      await login.goto() 
      await login.fullLogin(User.logEmail, User.password)  
      await accMenu.clickEditInfo()
      await edit.editName(defname)
      await edit.clickContinue()     
      await accMenu.clickLogout()
      await accMenu.clickLogin()
      await login.fullLogin(User.logEmail, User.password)  
      await accMenu.clickEditInfo()
      const newName = await edit.getName()      
      expect(newName).toBe(defname)    
    })

    test(`Edited data is saved after logout: lastname`, async ({page}) => { 
      const last = 'Watson'  
      await login.goto() 
      await login.fullLogin(User.logEmail, User.password)  
      await accMenu.clickEditInfo()
      await edit.editLastName(last)
      await edit.clickContinue()      
      await accMenu.clickLogout()
      await accMenu.clickLogin()
      await login.fullLogin(User.logEmail, User.password)  
      await accMenu.clickEditInfo()      
      const lastN = await edit.getLastName()    
      expect(lastN).toBe(last) 
    })
    
    test(`Edited data is saved after logout: phone`, async ({page}) => { 
      const defPhone = '123456'
      await login.goto() 
      await login.fullLogin(User.logEmail, User.password)  
      await accMenu.clickEditInfo()
      await edit.editPhone(defPhone)
      await edit.clickContinue()      
      await accMenu.clickLogout()
      await accMenu.clickLogin()
      await login.fullLogin(User.logEmail, User.password)  
      await accMenu.clickEditInfo()      
      const phone= await edit.getPhone()     
      expect(phone).toBe(defPhone)   
    })
})