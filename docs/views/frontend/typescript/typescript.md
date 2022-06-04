---
title: typescript学习
date: 2021-8-24
categories:
  - typescript
tags:
  - typescript
publish: false
---

<!-- more -->

# 一、数据类型

- 布尔类型（boolean）

- 数字类型（number）

- 字符串类型（string）

- 数组类型（array）

  - number[]
  - Array\<number>

- 元组类型（tuple）

  - ```typescript
    let arr: [string, number] = ["ts", 1];
    ```

- 枚举类型（enum）

  - 如果不赋值，默认从 1 开始

  - ```typescript
    enum Flag {
      success = 1,
      error = -1,
    }
    console.log(Flag.success); //1
    ```

  - ```typescript
    enum Color {
      red,
      blue = 5,
      yellow,
    }
    //red为0，blue为5，yellow为上一个递增1，为6
    ```

* 任意类型（any）

* null 和 undefined

* void 类型

  - 表示没有类型，一般用于定义方法的时候方法没有返回值

* never 类型

  - 是其他类型（包括 null 和 undefined）的子类型，代表从不会出现的值，这意味着声明 never 的变量只能被 never 类型所赋值

# 二、函数

### 1.定义方法传参

```typescript
function getInfo(name: string): void {}
```

### 2.方法可选参数

es5 里面方法的实参和形参可以不一样，但是 ts 必须一样，如果不一样就需要配置可选参数

```typescript
function getInfo(name: string, age?: number): void {}
```

注意：可选参数必须配置在最后面

### 3.默认参数

```typescript
function getInfo(name: string, age: number = 20): void {}
```

### 4.剩余参数

```typescript
function sum(...result: number[]): number {
  return 1;
}
```

### 5.函数重载

通过为同一个函数提供多个函数类型定义来试下多种功能的目的。

```typescript
function getInfo(name: string): string;
function getInfo(age: number): string;
function getInfo(str: any): any {
  if (typeof str === "string") {
    return "hh" + str;
  } else {
    return "xx" + str;
  }
}
getInfo("1");
getInfo(1);
getInfo(true); // 报错
```

# 三、类

### 1.创建类

```typescript
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
```

### 2.继承

# 四、接口

### 1.属性接口

```typescript
function getLabel(labelInfo: { label: string }) {}
```

### 2.interface 接口

接口是行为和动作的规范，对批量方法约束

```typescript
interface FullName {
  firstName: string;
  secondName: string;
}
function getName(name: FullName) {
  console.log(name.firstName);
}
```

### 3.接口可选属性

```typescript
interface FullName {
  firstName: string;
  secondName: string;
  age?: number;
}
function getName(name: FullName) {
  if (name.age) {
    console.log(name.age);
  } else {
    console.log(name.firstName + name.secondName);
  }
}
```

### 4.可索引接口

对数组约束

```typescript
interface UserArray {
  [index: number]: string;
}
let arr: UserArray = ["11", "22"];
```

对对象约束

```typescript
interface UserArray {
  [index: string]: string;
}
let arr: UserArray = { name: "11" };
```

### 5.类类型接口

```typescript
interface Animal {
  name: string;
  eat(str: string): void;
}
class Dog implements Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  eat(str: string): void {
    console.log("ss");
  }
}
```

### 6.接口继承

```typescript
interface Animal {
  eat(): void;
}
interface Person extends Animal {
  work(): void;
}
```

# 五、泛型

### 1.泛型定义

泛型：软件工程中，我们不仅要创建一致的定义良好的 API，同时也要考虑可重用性。组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型，这在创建大型系统时为你提供了十分丰富的功能。

通俗理解：泛型就是解决类、接口、方法的复用性，以及对不特定数据类型的支持。

T 表示泛型，具体什么类型是调用这个方法的时候决定的

### 2.函数泛型

```typescript
function getData<T>(value: T): T {
  return value;
}
getData<number>(123);
```

### 3.类泛型

```typescript
class minClass<T> {
  public list: T[] = [];
  add(value: T): void {
    this.list.push(value);
  }
}
let m1 = new minClass<number>();
```

### 4.泛型接口

##### （1）第一种方法

```typescript
interface ConfigFn {
  <T>(value: T): T;
}
let getData: ConfigFn = function<T>(value: T): T {
  return value;
};
getData<string>("hello");
```

##### （2）第二种方法

```typescript
interface ConfigFn<T> {
  (value: T): T;
}
function getData<T>(value: T): T {
  return value;
}
let myGetData: ConfigFn<string> = getData;
myGetData("hello");
```

### 5.封装案例

解决代码重用问题

```typescript
// 公共泛型类
class MysqlDb<T> {
  list: T[];
  constructor() {
    this.list = [];
  }
  add(info: T): boolean {
    this.list.push(info);
    return true;
  }
  get(): T[] {
    return this.list;
  }
}
interface User {
  username: string;
  password: string;
}
const user: User = { username: "meng", password: "111" };
const list = new MysqlDb<User>();
list.add(user);
console.log(list.get());

interface Article {
  title: string;
  content: string;
  time: number;
}
const article: Article = { title: "hello", content: "hello", time: 1212 };
const arList = new MysqlDb<Article>();
arList.add(article);
console.log(arList.get());
```

# 六、命名空间

在代码量较大的情况下，为了避免各种变量命名相冲突，可将相似功能的函数、类、接口等放置命名空间内。

### 1.命名空间和模块的区别

- 命名空间：内部模块，主要用于组织代码，避免命名冲突
- 模块：ts 的外部模块的简称，侧重代码复用，一个模块里可能有多个命名空间

### 2.命名空间使用

注意：命名空间中要 export 暴露出来才能使用

如果外部使用命名空间，也要 export 命名空间

```typescript
namespace Mysql {
  // 公共泛型类
  export class MysqlDb<T> {
    list: T[];
    constructor() {
      this.list = [];
    }
    add(info: T): boolean {
      this.list.push(info);
      return true;
    }
    get(): T[] {
      return this.list;
    }
  }
  export interface User {
    username: string;
    password: string;
  }

  export interface Article {
    title: string;
    content: string;
    time: number;
  }
}
const user: Mysql.User = { username: "meng", password: "111" };
const list = new Mysql.MysqlDb<Mysql.User>();
list.add(user);
```

# 七、装饰器

装饰器是一种特殊类型的声明，它能够被附加到类声明、方法、属性或参数上，可以修改类的行为。

通俗的讲装饰器是一个方法，可以注入到类、方法、属性参数上来扩展类、属性、方法、参数的功能。

常见装饰器：类装饰器、属性装饰器、方法装饰器、参数装饰器

装饰器的写法：普通装饰器（无法传参）、装饰器工厂（可传参）

#### 1.类装饰器

类装饰器在类声明之前被声明（紧靠这类声明）。应用于类构造函数，可以用来监视，修改或替换类定义
