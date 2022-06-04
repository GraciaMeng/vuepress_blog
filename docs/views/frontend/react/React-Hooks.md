---
title: react hooks学习
date: 2021-7-23
categories:
 - react
tags:
 - react
publish: true
---

<!-- more -->

# 1.useState

```jsx
const [count,setCount] = useState(0)
```

[变量，更改变量的方法]

更改变量的使用：

(1)、setCount(count + 1)

(2)、setCount(count => count + 1)

注意：

为什么 setCount(count++)不允许?

答：因为不能直接更改它自身的值

# 2.useReducers

```jsx
const countReducer = (state,action) => {
	switch(action.type){
        case 'add':
            return state + 1
        case 'dre':
            return state - 1
        default:
            return state
    }
}
const [count,countDispatch] = useReducer(countReducer,0)

const onClick = () => {
    countDispatch({type:'add'})
}
```

注意：

不能在 if、for、while 语句中使用

# 3.useEffect

useEffect 会在整个真实 dom 渲染完成后才会执行（异步）

副作用：

纯函数（只要和外部存在交互）：相同的输入=>相同的输出

1.引用外部变量 2.调用外部函数

常用的副作用操作：1.修改 dom 2.修改全局变量 window 3.ajax 请求 4.计时器 5.存储相关

和外部变量的交互都可以叫做外部变量；

组件初次渲染会执行和组件更新会执行

每一次副作用函数都是不同函数

存在清理函数：

1.render + useEffect

->render + 清理函数 + useEffect

组件销毁的时候 -> 执行

只在初次渲染（didMount）的时候执行，不在更新（didUpdate）执行

使用依赖项，空数组

第二个参数：

1.自定当前 effect 函数所需要的依赖项；

2.依赖是空数组，在初次渲染和卸载的时候执行；

3.有依赖项，并且依赖项不一致的时候会执行

```jsx
useEffect(()=>{
   let timer = setInterval(()=>{
       setCount(count => count + 1); //如果不使用这种形式，会一直拿的是初始的count
   },1000)
   return ()=>{
       clearInterval(timer);
   }
},[])
```

自定义 hook，关注点分离：

```jsx
const useCount = ()=>{
	const [count,setCount] = useStaet(0);
    useEffect(()=>{
       document.title = `${count}`
    },[])
    return [count,setCount]
}
```

# 4.useContext

```jsx
const AppContext = createContext()

class Foo extends React.Component {
    render(){
        return (
            <AppContext.Consumer>
            	{value => <div>{value}</div>}
            </AppContext.Consumer>
        )
    }
}
class Bar extends React.Component {
    static contextType = AppContext; //属性挂载
    render(){
        const value = this.context;
        return (
            <div>{value}</div>
        )
    }
}
const Baz = (props) => {
    const value = useContext(AppContext);
    return (
    	<div>{value}</div>
    )
}
const Middle = (props) => {
    return (
    	<div>
        	<Foo/>
            <Bar/>
            <Baz/>
        </div>
    )
}
const App = (params) => {
    return (
    	<AppContext.Provider value={'hhh'}>
        	<Middle/>
        </AppContext.Provider>
    )
}
```

# 5.类组件的 ref

第一种（不建议）

```jsx
class Foo extends React.Component {
    handleInput = (input) => {
        this.input = input
    }
    onClick = ()=>{
        this.input.focus()
    }
    render(){
        return (
        	<div>
            	<input type="text" ref={this.handleInput}/>
                <button onClick={this.onClick}>聚焦</button>
            </div>
        )
    }
}
```

第二种（推荐）：父组件使用子组件的 ref

```jsx
class Foo extends React.Component {
    inputRef = createRef();
    onClick = ()=>{
        this.inputRef.current.focus()
    }
    render(){
        return (
        	<div>
            	<input type="text" ref={this.inputRef}/>
                <button onClick={this.onClick}>聚焦</button>
            </div>
        )
    }
}
const App = (params) => {
    const fooRef = createRef();
    const onClick = () =>{
        fooRef.current.onClick()
    }
    return (
    	<div>
        	<Foo ref={fooRef}/>
            <button onClick={this.onClick}>父组件</button>
        </div>
    )
}
```

