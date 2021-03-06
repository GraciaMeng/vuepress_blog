---
title: vue的基本面试题
date: 2021-6-5
categories:
  - vue
tags:
  - vue
publish: true
---

<!-- more -->

### 1.插值、指令、动态属性、表达式、v-html

插值表达式

指令为 :

v-html 把字符串中存在的标签转化为 html 页面标签，但可能会被黑客插入 script 脚步，造成 xss 风险

### 2.计算属性

如果 input 中使用双向绑定在计算属性中，要使用 getter 和 setter

set 方法可以获取到双向绑定而改变的 value 值

```vue
double :{ get(){ return this.num * 2 }, set(value){ this.num = value / 2 } }
```

### 3.watch 侦听器

```js
watch:{
	info(newValue,oldValue){
		console.log(newValue,oldValue)
	},
    // 侦听data的数据里面的对象数据
    info:{
        handle:function(newValue,oldValue){
            // 但是侦听不到oldValue，因为对象是引用类型，内存里面会指向同一个内存地址
        },
        // 深度监听
        deep:true
    }
}
```

### 4.动态绑定类名和样式

```vue
:class = "{'active':isActive}" :class = "['active']" :style="styleData"
```

### 5.v-if 和 v-show 区别

v-show 有很大的初始消耗，但利于频繁切换

v-if 只渲染符合条件的标签，有很大的切换消耗，利于初始化组件

### 6.v-for 列表循环

要添加:key，但只能是 ke'yi'zuo'w 唯一标识

遍历列表：

```vue
<li v-for="(item, index) in list" :key="item.id"></li>
```

遍历对象：

```vue
<li v-for="(value, key, index) in object" :key="key"></li>
```

注意：v-if 和 v-for 不能连用，因为在 vue 源码中 v-for 比 v-if 的优先级更高，会先进行 for 循环，再对循环体进行 if 判断，有很大的消耗

因此要在外层添加 template 标签来做 v-if 判断

### 7.事件

e.\_\_proto\_\_.constructor 原生事件对象

e.target 点击事件的元素

e.currentTarget 绑定事件元素

当@clik 需要传参和事件对象时，@click="increment(10,$event)"，$event 为事件

### 8.父子组件通信方法之 props/\$emit

props:

```
props:{
	list:{
		type:Array,
		default:[]
	},
	list:Array
}
props:['list']
```

子向父发送事件且传递数据：

this.\$emit('事件名',参数)

### 9.兄弟组件通信方法

创建 event-bus 的 script 文件

```js
import Vue from "vue";
const eventBus = new Vue();
export default eventBUs;
```

要发送事件和数据的 vue 组件

```vue
eventBus.$emit('addItem', this.title);
```

要接受事件和数据的 vue 组件

```
method:{
	handeleAddTitle(title){
		console.log(title)
	}
},
mouted(){
	eventBus.$on('addItem',this.handeleAddTitle)
},
beforeDestroy(){
	// 卸载事件，以免造成内存泄漏问题
	eventBus.$off('addItem',this.handeleAddTitle)
}
```

### 10.父子组件生命周期执行顺序

组件创建

parent: App created

child:List created

child:List mouted

parent:App mouted

组件更新

parent:App before update

child:List before update

child:List updated

parent:App updated

### 11.nextTick

页面更新渲染时，js 是异步的，所以使用 nextTick 是可以保证页面渲染完成之后调用

```vue
this.item.push(Math.random()); this.$nextTick(()=>{ const ulElem =
this.$ref.ulRef; const length = ulElem.childNodes.length; console.log(length) })
```

### 12.插槽

\<slot>作为插槽

### 13.作用域插槽

父 App

```vue
<current-user>
	<template v-slot:default="slotProps">  //可以通过解构获取user,{user}
    	{{slotProps.user.age}}
    </template>
</current-user>
```

子 currentPage

```vue
<slot :user="user">
	{{user.name}}
</slot>
```

### 14.具名插槽

```vue
<template v-slot="title">
  //简写 #title
  <h1>
    hhh
  </h1>
</template>
```

### 15.动态组件

适用于视频文本图片文本等多种页面展现形式

```vue
<div v-for="item in productData" :key="item.id">
    <component :is="My`${item.type}`"></component>
</div>
```

### 16.异步组件

用于初始渲染时，暂时不需要立刻展示到页面的组件，防止组件代码量大，渲染多，造成浪费。使用异步组件可以提高性能

```vue
components:{ Test:()=>import(/* webpackChunkName:"test"*/'./Test') }
//webpackChunkName为页面下载的js文件的命名
```

### 17.keep-alive

如果组件代码量大，反复的销毁和渲染会消耗性能

keep-alive 对组件进行缓存

组件简单的话，选择 v-show

组件复杂，体积大的话，选择 keep-alive

### 18.mixins

使用 mixins 抽离组件公共逻辑

mixins: 局部调用，不影响全局；在每个组件中使用，引入组件中之后，各个变量是相互独立的，值的修改在组件中不会相互影响。
vuex：本地仓库，影响全局数据

mixin.js

```js
export default {
  data() {
    return {
      commonData: "公共数据",
    };
  },
  methods: {
    commonMethod() {
      console.log("公共方法");
    },
  },
  mouted() {
    console.log("common mouted");
  },
};
```

组件

```vue
import mixin from 'mixin.js'; export default { mixins:[mixin]
//可以使用多个mixin }
```
