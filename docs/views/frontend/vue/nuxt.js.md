---
title: nuxt学习
date: 2021-7-29
categories:
  - vue
tags:
  - nuxt
---

<!-- more -->

# 1.介绍

SSR: 由服务器端将 vue 渲染成 html，然后返回浏览器

# 2.安装

```bash
npx create-nuxt-app <项目名>
yarn create nuxt-app <项目名>
```

# 3.常用配置

package.json

```json
{
  "config": {
    "nuxt": {
      "host": "127.0.0.1",
      "port": "8082"
    }
  }
}
```

nuxt.config.js

```js
module.exports = {
  // 引用全局css
  css: ["~assets/css/normalize.css"],
  // 配置webpack的loader
  build: {
    loaders: {},
  },
};
```

# 4.路由和参数传递

路由

```vue
<nuxt-link :to="{ name: 'index' }">home</nuxt-link> <nuxt-link>about</nuxt-link>
```

# 5.动态路由和参数校验

- 动态路由

  - 创建动态文件，以\_开头
  - \$route.params.id 获取

- 参数校验

  - ```js
    validate({params}){
    	return /^\d+$/.test(params.id)
    }
    ```

# 6.路由动画效果

```css
.page-enter-active,
.page-leave-active {
  transition: opacity 2s;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}
```

# 7.默认模板和默认布局

# 8.错误页面和个性 meta 设置

在 layouts 文件夹新建 error.vue

```vue
<template>
  <div>
    <h2 v-if="error.statusCode === 404">
      404页面
    </h2>
  </div>
</template>
<script>
export default {
  props: ["error"],
};
</script>
```

```vue
<script>
export default {
  data() {
    return {
      title: this.$route.params.title,
    };
  },
  head() {
    return {
      title: this.title,
      meta: {
        hid: "description",
        name: "new",
        content: "new page",
      },
    };
  },
};
</script>
```

# 9.asyncData


```vue
<template>
	<div>
        {{info.name}}
    </div>
</template>
<script>
export default {
   asyncData(){
        return axios.get().then(res=>{
            return {info:data}
        })
    }
    async asyncData(){
        let {data} = await axios.get();
	}
}
</script>
```
