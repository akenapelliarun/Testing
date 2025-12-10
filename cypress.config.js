const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');
const fs = require('fs');

module.exports = defineConfig({
  watchForFileChanges: false,
  video: true, // Enable video recording
  e2e: {
    viewportWidth: 1600,
    viewportHeight: 900,
    defaultCommandTimeout: 15000, // Increased to 15 seconds for better stability
    pageLoadTimeout: 60000, // 60 seconds for page loads
    requestTimeout: 30000, // 30 seconds for API requests
    responseTimeout: 30000, // 30 seconds for API responses
    video: true,
    chromeWebSecurity: false,
    screenshotsFolder: 'images',
    retries: {
      runMode: 1, // Retry failed tests 3 times in CI/CD (headless mode)
      openMode: 1, // Retry failed tests 3 times in interactive mode (UI)
    },
    async setupNodeEvents(on, config) {
      // Implement cucumber preprocessor plugin FIRST
      await addCucumberPreprocessorPlugin(on, config);

      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // Custom task handlers only
      on('task', {
        log(message) {
          console.log('[CYPRESS LOG]:', message);
          return null;
        },
      });
      
      // Return the updated config
      return config;
    },
    specPattern: 'cypress/integration/feature/**/*.feature',
  },
  env: {
    testnet: 'https://testnet.resuefas.vip',
    mainnet: 'https://app.resuefas.vip',
    activeEnv: 'testnet', // Change to 'mainnet' for production
  },
  // Add the following options to manage memory usage
  experimentalMemoryManagement: true,
  numTestsKeptInMemory: 5,
});
