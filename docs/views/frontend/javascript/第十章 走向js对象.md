---
title: 第十章 走向js对象
date: 2021-4-23
categories:
 - javascript
tags:
 - javascript
publish: true

---

<!-- more -->

##### 15.对象的浅拷贝多种操作方法

```js
let hd = {name:'meng',age:20}
//1.
let obj = {}
for (const key in hd){
    obj[key] = hd[key]
}
//2
let obj = Object.assign({},hd)
//3 
let obj = {...hd}
```

##### 16.深拷贝深层次分析

```js
// 递归，数组对象中没有数组[]才可以
function copy(object) {
    let res = {}
    for(const key in object){
        res[key] = 
            typeof object[key] == "object" ? copy(object[key]):object[key]
    }
}
//数组对象中有数组[]
function copy(object) {
    let res = object instanceof Array? []:{};
    for(const [k,v] of object.entries()){
        res[k] = typeof v == 'object' ? copy(v):v
    }
}
```

##### 32.什么是proxy代理拦截

```js
const hd = { name: "meng" };
const proxy = new Proxy(hd, {
    get(obj, property) {
        return obj[property];
    },
    set(obj, property, value) {
        obj[property] = value;
        return true;
    },
});
console.log(proxy.name);
proxy.name = "du";
console.log(proxy.name);
```

##### 33.使用proxy代理控制函数

```js
function factorial(num) {
    return num == 1 ? 1:num * factorial(num-1)
}
const proxy = new Proxy(factorial, {
    apply(func, obj, args) {
        console.log(func);//函数
        console.log(obj);//传进来的上下文对象
        console.log(args);//参数
    }
})
proxy.apply({},[5])
proxy.apply(this,[5])
```

##### 34.数组使用代理拦截操作

```js
const lessons = [
    { title: "VUE.js", category: "vue" },
    { title: "flex 弹性布局", category: "flex" },
    { title: "react构建用户的JavaScript界面", category: "react" },
];
const proxy = new Proxy(lessons, {
    get(array, key) {
        const title = array[key].title;
        const len = 5;
        array[key].title =
            title.length > len ? title.substr(0, len) + ".".repeat(3) : title;
        return array[key];
    },
});
console.log(proxy[2]);
```

##### 35.vue.js数据绑定的容器更新

```js
<input type="text" v-model="title">
<input type="text" v-model="title">
<h3 v-bind="title">meng</h3>
<script>
function View() {
    let proxy = new Proxy({},{
        get(obj,proerty){

        },
        set(obj,property,value){
            console.log(value)
        }
    });
    this.init = function(){
        const els = document.querySelectorAll("[v-model]");
        els.forEach(item => {
            item.addEventListener('keyup',function(){
                proxy[this.getAttribute('v-model')] = this.value;
            })
        })
    }
}
</script>
```

##### 36.vue双向绑定的页面渲染

```js
<input type="text" v-model="title">
<input type="text" v-model="title">
<h3 v-bind="title">meng</h3>
<script>
function View() {
    let proxy = new Proxy({},{
        get(obj,proerty){

        },
        set(obj,property,value){
              document
                .querySelectorAll(`[v-model=${property}]`)
                .forEach((item) => {
                  item.value = value;
                });
              document
                .querySelectorAll(`[v-bind=${property}]`)
                .forEach((item) => {
                  item.innerHTML = value;
                });
            },
        }
    });
    this.init = function(){
        const els = document.querySelectorAll("[v-model]");
        els.forEach(item => {
            item.addEventListener('keyup',function(){
                proxy[this.getAttribute('v-model')] = this.value;
            })
        })
    }
}
```

##### 38.使用代理完成自定义表单验证组件

```html
<input type="text" validate rule="max:12,min:3"/>
<input type="text" validate rule="max:3,isNumber"/>
```



```js
class Validate {
    max(value, len){
        return value.length > len
    }
    min(value, len) {
        return value.length < len
    }
    isNumber(value){
        return /^\d+$/.test(value);
    }
}
function ProxyFactory(target) {
    return new Proxy(target,{
        get(target,key){
            return target[key];
        },
        set(target,key,el){
            const rule = el.getAttribute('validate');
            const validate = new Validate()
            let state = rule.split(',').every(rule=>{
                const info = rule.split(':');
                return validate[info[0]](el.value,info[1]);
            })
            el.classList[state?'remove':'add']("error");
            return true;
        }
    })
}
const proxy = ProxyFactory(document.querySelectorAll("[validate]"));
proxy.forEach((item,i)=>{
    item.addEventListener("keyup",function(){
        proxy[i] = this;
    })
})
```

##### 39.JSON数据可以解决什么问题

```js
let data = {
    name:'meng',
    data:{title:'javascript'}
}
console.log(JSON.stringify(data,null,2))
let json = `{"name":'meng',"url":'meng.com'}`;
console.log(JSON.parse(json))
```

##### 40.JSON序列化与自定义toJSON

```js
//第一参数是数据，第二参数是保存什么数据，第三参数是tab后退多少
console.log(JSON.stringify(data,["title"]))
```

```js
//自定义toJSON
let data = {
    name:'meng',
    data:{title:'javascript'},
    toJson:function(){
        return {
            name:this.name
        }
    }
}
console.log(JSON.stringify(data)
```

##### 41.JSON转为可操作类型

```js
let data = {
    name:'meng',
    data:{title:'javascript'},
    toJson:function(){
        return {
            name:this.name
        }
    }
}
let json = JSON.stringify(data,null,2);
let obj = JSON.parse(json,(key,value)=>{
    return key == 'name'?'nice-'+value:value;
})
```

