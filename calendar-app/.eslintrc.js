const eslintConfig = require('eslint-config-react-app')

const extendedRules = require('./extended-eslint-rules')
const extendedEslintConfig = { ...eslintConfig, ...extendedRules }
if (process.env.CI) {
  const newEslintConfig = { ...extendedEslintConfig }

  Object.keys(extendedEslintConfig.rules).forEach(key => {
    const rule = extendedEslintConfig.rules[key]

    if (Array.isArray(rule)) {
      const [errorLevel, ...ruleConfig] = rule

      newEslintConfig.rules[key] = ['error', ...ruleConfig]
    } else if (typeof rule === 'string') {
      newEslintConfig.rules[key] = 'error'
    }
  })
  module.exports = newEslintConfig
} else {
  module.exports = extendedEslintConfig
}
