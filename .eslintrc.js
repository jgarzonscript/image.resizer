module.exports = {
    root: true,
    env: {
        commonjs: true,
        node: true,
        browser: true,
        // es6: true,
        // jest: true,
        es2021: true
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest"
        // sourceType: "module",
        // ecmaFeatures: {
        //     modules: true
        // }
        // tsconfigRootDir: __dirname,
        // project: ["./tsconfig.json"]
    },
    plugins: ["@typescript-eslint"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
        // "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ],
    rules: {
        "@typescript-eslint/ban-ts-comment": "off"
    }
};
