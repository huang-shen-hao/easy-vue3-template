module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        node:true,
        jest:true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:vue/vue3-essential",
        'plugin:prettier/recommended'
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    parser:'vue-eslint-parser',
    "parserOptions": {
        "ecmaVersion": "latest",
        "parser": "@typescript-eslint/parser",
        "sourceType": "module",
        jsxPragma:'React',
        ecmaFeatures:{
            jsx:true,
        }
    },
    "plugins": [
        "@typescript-eslint",
        "vue"
    ],
    "rules": {
        // "off"或者0    //关闭规则关闭
        // "warn"或者1    //在打开的规则作为警告（不影响退出代码）
        // "error"或者2    //把规则作为一个错误（退出代码触发时为1）
        'no-var' : 'error',//要求使用let或 const而不是var
        'camelcase': 0, //强制驼峰法命名 - 关闭
        'no-multiple-empty-lines': ['warn', {max: 1}],//不允许多个空行
        'no-console': process.env.NODE_ENV ==='production'? 'error': 'off',
        'no-debugger': process.env.NODE_ENV === 'production'? 'error':'off',
        'no-unexpected-multiline':'error',//禁止空余的多行
        'no-useless-escape' : 'off',//赫止不必要的转义字符
        '@typescript-eslint/no-unused-vars': 'error',//禁止定义未使用的变量
        "@typescript-eslint/ban-ts-ignore": "off",//使用@ts-ignore
        "@typescript-eslint/prefer-ts-expect-error": "off",
        '@typescript-eslint/no-explicit-any': 'warn',//禁止使用any 类型
        '@typescript-es1int/no-non-null-assertion': 'off',
        '@typescript-es1int/no-namespace': 'off',// 禁止使用自定义 TypeScript模块和命名空间。
        '@typescript-eslint/semi': 'off',

        'vue/multi-word-component-names': 'off',//要求组件名称始终为“-”链接的单词
        'vue/script-setup-uses-vars':'error',//防止<script setup>使用的变量<template>被标记为未
        ' vue/no-mutating-props': 'off',//不允许组件prop的改变
        'vue/attribute-hyphenation': 'off',//对模板中的自定义组件强制执行属性命名样式

    }
}
