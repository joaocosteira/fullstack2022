
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '4w8atm',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
