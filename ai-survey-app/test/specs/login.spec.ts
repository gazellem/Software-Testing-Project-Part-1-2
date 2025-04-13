import loginPage from '../pageObjects/LoginPage';
import { browser, $, expect } from '@wdio/globals'; // Added explicit expect

// Remove Mocha type declarations (they're already handled by @wdio/globals)
// --------------------------------------------------

// Add global Mocha type declarations
declare const describe: (name: string, suite: () => void) => void;
declare const it: (name: string, test: () => Promise<void>) => void;
declare const before: (hook: () => Promise<void>) => void;
declare const after: (hook: () => Promise<void>) => void;

describe('Login Page Test Case', () => {
  before(async () => {
    await browser.launchApp();
  });

  it('should redirect to survey screen', async () => {
    
    await loginPage.submitLoginForm('test123@yopmail.com', 'pass123');
    
    const surveyHeader = await $('~Heading-Survey');
    await surveyHeader.waitForDisplayed({ timeout: 15000 });
    await expect(surveyHeader).toBeDisplayed();
  });

  after(async () => {
    await browser.closeApp();
  });
});