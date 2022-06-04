---
title: vue小技巧
date: 2021-6-27
categories:
  - vue
tags:
  - vue
publish: true
---

<!-- more -->

## 1.根据路由记录动态生成面包屑内容

给一个路由添加 meta 属性和里面的 title 属性

```vue
<template>
  <bread-crumb v-for="breadCrumbItem in breadCrumbList">{{
    breadCrumbItem.meta.title
  }}</bread-crumb>
</template>
computed: { breadCrumbList(){ return this.$route.matched; } }
```

## 2.vuex 状态持久化

当页面刷新之后，会清空 vuex，因此要使用持久化

用 localStorage 或者 sessionStorage 存储数据，

## 3.vue 实现五星组件

```js
computed: {
	startClasses(){
		let result = [];
		let score = Math.floor(this.score * 2) / 2;
		let hasDecimal = score % 1 !== 0;

        for(let i=0;i<score;i++){
            result.push('on')
        }
        if(hasDecimal){
            result.push('half')
        }
        while(result.length < 5){
            result.push('off')
        }

	}
}
```

## 4.事件代理

放在不确定的元素，通过不断的页面渲染，或者是绑定的元素很多，容易消耗性能，因此用事件代理

```vue
<template>
  <div @click="onClick">
    <ul>
      <li v-for="(item, index) in items" :key="index" :data-index="index">
        {{ item }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  methods: {
    onClick(e) {
      const index = e.target.getAttribute("data-index");
    },
  },
};
</script>
```

## 5.如何获取组件渲染后的 DOM

**this.$refs.test.$el ** 获取
