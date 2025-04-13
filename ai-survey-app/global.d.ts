// Extend WebdriverIO interfaces
declare namespace WebdriverIO {
    interface Browser {
      launchApp(): Promise<void>;
      closeApp(): Promise<void>;
    }
  }
  
  // Include Mocha globals
  declare const describe: Mocha.SuiteFunction;
  declare const it: Mocha.TestFunction;
  declare const before: Mocha.HookFunction;
  declare const after: Mocha.HookFunction;