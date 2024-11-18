// @ts-check
import antfu from '@antfu/eslint-config'
import pluginCypress from 'eslint-plugin-cypress/flat'

export default antfu({
  unocss: true,
  formatters: true,
  plugins: {
    cypress: pluginCypress,

  },
  ...pluginCypress.configs.globals,
})