# 6.函数组件 ref

1.子组件使用 ref

```jsx
const Foo =()=> {
    const inputRef = useRef();
    onClick = ()=>{
        inputRef.current.focus()
    }
    return (
        <div>
            <input type="text" ref={inputRef}/>
            <button onClick={this.onClick}>聚焦</button>
        </div>
    )
}
```

2.父组件引导子组件用 ref

```jsx
const Foo =forward((params,inputRef)=> {
    onClick = ()=>{
        inputRef.current.focus()
    }
    return (
        <div>
            <input type="text" ref={inputRef}/>
            <button onClick={this.onClick}>聚焦</button>
        </div>
    )
}
const App = (params) => {
    const inputRef = useRef();
    const onClick = () =>{
        inputRef.current.focus() //inputRef.current为子组件引用ref得标签
    }
    return (
    	<div>
        	<Foo ref={inputRef}/>
            <button onClick={this.onClick}>父组件</button>
        </div>
    )
}
```

# 7.useMemo

父组件操作（或者说是更新 state）时，都会执行 render 函数

> 需求：只有当传来的 props 值更新时，才会重新渲染

1. 类组件可以用 PureComponent 进行优化
2. 函数组件用 memo 优化，memo 是函数组件优化方式，不希望子组件重新运行（适用于传递的 props 是值，而不是函数）
3. 如果父组件传递给子组件的是一个函数，那么父组件更新时，方法函数会重新定义成一个新的函数，也会传递给子组件，重新渲染，所以 memo 不适用。
   1. 为保证函数同一应用，所以使用 useCallback 对传递的函数包装。

memo 和 useCallback 区别：

memo 固定一个值，useCallback 固定一个函数

useMemo 和 useCallback 区别：

useMemo 返回的是一个具体值，useCallback 返回具体函数

```
useCallbacl(fn, deps) 相当于 useMemo(()=>fn,deps)
```

```jsx
import React, { useState,memo,PureComponent,useCallback,useMemo } from "react";

// 1.
// class Foo extends PureComponent {
//   render() {
//     return <ul>{render()}</ul>;
//   }
// }

// 2.
// const Foo = memo(({ count }) => {
//   return <div>{count}</div>;
// });

const Foo = ({ render }) => {
  //3.useCallback
  // return <ul>{render()}</ul>;
  //4.useMeno
  return <ul>{render}</ul>;
};


export default function App(params) {
  const [range, setRange] = useState({ min: 0, max: 10000 });
  const [count, setCount] = useState(0);
  //3.useCallback
  // const render = useCallback(() => {
  //   let arr = [];
  //   for (let i = 0; i < range.max; i++) {
  //     arr.push(<li key={i}>{i}</li>);
  //   }
  //   return arr;
  // },[range]);

  //4.useMeno
  const render = useMemo(() => {
    let arr = [];
    for (let i = 0; i < range.max; i++) {
      arr.push(<li key={i}>{i}</li>);
    }
    return arr;
  },[range]);
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={setCount((count) => count + 1)}>+1</button>
      <Foo render={render} />
    </div>
  );
}
```

跟 shouldComponentUpdate 类似作用，在渲染过程中避免重复渲染的问题。

当状态或者父组件传来的属性发生变化时，更新组件。

1.useMemo 就是用 memoization 来提高性能的

2.Memoization 时 JavaScript 的缓存技术

如果我们有 CPU 密集型操作，我们可以通过将初始操作的结果存储在缓存中优化使用。如果操作必然会再次执行，我们将不再麻烦再次使用我们的 CPU，因为相同结果的结果存储在某个地方，我们只是简单地返回结果。

记住这个是以空间换速度，所以最好确定你是否值得那么做，有些场景很有必要使用。

useMemo()是一个函数，有两个参数，第一个参数是个函数，第二个参数是个数组

useMemo(()=>{},[默认可以不写])

useMemo 和 useEffect 执行的时间不同，useEffect 是在 componentDidMount 以后执行的，而 useMemo 是在组件渲染过程中执行
