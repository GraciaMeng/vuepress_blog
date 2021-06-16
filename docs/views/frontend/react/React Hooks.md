# 1.useState

```
const [count,setCount] = useState(0)
```

[变量，更改变量的方法]

更改变量的使用：

(1)、setCount(count + 1)

(2)、setCount(count => count + 1)



注意：

为什么setCount(count++)不允许?

答：因为不能直接更改它自身的值

# 2.useReducers

```react
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

不能在if、for、while语句中使用