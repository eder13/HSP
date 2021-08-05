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
        "prettier/prettier": "error",
        quotes: ["off", "single"],
    },
    globals: {
        module: "readonly",
        require: "readonly",
        process: "readonly",
    },
};
