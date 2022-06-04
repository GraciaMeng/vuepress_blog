# web app manifest

```html
<html>
<head>
    <title>Home - PWA</title>
    <link rel="manifest" href="manifest.json"></link>
</head>
</html>
```

### 配置

name:应用名称，用于安装横幅提示的名称，和启动画面中的文字

short_name:应用短名称，用于主屏幕显示

display:显示类型，用于启动画面的类型

- fullscreen：应用将占满整个屏幕
- standalone：浏览器相关UI（如导航栏、工具栏等）将会被隐藏
- manimal-ui：显示形式与standalone类似，不同浏览器在效果略有不同
- browser：与普通网页在浏览器中打开的显示一致

start_url:首屏地址

- 添加参数用于来源统计   <!--"/?from=homescreen"-->
- 如果为空则默认使用用户打开的当前页面为首屏

background_color: 用于启动画面背景颜色

theme_color: 用于启动画面上状态栏、地址栏的颜色

```json
{
    "name":"PWA Demo",
    "short_name":"PWA Demo",
    "display": "standalone",
    "start_url":"/",
    "icon":[],
    "background_color": "#1976d2",
    "theme_color": "#2F3BA2"
}
```

icon图标 （如果修改manifest的图标列表，需要用户重新添加到桌面时更新，未来版本的chrome将支持自动更新）

```json
{
	"icon": [{
        "src":"/assets/i/icon-96×96.png",
        "sizes": "96×96",
        "type": "image/png"
    },{
        "src":"/assets/i/icon-144×144.png",
        "sizes": "144×144",
        "type": "image/png"
    },{
        "src":"/assets/i/icon-192×192.png",
        "sizes": "192×192",
        "type": "image/png"
    }]
}
```

ios支持

ios 11.3/ Safari 11.1 支持Web App Manifest属性

|       属性       |             表现             |
| :--------------: | :--------------------------: |
|    short_name    |             支持             |
|       name       |            不支持            |
|    start_url     |             支持             |
|     display      | 不支持fullscreen和minimal-ui |
|   theme_color    |            不支持            |
| background_color |        不支持开屏动画        |
|      icons       |            不支持            |

Safari目前支持通过meta/link 声明的一些私有属性

```html
<!- 指定桌面 icon ->
<link rel="apple-touch-icon" href="/static/img/apple-touch-icon-152×152.png"></link>
<!- 指定应用名称 ->
<meta name="apple-mobile-web-app-title" content="PWA Demo" >
<!- 指定隐藏 Safari 地址栏等 ->
<meta name="apple-mobile-web-app-capable" content="yes" >
<!- 指定 ios 状态栏颜色 ->
<meta name="apple-mobile-web-app-status-bar-style" content="b" >
```

