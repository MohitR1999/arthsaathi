import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], plugins: { js }, extends: ["js/recommended"],
        languageOptions:
    {
        globals: globals.node,
        parserOptions: {
            tsconfigRootDir: import.meta.dirname
        }
    },
        rules: {
            "consistent-return": 2,
            "indent": [1, 4],
            "no-else-return": 1,
            "semi": [1, "always"],
            "space-unary-ops": 2,
            "no-unused-vars": "warn",
        }
    },
    tseslint.configs.recommended,
    globalIgnores(['**/dist/*'])
]);
