---
title: vue的基本面试题
date: 2021-5-4
categories:
  - vue
tags:
  - vue
---

<!-- more -->

### 计算属性computed

当页面渲染刷新的时候才会执行

为什么不使用method？

因为使用method的话，页面更新的时候，会重新渲染一遍这个method，加大负荷，不符合diff算法。

computed 和 method都能实现的功能，建议使用computed，因为有缓存，不用渲染页面就刷新

### 侦听器（监听器）watch

当数据更新的时候会执行

computed 和 watch都能实现的功能，建议使用computed，因为更简洁

```vue
// count是以数据为名
data(){
	return {
		count:0
	}
},
watch:{
	count(current,prev){
		console.log('现在的值',current)
		console.log('以前的值',prev)
	}
}
```

