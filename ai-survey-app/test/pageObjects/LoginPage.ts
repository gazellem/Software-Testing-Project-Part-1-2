// necessary global definition for ts
import { $ } from '@wdio/globals';  

class LoginPage {
    //* Getting input fields email, password and login button 
    //  from login.ts using getter */

    get inputEmail()  {
         return $('~inputEmail-Login'); // inputEmail-Login is testID from login.ts.
    }
    get inputPassword()  {
         return $('~inputPassword-Login'); // inputPassword-Login is testID from login.ts.
    }
    get inputLoginButton()  {
         return $('~inputLoginButton-Login'); // inputLoginButton-Login is testID from login.ts.
    }

    // this method is used to create re-usable standard to fill credentials
    async submitLoginForm(inputEmail: string, inputPassword: string): Promise<void> {

        // set email
        await this.inputEmail.setValue(inputEmail);
        // set password
        await this.inputPassword.setValue(inputPassword);
        // click Login button after credentials are entered.
    await this.inputLoginButton.click();
    }

}

// This helps us exporting this class out. 
// Now, this LoginPage class is available for us
// calling it from login.spec.js via require.
export default new LoginPage();


