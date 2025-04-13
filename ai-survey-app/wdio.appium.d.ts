// Extend WebdriverIO interfaces for Appium commands
declare namespace WebdriverIO {
    interface Browser {
        launchApp(): Promise<void>;
        closeApp(): Promise<void>;
    }
}