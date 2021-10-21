---
title: vue3学习
date: 2021-8-12
categories:
  - vue
tags:
  - vue3
publish: true
---

<!-- more -->

# 1.vue3 开发环境搭建

# 2.react 开发环境搭建

# 3.搭建外部编译服务

# 4.vite 对编译的支持

- postcss 只需创建 postcss.config.js 自行配置

- css modules

  - ```js
    import styles from "./index.module.css";
    export default {
      setup() {
        return { styles };
      },
    };
    ```

  - ```vue
    <template>
      <div :class="$style.name"></div>
    </template>
    <style module>
    .name {
      color: #fff;
    }
    </style>
    ```

- css pre-processors css 预处理器（sass，less，stylus）
  - yarn add -D sass
- 支持 jsx

# 5.http 代理配置与实践

```js
export default {
  proxy: {
    "/api": {
      target: "http://localhost:5000",
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ""),
    },
  },
};
```

# 6.设置别名的方法

```js
const { path } = require("path");
export default {
  alias: {
    "/@/": resolve(__dirname, "src"),
  },
};
```

# 7.setup

初始化属性之后，beforeCreate 之前执行

# 8.reactive
