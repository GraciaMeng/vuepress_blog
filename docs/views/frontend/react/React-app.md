

# 一、脚手架自带文件

index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
		<meta charset="utf-8" />
		<!-- %PUBLIC_URL%代表public文件夹的路径 -->
		<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
		<!-- 开启理想视口，用于做移动端网页的适配 -->
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<!-- 用于配置浏览器页签+地址栏的颜色(仅支持安卓手机浏览器) -->
    <meta name="theme-color" content="red" />
    <meta
      name="description"
      content="Web site created using create-react-app"
		/>
		<!-- 用于指定网页添加到手机主屏幕后的图标 -->
		<link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
		<!-- 应用加壳时的配置文件 -->
		<link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>React App</title>
  </head>
  <body>
		<!-- 若llq不支持js则展示标签中的内容 -->
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>

```

# 二、脚手架基本

创建组件

- 创建“外壳”组件App
  - import React,{Component} from 'react'
- 创建并暴露App组件
  - export default class App extends Component{}

css   module文件

```react
import hello from './index.module.css'
<h2 className={hello.title}>Hello,React!</h2>
```

# 三、配置代理

## 方法一：

> 在package.json中追加如下配置

```json
"proxy":"http://localhost:5000"
```

说明：

1. 优点：配置简单，前端请求资源时可以不加任何前缀。

2. 缺点：不能配置多个代理。

3. 工作方式：上述方式配置代理，当请求了3000不存在的资源时，那么该请求会转发给5000 （优先匹配前端资源）

## 方法二：

1. 第一步：创建代理配置文件

```
  在src下创建配置文件：src/setupProxy.js
```

2. 编写setupProxy.js配置具体代理规则：

```js
const proxy = require('http-proxy-middleware')
   
   module.exports = function(app) {
     app.use(
       proxy('/api1', {  //api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
         target: 'http://localhost:5000', //配置转发目标地址(能返回数据的服务器地址)
         changeOrigin: true, //控制服务器接收到的请求头中host字段的值
         /*
         	changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
         	changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
         	changeOrigin默认值为false，但我们一般将changeOrigin值设为true
         */
         pathRewrite: {'^/api1': ''} //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
       }),
       proxy('/api2', { 
         target: 'http://localhost:5001',
         changeOrigin: true,
         pathRewrite: {'^/api2': ''}
       })
     )
   }
```

说明：

1. 优点：可以配置多个代理，可以灵活的控制请求是否走代理。

2. 缺点：配置繁琐，前端请求资源时必须加前缀。

# 四、消息订阅和发布

# 五、路由的基本使用

在index.js中要使用react-router-dom的BrowserRouter或HashRouter保住整个app项目

## 1.BrowserRouter

说明：使用HTML5历史记录API（pushState，replaceState和popstate事件）的<Router>来保持UI与URL的同步

1. basename:string

   所有位置的基本URL。 如果您的应用程序是从服务器上的子目录提供的，则需要将其设置为子目录。

2. getUserConfirmation：function

   一个用来确认导航功能。默认使用window.confirm。

3. forceRefresh:bool

   *如果为true，则路由器将在页面导航中使用全页刷新。 您可能只希望在不支持HTML5历史记录API的浏览器中使用此功能。*

4. keyLength:number

   location.key的长度。 默认为6

5. children:node

   要呈现的单个子元素。

## 2.HashRouter

说明：使用URL的哈希部分（即window.location.hash）的<路由器>可以保持您的UI与URL同步。注意：哈希历史记录不支持location.key或location.state。 在以前的版本中，我们试图缓和行为，但是有一些边缘案例我们无法解决。 任何需要此行为的代码或插件将无法正常工作。 由于此技术仅用于支持旧版浏览器，因此我们建议您将服务器配置为使用\<BrowserHistory>

1. basename:string(与BrowserRouter相同)
2. getUserConfirmation：function(与BrowserRouter相同)

3. hashType:string

　　　　用于window.location.hash的编码类型。 可用值为：

​					“slash” - 创建哈希如＃/和＃/阳光/棒棒糖
　　　　	“noslash” - 创建哈希如＃和＃阳光/棒棒糖
　　　　	“hashbang” - 创建“ajax可抓取”（Google不推荐使用）哈希像＃！/和＃！/ sunshine /棒棒糖
　　　　	默认为“slash”。

4. children:node(与BrowserRouter相同)

## 3.Link

1. to:string	链接到的路径名或位置。

2. to:object   要链接的位置。

3. repalce:bool   如果为真，单击链接将替换历史堆栈中的当前条目，而不是添加新条目。

原生html中，靠\<a>跳转不同的页面 

在React中靠路由链接实现切换组件--编写路由链接 

```react
<Link className="list-group-item" to="/about">About</Link>
<Link className="list-group-item" to="/home">Home</Link>
```

## 4.Route

1. Route props

　　所有三种渲染方法都将通过相同的三个路由属性

2. component

　　仅当location匹配时才呈现的React组件。 

3. render:function

　　这允许方便的在线渲染和包装，而不需要上述的不必要的重新安装。不需要使用组件支持为您创建一个新的React元素，所以当位置匹配时，您可以传入一个要调用的函数。 渲染道具接收与构件渲染道具相同的所有路由属性。

4. children:function

　　有时您需要渲染路径是否匹配该位置。 在这些情况下，您可以使用函数child prop。 它的工作原理就像渲染，除了它被调用是否有一个匹配或者没有。儿童渲染支柱接收与组件和渲染方法所有相同的路线道具，除非路由失败匹配URL，则匹配为null。 这允许您根据路线是否匹配来动态调整您的UI。 在这里，如果路由匹配，我们添加一个激活样式

5. path

   没有路径的路由总是匹配。　　

6. exact

   精准匹配。

- 精确：from=”/dd” 必须匹配 http://127.0.0.1:9090/dd
- 模糊：from=”/dd“ 可以匹配http://127.0.0.1:9090/dd/ff/ee

7. strict

　　表示是否匹配pathname部分末尾的“/”符号，如果有此参数，Redirect组件的from和浏览器pathname匹配时要考虑末尾的”/”。如，from=”/dd/” 必须匹配 http://127.0.0.1:9090/dd/而非 http://127.0.0.1:9090/dd

页面使用：注册路由

```react
<Route path="/about" component={About}/>
<Route path="/home" component={Home}/>
```

# 六、NavLink的使用

页面是路由组件，components是一般组件

> 路由组件和一般组件最大的区别是 路由组件会受到路由器传递的最重要的props信息

1. activeClassName: string

　　当活动时给出元素的类。 默认给定类是活动的。 这将与className支持相结合。

2. activeStyle:object

　　当元素处于活动状态时应用于元素的样式

3. exact: bool

　　当为真时，仅当位置匹配完全时才会应用活动类/样式。

4. strict: bool

　　当为真时，在确定位置是否与当前网址匹配时，将考虑位置路径名上的尾部斜线。 有关详细信息，请参阅<Route strict>文档。

5. isActive: func

　　添加用于确定链接是否活动的额外逻辑的功能。 如果您想要更多地验证链接的路径名与当前URL的路径名匹配，则应该使用这一点。

```react
<NavLink activeClassName="atguigu" className="list-group-item" to="/about">About</NavLink>
```

> ##### 封装NavLink

```react
<NavLink activeClassName="atguigu" className="list-group-item" {...this.props}/>
```

# 七、Switch的使用

只渲染第一个匹配到的路由组件或重定向组件

例：如果匹配成功，则会停止继续匹配

```react
<Switch>
    <Route path="/about" component={About}/>
    <Route path="/home" component={Home}/>
    <Route path="/home" component={Test}/>
