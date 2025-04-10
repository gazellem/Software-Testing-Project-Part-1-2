// connection from module exports LoginPage.
const LoginPage = require('../pageobjects/LoginPage');

// Mocha Test Framework -- Test Scenario Structure 1
describe('Login Page Test', () => {
    it('Success for Login -- Valid Credentials', async () => {
        await LoginPage.login('test123@yopmail.com', 'pass123');

        await expect(LoginPage.inputEmail).not.toBeDisplayed();
    });
  });