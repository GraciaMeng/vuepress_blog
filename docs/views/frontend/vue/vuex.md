---
title: vuecli的专属状态管理vuex
date: 2021-4-7
categories:
 - 学习笔记
tags:
 - vue
publish: true
---

<!-- more -->

# Vuex

## 1.state

在store中定义数据，在组件中直接使用

```js
export default new Vuex.Store({
  // 相当于组件的data，专门用来存放全局的数据
  state: {
      num:0
  }
})
```

```vue
<template>
	<div>
	{{$store.state.num}}
	</div>
</template>
```

或者写为:

```vue
<template>
	<div>
	{{num}}
	</div>
</template>
<script>
export default {
    computed: {
        num() {
            return this.$store.state.num
        }
    }
}
</script>
```

## 2.getters

将组件中统一使用的computed都放在getters里面操作

```js
export default new Vuex.Store({
  // 相当于组件的data，专门用来存放全局的数据
  state: {
  	num:0
  },
  // 相当于组件中的computed，getters是全局的，computed是组件内使用的
  getters: {
  	getNum(state) {
  		return state.num
  	}
  }
})
```

```vue
<template>
	<div>
	{{$store.getters.num}}
	</div>
</template>
```

## 3.mutations

更改Vuex的store中的状态的 唯一方法mutation

```js
export default new Vuex.Store({
  // 相当于组件的data，专门用来存放全局的数据
  state: {
  	num:0
  },
  // 相当于组件中的methods，但是他不能使用异步方法（定时器、axios）
  mutations: {
      // 让num累加
      // payload是一个形参，如果组件在commit时，有传这个参数过来，就存在，如果没有就是undefined
      increase(state, payload) {
          state.num += payload ? payload : 1;
      }
  }
})
```

```vue
<template>
	<div>
	<button @click="addFn"></button>
	</div>
</template>
<script>
export default {
    methods: {
        addFn() {
            // 调用store中的mutations的increase方法
            // 传参的话，使用payload
            this.$store.commit('increase', 2)
        }
    }
}
</script>
```

## 4.actions

actions是store专门用来处理异步，实际修改状态值，还是mutations

```js
export default new Vuex.Store({
  // 相当于组件的data，专门用来存放全局的数据
  state: {
  	num:0
  },
  // 专门用来处理异步，实际修改状态值的，依然是mutations
  actions: {
      decreaseAsync(context) {
          context.commit('decrease')
      }
  }
})
```

```vue
<template>
	<div>
	<button @click="addFn"></button>
	</div>
</template>
<script>
export default {
    methods: {
        addFn() {
            // 调用store中的actions的decrease方法
            this.$store.dispatch('decrease')
        }
    }
}
</script>
```

## 5.辅助函数

mapState,mapGetters在组件中都是写在computed；

mapMutations,mapActions在组件中都是写在methods；

```vue
<template>
	<div>
        <span>{{num}}</span>
        <span>{{getNum}}</span>
		<button @click="increase()"></button>
        <button @click="decreaseAsync()"></button>
	</div>
</template>
<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import { mapMutations, mapActions } from 'vuex'
export default {
    computed: {
        ...mapState(['num']),
        ...mapGetters(['getNum'])
    },
    methods: {
        ...mapMutations(['increase']),
       	...mapActions(['decreaseAsync'])
    }
}
</script>
```

```vue
...mapState({
    // 箭头函数使代码更简练
    testNum1: state => state.testNum1,
    // 传字符参数'testNum2' 等价于 'state => state.testNum2'
    testNum2: "testNum2",
	// 组件的局部变量与Vuex变量相加
    testNum3(state) {
    return state.testNum1 + this.localNum;
    }
}),
...mapState([
    // 映射this.testNum3为store.state.testNum3
    "testNum3"
])
```



## 6.拆分写法

store中的所有属性，都可以拆分成单独的js文件来书写

```js
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export default new Vue.Store({
    state,
    getters,
    mutations,
    actions
})
```

## 7.modules

store里面创建各类modules的文件夹，里面都要有index.js

index.js如下

```js
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export default {
    namespaced:true, // 命名空间
    state, // this.$store.state.user.xxx
    getters, 
    mutations,//this.$store.commit('user/xxx',xxx)
    actions
}
```

store.js如下

```js
import users from './users/index.js'

export default new Vue.Store({
    //主模块
    modules: {
        users
    }
})
```

vue文件获取信息

```vue
<template>
	<div>
        <span>{{$store.state.users.token}}</span>
	</div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
    computed:{
      ...mapState({
          // 箭头函数使代码更简练
          testNum1: state => state.moduleA.testNum1
      }),
        // 第一个参数是namespace命名空间，填上对应的module名称即可
      ...mapState("moduleA", {
          testNum2: state => state.testNum2,
          testNum3: "testNum3"
      }),
      ...mapState("moduleA",[
          "testNum4"
      ])
    },
    methods: {
        //...mapMutations('users',['xxx'])
        ...mapMutations({
            changeToken:'users/changeToken'
        }),
        get(){
            this.changeToken(payload),
            // this.$store.commit('users/changeToken',payload);
        }
    }
}
</script>
```

## 8.mutations_type

将mutations中的所有方法，归纳起来

```js
export const MUTATIONS_TYPE = {
    INCREASE:'increase'
}
export default {
  [MUTATIONS_TYPE.INCREASE](state, payload) {
      state.num += payload ? payload : 1;
  }
}
```

