AI Survey App - Automated Testing with Appium

This project contains automated tests for the AI Survey App built with Expo and React Native. We use Appium for end-to-end testing and follow the Page Object Model (POM) pattern for maintainable test code.

Table of Contents

Installation
Project Structure
Running Tests
Dependencies
Installation

Prerequisites
Node.js, npm/yarn
Expo CLI
Appium
Setup
Clone the repository:
git clone https://github.com/your-repository-name/ai-survey-app.git
cd ai-survey-app
Install dependencies:
npm install
Install Appium:
npm install -g appium
Run Expo:
expo start
Install Appium drivers:
appium driver install uiautomator2
Emulator Setup
Android: Run with expo run:android
iOS: Run with expo run:ios
Project Structure

.
├── app/                 # React Native code
├── test/                # Automated tests
│   ├── specs/           # Test cases
│   ├── helpers/         # Test helpers
│   └── config/          # Appium config
└── README.md            # Project documentation
Running Tests

Start Appium server for Android/iOS:

appium --platform-name Android --device-name "Android Emulator" --app /path/to/app.apk
Run tests with:

npx wdio run wdio.conf.js
Dependencies

Appium: Automates mobile apps.
WebDriverIO: Manages interactions with Appium.
Mocha: Test framework.
Chai: Assertion library.
Expo: For React Native development.
Install required dependencies:

npm install --save-dev appium @wdio/cli @wdio/mocha-framework chai
