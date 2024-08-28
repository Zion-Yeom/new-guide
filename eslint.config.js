import globals from 'globals';
import pluginJs from '@eslint/js';
import tslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
    pluginJs.configs.recommended,
    ...tslint.configs.recommended,
    ...pluginVue.configs['flat/recommended'],
    eslintConfigPrettier,
    {
        files: ['**/*.{ts,js,vue}'],
        languageOptions: {
            globals: globals.browser,
            parserOptions: {
                parser: tslint.parser
            }
        },
        rules: {
            'vue/multi-word-component-names': 0,
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/no-explicit-any': 0
        }
    }
];
