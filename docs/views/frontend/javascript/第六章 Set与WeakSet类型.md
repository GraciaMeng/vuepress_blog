---
title: 第六章 Set与WeakSet类型
date: 2021-5-2
categories:
 - javascript
tags:
 - javascript
publish: true

---

<!-- more -->

##### 1.set类型

```javascript
// Set类型值不能重复
let set = new Set([1,2,3,4,5])
set.add(1)
set.add("1")
```

##### 2.元素检测与管理

```javascript
// Set类型值不能重复
let set = new Set(['meng','du'])
console.log(set.size)
console.log(set.has('du'))
console.log(set.delete()) // 删除成功就true
console.log(set.clear()) // undefined
console.log(set.values())
```

##### 4.遍历set类型

```javascript
let set = new Set(['meng','du'])
set.forEach((value,key,set)=>{

})
for (const value of set) {

}
```

##### 5.使用set处理网站关键词

```javascript
let obj = {
    data:new Set(),
    set keyword(word){
    	this.data.add(word)
    },
    show(){
        let ul = document.querySelector("ul");
        ul.innerHTML = "";
        this.data.forEach(value => {
        	ul.innerHTML += `<li>${value}</li>`
        })
    }
}
let input = document.querySelector("[name='hd']");
input.addEventListener('blur',function() {
    obj.keyword = this.value;
    obj.show();
})
```

##### 6.并集，交集，差集算法实现

```javascript
let a = new Set([1,2,3,4,5]);
let b = new Set([4,5,2,9]);
// 并集
console.log(new Set([...a,...b]));
console.log(
    new Set(
        [...a].filter(item=>{
            //交集
            return b.has(item)
            //差集
            return b.has(item)
        })
    )
)
```

##### 7.WeakSet语法

```javascript
let nodes = new WeakSet()
nodes.add(["meng","guo"])
```

