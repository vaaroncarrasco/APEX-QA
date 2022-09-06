const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://www.liverpool.com.mx/',
    userAgent: "axios/0.18.0"
  },
  retries: {
    "runMode": 3,
    "openMode": 2
  }

});
