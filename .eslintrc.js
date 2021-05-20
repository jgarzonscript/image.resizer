module.exports = {
    root: true,
    env: {
        commonjs: true,
        node: true,
        browser: true,
        es6: true,
        jest: true
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
        ecmaFeatures: {
            modules: true
        }
        // tsconfigRootDir: __dirname,
        // project: ["./tsconfig.json"]
    },
    plugins: ["@typescript-eslint"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
        // "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ],
    rules: {
        "@typescript-eslint/ban-ts-comment": "off"
    }
};
