export const config = {
  runner: 'local',
  framework: 'mocha',
  testRunner: 'local',

  specs: ['./tests/**/*.ts'], // Update path if needed
  maxInstances: 1,

  services: ['chromedriver', 'appium'],

  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:app': './path/to/app.apk',
    'appium:deviceName': 'Pixel_5'
  }],

  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
    require: ['ts-node/register'],
  },
};
