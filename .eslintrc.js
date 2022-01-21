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
        "import/resolver": {
            "node": {
                "extensions": [".js", ".jsx", ".ts", ".tsx"]
            }
        }
    },
    extends: ["eslint:recommended", "plugin:react/recommended", "plugin:prettier/recommended"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: ["import", "react", "react-hooks", "prettier"],
    rules: {
        "prettier/prettier": "warn",
        quotes: ["off", "single"],
        "no-var": 2,
        "import/no-unresolved": 2,
        "import/extensions": 2,
        'max-len': ["warn", { "code": 120 }]
    },
    globals: {
        module: "readonly",
        require: "readonly",
        process: "readonly",
    },
};
