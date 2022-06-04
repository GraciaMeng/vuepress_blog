---
title: nuxt3学习
date: 2021-7-29
categories:
  - vue
tags:
  - nuxt
publish: true
---

<!-- more -->

# 一.创建项目

```js
npx nuxi init nuxt3-app
=> cd 
=> npm install or yarn install or
=> npm run dev or yarn dev
```

展示页面

`app.vue`

```vue
<template>
  <div>
    <!-- <NuxtWelcome /> -->
    <h3>hello,nuxt3</h3>
    <nuxt-page></nuxt-page>
    <NuxtPage></NuxtPage>
  </div>
</template>

```



# 二.约定路由

> nuxt3自动整合vue-router，并且直接映射`pages/`目录到对应的routes配置中。

## 1.页面路径

index.vue为默认路径为 / ，detail.vue为 /detail。

```js
[
    {
        path:"/",
        component:'~/pages/index.vue',
        name:'index'
    },
    {
        path:"/detail",
        component:'~/pages/detail.vue',
        name:'detail'
    },
]
```

## 2.动态路由

> 如果我们在文件名或者文件夹命名使用`[] (方括号)`，他们将会被转换为`动态路由`参数。

比如下面的文件结构

```
-| pages/
---| users-[group]/
-----| [id].vue
```

上面的案例中我们可以在组件`[id].vue`中访问`group`、`id`这两个参数

```vue
<template>
	{{ $route.params.group }}
	{{ $route.params.id }}
</template>
```

通过`/users-admin/123`导航即可：

```vue
<NuxtLink to="/users-admin/123">user</NuxtLink>
```

## 3.嵌套路由

目录和文件同名，就制造嵌套路由

比如下面目录结构：

```
-| pages/
---| parent/
-----| child.vue
---| parent.vue
```

`child.vue`

```vue
<template>
  <div>
    <h1>child page</h1>
  </div>
</template>
```

`parent.vue`  父组件使用NuxtChild组件显示嵌套的子组件内容

```vue
<template>
  <div>
    <h1>parent page</h1>
    <!-- 嵌套路由 -->
    <NuxtChild></NuxtChild>
  </div>
</template>
```

产生的路由：

```js
[
    {
        path:"/",
        children:[
        	{
	        	path:'child'
        	}
        ]
    },
]
```

# 三、布局系统

## 1.默认布局

那些放在`layouts/`目录下的SFC会自动加载进来，如果我们创建的SFC名为`default.vue`，将会被用于项目所有页面作为页面模板

default.vue

```vue
<template>
  <div>
    通用布局页，default.vue
    <slot></slot>
  </div>
</template>
```

## 2.自定义布局

如果我们的布局文件名不叫default，而是别的，比如`custom.vue`，想要使用它们，就必须在某个页面中设置页面属性`layout`

custom.vue

```vue
<template>
  <div>通用布局页，custom.vue <slot></slot></div>
</template>
```

mine.vue

```vue
<template>
  <div>
    <h1>mine page</h1>
  </div>
</template>

<script>
export default {
  layout: "custom",
};
</script>
```

> 但在嵌套路由没有效果！

### 使用NuxtLayout

可以使用NuxtLayout组件结合slot获得完全控制力，同时需要设置组件选项`layout: false`

```vue
<template>
  <NuxtLayout name="custom">
    <template #default>
      <div>
        <h1>mine page</h1>
      </div>
    </template>
  </NuxtLayout>
</template>

<script>
export default {
  layout: false,
};
</script>
```

> 如果需要使用setup语法糖，要另外创建一个script setup标签

# 四、组件自动导入

## 自动导入组件

我们把vue组件放在`components/`文件夹中，以往需要的话要导入和注册组件，但nuxt可以自动导入`components/`目录下的组件

```vue
<template>
  <div>
    <the-header />
    <h1>通用布局页，custom.vue</h1>
    <slot></slot>
    <the-footer />
  </div>
</template>
```

## 组件名称约定

没有嵌套的组件可以自动导入，但是如果存在嵌套关系的话？

```
-| components/
---| base/
-----| foo
-------| Button.vue
```

那么组件名称将会基于路径和文件名连起来，比如上面的`base/foo/Button.vue`注册的名称会是`BaseFooButton`，将会用起来像这样

```
<BaseFooButton />
```

## 组件懒加载

如果在组件名前面加上Lazy前缀，则可以按需加载组件，可用于打包优化体积。

```vue
<template>
  <div class="home">
    <LazyList v-show="isShow" />
    <button @click="showCompClick">显示List</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
const isShow = ref(false);
const showCompClick = () => {
  isShow.value = !isShow.value;
};
</script>
```

# 五、数据获取

nuxt3提供的数据获取函数有

- useFetch
- useLazyFetch
- useAsyncData
- useLazyAsyncData

> 注意：都必须在setup和生命周期钩子下使用

## useAsyncData

> 在页面、组件或插件中都可以使用useAsyncData获取那些异步数据。
>

