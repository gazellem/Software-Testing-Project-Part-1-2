class LoginPage {
    //* Finding login parameters from login.jsx via get parameter */

    get inputEmail()  { return $('~inputEmail-Login'); }
    get inputPassword()  { return $('~inputPassword-Login'); }
    get inputLoginButton()  { return $('~inputLoginButton-Login'); }

    /**
    * login parameters
    * @param {string} email
    * @param {string} password
   */

    async login(email, password) {
        // wait until inputEmail to be displayed.
        await this.inputEmail-Login.waitForDisplayed();
        // set email
        await this.inputEmail-Login.setValue(email);
        await this.inputPassword-Login.setValue(password);
        // click Login button after credentials are entered.
    await this.inputLoginButton-Login.click();
    }

}

module.exports = new LoginPage();


