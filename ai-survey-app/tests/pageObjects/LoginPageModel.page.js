class LoginPageModel {
    //* Getting input fields email, password and login button 
    //  from login.jsx using getter */

    get inputEmail()  {
         return $('~inputEmail-Login'); // inputEmail-Login is testID from login.jsx.
    }
    get inputPassword()  {
         return $('~inputPassword-Login'); // inputPassword-Login is testID from login.jsx.
    }
    get inputLoginButton()  {
         return $('~inputLoginButton-Login'); // inputLoginButton-Login is testID from login.jsx.
    }

    // this method is used to create re-usable standard to fill credentials
    async submitLoginForm(inputEmail, inputPassword) {

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
module.exports = new LoginPageModel();

