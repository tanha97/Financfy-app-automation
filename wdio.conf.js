const path = require('path')

exports.config = {
  runner: 'local',
  path: '/',
  host: '127.0.0.1',
  port: 4723, // Specify the port you want Appium to use
  specs: ['./test/specs/**/sales.js'],
  exclude: [],
  maxInstances: 10,
  capabilities: [
    {
      platformName: 'Android',
      'appium:deviceName': 'Pixel 4',
      'appium:platformVersion': '14.0',
      'appium:automationName': 'UIAutomator2',
      'appium:app': path.join(process.cwd(), 'androidApp/app (Aug-2).apk'),
      //'appium:noReset': true,
      'appium:fullReset': true,
      'appium:autoGrantPermissions': true,
      'appium:chromedriverAutodownload': true,
      'appium:chromedriverExecutable':
        'C:\\Users\\user\\Downloads\\chromedriver_win32\\chromedriver.exe',
    },
  ],
  logLevel: 'info',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },

  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true,
      },
    ],
  ],
  services: [
    ['appium'],
    [
      'visual',
      {
        isHybridApp: true, // ✅ Important for Appium
        autoSaveBaseline: true,
        baselineFolder: path.join(process.cwd(), 'tmp/baseline'),
        screenshotPath: path.join(process.cwd(), 'tmp'),
        formatImageName: '{tag}',
        savePerInstance: false, // optional – disables adding instance name to filename
      },
    ],
  ],
  // This will manage the Appium server for you
  appium: {
    command: 'appium.cmd', // Ensure Appium is correctly referenced on Windows
    args: {
      port: 4723, // Specify the port Appium should run on
      relaxedSecurity: true,
    },
  },
  // Remove the manual start/stop logic since Appium service takes care of it
  beforeSession: async function (config, capabilities) {
    console.log(
      'Before session: Appium server will start automatically via the service.'
    )
  },
  afterSession: async function (config, capabilities, result) {
    console.log(
      'After session: Appium server will stop automatically via the service.'
    )
  },
}
