module.exports = {
    rules: {
      'arrow-parens': ['warn', 'as-needed'],
      curly: 'warn',
      complexity: ['warn', 20],
      'dot-notation': ['warn', { allowKeywords: false }],
      'max-params': ['warn', 5],
      'no-alert': 'warn',
      'no-debugger': 'warn',
      'no-irregular-whitespace': 'warn',
      'no-multiple-empty-lines': ['warn', { max: 2 }],
      'no-param-reassign': 'warn',
      'prefer-arrow-callback': 'warn',
      'quote-props': ['warn', 'as-needed', { keywords: true }],
      'no-var': 'warn',
      quotes: ['warn', 'single'],
  
      'react/no-did-mount-set-state': 'warn',
      'react/no-did-update-set-state': 'warn',
      'react/self-closing-comp': 'warn',
      'react/prefer-es6-class': ['warn', 'always'],
      'react/jsx-wrap-multilines': 'warn',
  
      'flowtype/boolean-style': ['warn', 'boolean'],
      'flowtype/generic-spacing': ['warn', 'never'],
      'flowtype/no-dupe-keys': 'warn',
      'flowtype/no-primitive-constructor-types': 'warn',
      'flowtype/no-weak-types': 'warn'
    }
  }
  