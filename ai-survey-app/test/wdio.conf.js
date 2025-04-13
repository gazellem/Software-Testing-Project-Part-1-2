exports.config = {
  runner: 'local',
  specs: [
    './tests/specs/**/*.js', // path to your spec files
  ],
  exclude: [
    // exclude files you don't want to run
  ],
  maxInstances: 1,
  capabilities: [
    {
      platformName: 'Android', // or 'iOS' for iOS
      deviceName: 'Android Emulator', // name of the emulator/device
      app: '/path/to/your/app.apk', // path to your React Native app (for Android) or .app (for iOS)
      automationName: 'UiAutomator2', // for Android
      platformVersion: '11.0', // your platform version
      appPackage: 'com.yourapp', // package name for Android
      appActivity: 'com.yourapp.MainActivity', // main activity for Android
    }
  ],
  services: ['appium'],
  logLevel: 'info',
  framework: 'mocha',
  reporters: ['dot'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000, // test timeout
  },
};
