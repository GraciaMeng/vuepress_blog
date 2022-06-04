---
title: 前端工程化篇
date: 2021-4-25
categories:
  - javascript
tags:
  - js
publish: true
---

<!-- more -->

# 1.eslint配置

```js
// yarn global add eslint
// eslint 文件 (执行)
// eslint 文件 --fix (修复引号)
// eslint . --fix (修复全部文件引号错误)

module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "rules": {
        // 双引号
        "quotes": 2,
        // 没有分号
        "semi": 1,
        // 有无console.log
        "no-console": 0,
    }
};
```

# 2.prettier配置

```js
//yanr add prettier -D
//.prettierrc.js文件

module.exports = {
  // 去掉末尾分号
  semi: true,
  // 使用单引号代替双引号
  singleQuote: false,
}
```

