// module.exports = {
//   parser: '@typescript-eslint/parser',
//   parserOptions: {
//     project: 'tsconfig.json',
//     tsconfigRootDir : __dirname,
//     sourceType: 'module',
//   },
//   plugins: ['@typescript-eslint/eslint-plugin'],
//   extends: [
//     'plugin:@typescript-eslint/recommended',
//     'plugin:prettier/recommended',
//   ],
//   root: true,
//   env: {
//     node: true,
//     jest: true,
//   },
//   ignorePatterns: ['.eslintrc.js'],
//   rules: {
//     '@typescript-eslint/interface-name-prefix': 'off',
//     '@typescript-eslint/explicit-function-return-type': 'off',
//     '@typescript-eslint/explicit-module-boundary-types': 'off',
//     '@typescript-eslint/no-explicit-any': 'off',
//   },
// };
module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
        jest: true,
    },
    extends: [
        'eslint:recommended',
    ],
    plugins: ['prettier'],

    parser: '@typescript-eslint/parser',
    overrides: [
        {
            files: ['*.ts'], // Your TypeScript files extension

            // As mentioned in the comments, you should extend TypeScript plugins here,
            // instead of extending them outside the `overrides`.
            // If you don't want to extend any rules, you don't need an `extends` attribute.
            extends: [
                'plugin:@typescript-eslint/recommended',
                'plugin:@typescript-eslint/recommended-requiring-type-checking',
            ],

            parserOptions: {
                sourceType: 'module',
                ecmaVersion: 2020,
                project: './tsconfig.json',
            },
            rules: {
                '@typescript-eslint/no-floating-promises': 'warn',
                '@typescript-eslint/no-unsafe-assignment': 'warn',
                '@typescript-eslint/no-unsafe-call': 'warn',
                '@typescript-eslint/no-unsafe-member-access': 'warn',
                '@typescript-eslint/no-unsafe-return': 'warn',
                '@typescript-eslint/restrict-template-expressions': [
                    'warn',
                    {'allowNumber': true, 'allowNullish': true}],
            },
        },
    ],

    rules: {
        'prettier/prettier': ['error'],
        quotes: ['error', 'single', {allowTemplateLiterals: true}],
        semi: ['warn', 'always'],
        'no-console': 'off',
        'no-unused-vars': 'warn',
        'no-inner-declarations': 'warn',
        'no-useless-escape': 'warn',
        'no-debugger': 'warn',
    },
};
