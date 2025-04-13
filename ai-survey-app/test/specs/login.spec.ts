// connection from module exports LoginPageModel. 
// Importing exported class structure.
import { describe, it, before, after, expect, $ } from '@wdio/globals';
import LoginPage from '../pageObjects/LoginPage';

// Mocha Test Framework -- Test Case Structure 1
// describe() defines the test group under Login Page Test Case(Scenario)
// it() defines a test scenario.
// re-use of submitLoginForm method.
describe('Login Page Test Case', () => {
    // Before each test, perform any setup actions
    before(async () => {
        // Launching the application
        await driver.launchApp();
    });

    it('should redirect user to survey screen after successful login', async () => {
        await LoginPage.submitLoginForm('test123@yopmail.com', 'pass123');

        // Verify survey page header is displayed
        const surveyHeader = await $('~Heading-Survey');
        await expect(surveyHeader).toBeDisplayed();
    });

    // After each test, for clarence perform clean-up actions
    after(async () => {
        // Ending the session method
        await driver.closeApp();
    });
});