---
title: next.js学习
date: 2021-8-4
categories:
  - react
tags:
  - react
publish: true
---

<!-- more -->

# 1.简介

SPA:单页面应用，缺点：首屏加载过慢，不能 SEO

SSR：搭建轻松，自带数据同步，丰富插件，灵活配置

# 2.create-next-app 快速创建项目

npm install -g create-next-app

npx create-next-app 项目名称

# 3.Page 和 Components

根据 page 目录下自动生成路由，无需配置

# 4.路由标签跳转和编程跳转

1. 标签跳转

   - ```react
     import Link from 'next/link';
     <Link href="/"><a>返回首页</a></Link>
     ```

2. 编程跳转

   - ```react
     import Router from 'next/router';
     <button onClick={()=>Router.push('/')}></button>
     ```

# 5.路由跳转使用 query 传递参数和接受参数

```react
import Link from 'next/link';
<Link href="/hhh?name=hhh"><a>返回首页</a></Link>
```

```react
import Router from 'next/router';
const goto = ()=>{
    Router.push({
        pathname:'/hhhhh',
        query:{name:'hhh'}
    })
}
<button onClick={goto}></button>
```

# 6.路由的 6 个钩子事件

- routeChangeStart 路由将要发生变化
- routeChangeComplete 变化发生之后
- beforeHistoryChange history 模式下发生变化
- routeChangeError 路由发生错误时（不常用）
- hashChangeStart
- hashChangeComplete

```react
Router.event.on('routeChangeStart',()=>{})
```

# 7.在 getServerSideProps 中使用 axios 获取数据

getServerSideProps 是动态的获取数据，每一次访问页面的时候都会出现这个操作，可以在这里取数据，然后传递在页面上进行渲染

相当于服务器处理

```react
export const getServerSideProps = async (context)=>{
  const {query} = context;
  const {
    data: { data },
  } = await getArticleById(query.id);

  return {
    props: { articleDetailData: data }, // will be passed to the page component as props
  };
}
```

# 8.使用 style JSX 编写页面的 CSS 样式

```html
<style jsx>
  {`
      div{color:blue;}
   `}
</style>
```

# 9.LazyLoading 实现模块懒加载

```react
import dynamic from 'next/dynamic';
const One = dynamic(import(''))
```

# 10.自定义 head 更加友好的 SEO

```react
import Head from 'next/head';

<Head>
</Head>
```

# 11.使用 getStaticProps 注入属性

是在页面 build 构建的时候为组件注入一些属性信息（获取数据之类）

```js
import { GetStaticProps } from "next";
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { name: "world" },
  };
};
```
