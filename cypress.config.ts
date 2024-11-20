// eslint-disable-next-line ts/no-require-imports
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
    setupNodeEvents(on, config) {
      // eslint-disable-next-line ts/no-require-imports
      require('@cypress/code-coverage/task')(on, config)

      return config
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
