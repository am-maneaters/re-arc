module.exports = {
  env: {
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:unicorn/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: [
    'react',
    '@typescript-eslint',
    'prettier',
    'unicorn',
    'simple-import-sort',
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  rules: {
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: '(useWatchState)',
      },
    ],
    'unicorn/prevent-abbreviations': 0,
    'unicorn/filename-case': 0,
    'unicorn/no-null': 0,
    'unicorn/no-useless-undefined': 0,
    'unicorn/prefer-string-slice': 0,
    'unicorn/consistent-function-scoping': 0,
    'react/prop-types': 0,
    '@typescript-eslint/no-empty-function': 0,
    'react/function-component-definition': 0,
    'react/react-in-jsx-scope': 0,
    'react/self-closing-comp': 2,
    'react/jsx-curly-brace-presence': [
      1,
      { props: 'never', children: 'never', propElementValues: 'always' },
    ],
    'jsx-quotes': [2, 'prefer-double'],
    'arrow-body-style': [2, 'as-needed'],
    'object-shorthand': [2, 'always'],
    'prettier/prettier': ['warn', {}, { usePrettierrc: true }],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
};
