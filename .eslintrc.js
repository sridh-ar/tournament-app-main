module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    // extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
    extends: [],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', 'prettier'],
    rules: {
        'prettier/prettier': 'error',
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