</Switch>
```

# 八、重定向路由

## 1.Rediect

1. to:string

　　链接到的路径名或位置。

2. to:object

　　要链接的位置。

3. push:bool

　　当为true时，重定向会将新条目推入历史记录，而不是替换当前条目

4. from:string

　　要重定向的路径名。 这可以用于在<Switch>内部渲染<Redirect>时匹配位置。

```react
import { Route, Redirect } from 'react-router'

<Route exact path="/" render={() => (
  loggedIn ? (
    <Redirect to="/dashboard"/>
  ) : (
    <PublicHomePage/>
  )
)}/>
```

# 九、路由组件传递参数

## 1.params参数

Route声明params参数

```react
<Route path="/home/message/detail/:id/:title" component={Detail}/>
```

Link实现传递，主要是以/路径实现

```react
<Link to={`/home/message/detail/${msgObj.id}/${msgObj.title}`}>{msgObj.title}</Link>
```

组件接受参数

```react
const {id,title} = this.props.match.params
```

## 2.search参数

search参数无需声明接收，正常注册路由即可

```react
<Route path="/home/message/detail" component={Detail}/>
```

Link实现传递，主要是以&连接参数

```react
<Link to={`/home/message/detail/?id=${msgObj.id}&title=${msgObj.title}`}>{msgObj.title}</Link>
```

组件接受参数

```react
import qs from 'querystring'
const {search} = this.props.location
const {id,title} = qs.parse(search.slice(1))
```

## 3.state参数

state参数无需声明接收，正常注册路由即可

```react
<Route path="/home/message/detail" component={Detail}/>
```

Link实现传递，主要是以state参数

```react
<Link to={{pathname:'/home/message/detail',state:{id:msgObj.id,title:msgObj.title}}}>{msgObj.title}</Link>
```

组件接受参数

```react
const {id,title} = this.props.location.state || {}
const findResult = DetailData.find((detailObj)=>{
    return detailObj.id === id
}) || {}
```

# 十、编程式路由导航

## 1.push

```react
//push跳转+携带params参数
this.props.history.push(`/home/message/detail/${id}/${title}`)
//push跳转+携带search参数
this.props.history.push(`/home/message/detail?id=${id}&title=${title}`)
//push跳转+携带state参数
this.props.history.push(`/home/message/detail`,{id,title})
```

## 2.replace

```react
//replace跳转+携带params参数
this.props.history.replace(`/home/message/detail/${id}/${title}`)
//replace跳转+携带search参数
this.props.history.replace(`/home/message/detail?id=${id}&title=${title}`)
//replace跳转+携带state参数
this.props.history.replace(`/home/message/detail`,{id,title})
```

## 3.go

this.props.history.go(-2)

## 4.goForward

this.props.history.goForward()

## 5.goBack

this.props.history.goBack()

# 十一、withRouter使用

高阶组件中的`withRouter`, 作用是将一个组件包裹进`Route`里面, 然后`react-router`的三个对象`history, location, match`就会被放进这个组件的`props`属性中.

所以`withRouter`的作用就是, 如果我们某个东西不是一个`Router`, 但是我们要依靠它去跳转一个页面, 比如点击页面的`logo`, 返回首页, 这时候就可以使用`withRouter`来做.
在这个例子中, 我将`span`使用`withRouter`作为一个可点击跳转的`Link`

```react
export default withRouter(ComponentName)
```

