exports.config = {
    runner: 'local',
    path: '/',
    port: 4723,
  
    specs: ['./test/specs/**/*.js'],
  
    maxInstances: 1,
    capabilities: [{
      platformName: 'Android',
      'appium:deviceName': 'emulator-5554',
      'appium:platformVersion': '11.0',
      'appium:app': '/Users/melisaonaran/Desktop/Software-Testing-Project-Part-1-2-main/app-debug.apk',
      'appium:automationName': 'UiAutomator2'
    }],
  
    logLevel: 'info',
    framework: 'mocha',
    reporters: ['spec'],
  
    mochaOpts: {
      timeout: 60000
    }
  }
  