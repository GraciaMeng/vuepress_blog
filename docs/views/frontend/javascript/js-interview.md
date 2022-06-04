---
title: js面试题
date: 2021-4-23
categories:
 - 未完成
tags:
 - 未完成
publish: false
---

<!-- more -->

# 17.策略模式

## （1）ES5

```js
var registerForm = document.querySelector('#registerForm');
var strategies = {
    isNonEmpty:function(value,errorMsg='用户名不能为空'){
        console.log(value,errorMsg);
        if (value==='')return errorMsg
    },
    minLength:function(value,length=6,errorMsg='密码长度不能小于6位'){
        if(value.length<length) return errorMsg
    },
    isMobile:function(value,errorMsg='手机号码格式不正确'){
        if(!/^1[3|5|8][0-9]{9}$/.test(value))return errorMsg
    }
}
var validateFun = function(){
    var validator = new Validator();
    validator.add(registerForm.username,'isNonEmpty');
    validator.add(registerForm.password,'isNonEmpty','密码不能为空');
    validator.add(registerForm.password,'minLength:6');
    validator.add(registerForm.phonenumber,'isMobile');
    var errorMsg = validator.start();
    return errorMsg
}
registerForm.onsubmit = function(e){
    e.preventDefault();
    var errorMsg = validateFun();
    if(errorMsg){
        alert(errorMsg);
        return false;
    }
}
var Validator = function(){
    this.cache = []
}
Validator.prototype.add = function(dom,relu,errorMsg=''){
    var ary = relu.split(':');
    this.cache.push(function(){
        var strategy = ary.shift();
        ary.unshift(dom.value);
        errorMsg !== '' ? ary.push(errorMsg):null;
        // return strategies[strategy].apply(dom,ary)
        return strategies[strategy](...ary)
    })
}
Validator.prototype.start = function(){
    for(var i=0,vaFunc;vaFunc=this.cache[i++];){
        var msg = vaFunc();
        if(msg)return msg;
    }
}
```

## （2）ES6

```js
const registerForm = document.querySelector('#registerForm');
const strategies = {
    isNonEmpty:function(value,errorMsg='用户名不能为空'){
        if (value==='')return errorMsg
    },
    minLength:function(value,length=6,errorMsg='密码长度不能小于6位'){
        if(value.length<length) return errorMsg
    },
    isMobile:function(value,errorMsg='手机号码格式不正确'){
        if(!/^1[3|5|8][0-9]{9}$/.test(value))return errorMsg
    }
}
const validateFun = ()=>{
    const validator = new Validator();
    validator.add(registerForm.username,'isNonEmpty');
    validator.add(registerForm.password,'isNonEmpty','密码不能为空');
    validator.add(registerForm.password,'minLength:6');
    validator.add(registerForm.phonenumber,'isMobile');
    let errorMsg = validator.start();
    return errorMsg
}
registerForm.onsubmit = (e)=>{
    e.preventDefault();
    let errorMsg = validateFun();
    if(errorMsg){
        alert(errorMsg);
        return false;
    }
}
class Validator {
    constructor(){
        this.cache = []
    }
    add(dom,relu,errorMsg=null){
        let ary = relu.split(':');
        this.cache.push(()=>{
            let strategy = ary.shift();
            ary.unshift(dom.value);
            errorMsg ? ary.push(errorMsg):null;
            return strategies[strategy].apply(dom,ary);
        })
    }
    start(){
        for(let i=0,vaFunc;vaFunc=this.cache[i++];){
            let msg = vaFunc();
            if (msg)return msg;
        }
    }
}
```

