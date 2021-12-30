module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
    },
    settings: {
        react: {
            version: "17.0.1",
        },
    },
    extends: ["eslint:recommended", "plugin:react/recommended", "plugin:prettier/recommended"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: ["react", "react-hooks", "prettier"],
    rules: {
        "prettier/prettier": "warn",
        quotes: ["off", "single"],
        "max-len": 1,
        "no-var": 2,
        code: 120,
        tabWidth: 4,
        "import/no-unresolved": 2,
        "import/extensions": 2
    },
    globals: {
        module: "readonly",
        require: "readonly",
        process: "readonly",
    },
};