```tsx
const {
  data: Ref<DataT>, // 返回数据
  pending: Ref<Boolean>, //加载状态提示器
  refresh: (force?:boolean) => Promise<void>, // 强制刷新函数
  error?: any // 请求失败的错误信息
} = useAsyncData(
  key: string, // 唯一键用于多次请求结果去查
  fn: () => Object, // 返回数值的异步函数
  // lazy -> 是否在路由之后才请求数据，server -> 是否在服务器请求数据
  // lazy类似于Suspense，会卡住整个组件，容易导致用户体验不好，默认是会卡住的false
  // 如果设置true，需要根据pending的状态去使用加载的指示器避免用户体验差，可以及时给用户反馈
  // server - 如果这个页面是首屏在服务端加载页面的，则使用true会比较好
  // 因为会直接在服务端把数据请求结束，然后组装数据，然后返回页面
  options ?: { lazy:boolean, server:boolean } 
)
```

index.vue

```vue
<template>
  <div class="home">
    <!-- 待办列表 -->
    <div v-for="todo in todos" :key="todo.id">
      <input type="checkbox" v-model="todo.completed" />
      <strong>{{ todo.title }}</strong>
    </div>
  </div>
</template>

<script setup>
const { data: todos } = await useAsyncData("todos", () => $fetch("/api/todo"));
</script>
```

## useLazyAsyncData

该方法等效于useAsyncData，仅仅设置了lazy为true，也就是不阻塞路由导航，意味着data可能会初始存在null的情况（或者通过default来设置一个默认值）

## useFetch

> 在页面、组件或插件中都可以使用useFetch获取任意URL资源。

useFetch是useAsyncData的封装，自动生成key同是推断响应类型，用起来更简单

```js
const {
  data: Ref<DataT>, // 返回数据
  pending: Ref<Boolean>, //加载状态提示器
  refresh: (force?:boolean) => Promise<void>, // 强制刷新函数
  error?: any // 请求失败的错误信息
} = useFetch(
  url: string,
  options ?: { lazy:boolean, server:boolean } 
)
```

## useLazyFetch

该方法等效于useFetch，仅仅设置了lazy为true，也就是不阻塞路由导航，意味着data可能会初始存在null的情况（或者通过default来设置一个默认值）

## 拓展：只选取需要的数据

由于请求回来的数据会缓存在页面payload中，甚至包括那些未使用的字段。如果没有精确选择或删减，会导致payload庞大，影响内存。

> 可以使用$fetch中pick属性，而且限制只能是Object对象属性

```js
const { data: todos } = await useFetch("/api/todo", {
  pick: ["id", "title", "completed"],
});
```

> 如果数据深层次嵌套或者精细化获取要求，需要用到transform

```js
const { data: todos } = await useFetch("/api/todo", {
  transform(input) {
    return input.todos;
  },
});
```

# 六、跨组件共享状态

> useState是服务端友好的ref替换。它的值在服务端渲染（客户端注水的过程中）将被保留并通过唯一key在组件间共享

```
useState<T>(key: string, init?: () =>T): Ref<T>
```

- key：唯一键用于去查
- init：提供初始值的函数

## 实践

在根目录创建一个`composables`目录（可自动导入）

```ts
export const useCounter = () => useState("counter", () => 1);
```

使用：

```vue
<template>
  <div class="home">
      <button @click="counter++">+</button>
      <h3>{{ counter }}</h3>
      <button @click="counter--">-</button>
  </div>
</template>

<script setup>
const counter = useCounter();
</script>
```

# 七、插件机制

## 1.plugins目录

nuxt3会自动读取plugins目录下的文件并加载它们。我们可以在文件名上使用.server或者.client前缀使他们仅作用于服务端或者客户端。

## 2.创建插件

```js
import { defineNuxtPlugin } from "#app";
// 唯一的参数是nuxt的实例
export default defineNuxtPlugin((nuxtApp) => {
  console.log(nuxtApp);
});
```

## 3.插件用例：自动提供帮助方法

一个常见应用是给nuxtapp实例提供一些额外的帮助方法，我们可以通过编写一个插件，返回一个对象，在里面设置`provide`key（注入），比如：

```js
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      hello: () => "hello",
    },
  };
});

```

使用这个provide注入，在`index.vue`

```js
// 需加上$前缀
const { $hello } = useNuxtApp();
console.log($hello());
```

## 4.插件用例：访问Vue实例

如果想要扩展Vue，我们通常要访问Vue实例，引入Vue插件。在nuxt3中可以通过插件访问`nuxtApp.vueApp.use(xxx)`。

部分组件库可以实现按需引入

# 八、使用社区模块

https://modules.nuxtjs.org/?version=3.x

利用pinia作为状态管理。

配置nuxt，添加到buildModules中，nuxt.config.ts

```js
export default defineNuxtConfig({
  buildModules: [["@pinia/nuxt", { disableVuex: true }]],
});
```

下面我们在项目中使用一下：

我们首先创建一个名为`counter`的状态模块，`stores/counter.ts`

```js
import { defineStore } from "pinia";

// useStore 可以任意，比如useUser，userCart
// 参数1是整个应用中唯一的store id
export const useStore = defineStore("counter", {
  state() {
    return {
      count: 100,
    };
  },
});

```

