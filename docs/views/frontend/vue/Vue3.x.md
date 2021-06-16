## 一.setup()函数

开始创建组件，在onBeforeMount之前，创建data数据和方法

### 1、ref()

```js
const names = ref(["meng","du"])
```

方法中要使用.value才能获取值(template和script不统一，**不建议使用**)

```js
selectNameFun:(index:number)=>{
	selected.value = names.value[index]
}
```

### 2、reactive

把数据和方法都统一到reactive函数里面，方便管理(**建议使用**)

```js
const data:DataProps = reactive({
	names:["meng","du"]
})
//DataProps是类型注解，要是有interface
```

方法中直接使用data.获取数据，而且页面渲染也需要data.

```js
selectNameFun:(index:number)=>{
	data.selected = data.names[index]
}
```

### 3、toRefs

可以使页面渲染不使用data.方式

```js
const refData = toRefs(data);
return {
    ...refData
}
```

## 二、生命周期函数

#### （2）onBeforeMount

组件挂载到页面之前执行

#### （3）onMounted

组件挂载到页面之后执行

#### （4）onBeforeUpdated

组件更新之前执行

#### （5）onUpdated

组件更新之后执行

#### （6）onBeforeUnmount

组件卸载之前执行

#### （7）onUnmounted

组件卸载之后执行

#### （8）onActivated

保持组件状态

<keep-alive></keep-alive>使用

#### （9）onDeactivated

同八

#### （10）onErrorCaptured

#### （11）onRenderTracked

状态跟踪钩子函数，数据渲染和更新时触发

有event参数

#### （12）onRenderTriggered

同十一，但详细，而且得出的事件只有一个，方便调试，**用的多**

## 三、内置函数

### 1、watch监听器

```
watch(overText[要监听的数据],(newVal,oldVal)=>{

})
```

