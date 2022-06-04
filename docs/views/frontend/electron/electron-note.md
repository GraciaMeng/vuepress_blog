---
title: electron桌面应用开发笔记
date: 2021-5-22
categories:
  - electron
tags:
  - electron
publish: false
---

<!-- more -->

# 1.开发环境搭建

初始化 package.json：npm init -y

npm install electron --save-dev

```json
"scripts": {
    "start": "electron ."
},
```

# 2.初始页面

```js
const {
  app, // 引用app
  BrowserWindow, // 窗口引用
} = require("electron");

function createWindow() {
  // 声明要打开的窗口
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });
  win.loadFile("index.html");
}
app.whenReady().then(() => {
  createWindow();
});
app.on("window-all-closed", function() {
  if (process.platform !== "darwin") app.quit();
});
```

# 3.点击展示内容

```js
const win = new BrowserWindow({
  width: 800,
  height: 600,
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false,
  },
});
```

# 4.Remote 模块

打开新窗口

main.js

```js
webPreferences: {
    enableRemoteModule: true,//必须要加，才能使用remote模块
}
```

```js
const btn = document.querySelector("#btn");
const {
  remote: { BrowserWindow },
} = require("electron");
window.onload = function() {
  btn.onclick = () => {
    let win = new BrowserWindow({
      width: 800,
      height: 600,
    });
    win.loadFile("blue.html");
    win.on("closed", () => {
      win = null;
    });
  };
};
```

# 5.菜单创建和绑定事件

```js
const { Menu, BrowserWindow } = require("electron");
let template = [
  {
    label: "meng",
    submenu: [
      {
        label: "love",
        accelerator: "ctrl + n", //快捷键
        //绑定点击事件
        click: () => {
          let win = new BrowserWindow({
            width: 500,
            height: 500,
            webPreferences: { nodeIntegration: true },
          });
          win.loadFile("blue.html");
          win.on("close", () => {
            win = null;
          });
        },
      },
    ],
  },
];

let m = Menu.buildFromTemplate(template);
// 设置可用状态
Menu.setApplicationMenu(m);
```

# 6.右键菜单的制作

```js
const { remote } = require("electron");
let rightTemplate = [{ label: "复制" }, { label: "粘贴" }];
let m = remote.Menu.buildFromTemplate(rightTemplate);

window.addEventListener("contextmenu", function(e) {
  e.preventDefault();
  m.popup({ window: remote.getCurrentWindow() });
});
```

在 main.js 对 new BrowserWindow 添加以下

mainWindow.webContents.openDevTools()

可以打开调试模式

# 7.通过链接打开浏览器

```js
let { shell } = require("electron");

let aHref = document.querySelector("#aHref");
aHref.onclick = function(e) {
  e.preventDefault();
  let href = this.getAttribute("href");
  shell.openExternal(href);
};
```

# 8.嵌入网页和打开子窗口

嵌入网页

```js
const { BrowserView } = require("electron");

function createWindow() {
  const win = new BrowserWindow();
  let view = new BrowserView();
  win.setBrowserView(view);
  view.setBounds({ x: 0, y: 100, width: 600, height: 500 });
  view.webContents.loadURL("https://baidu.com");
}
```

打开子窗口

```js
window.open();
```

# 9.子窗口向父窗口传递信息

子窗口

```js
let popbtn = document.querySelector("#popbtn");
popbtn.onclick = function(e) {
  e.preventDefault();
  window.opener.postMessage("子窗口传递的信息");
};
```

父窗口

```js
window.addEventListener("message", function(msg) {
  let main = this.document.querySelector("#main");
  main.innerHTML = msg.data;
});
```

# 10.选择文件对话框的使用

打开文件选择对话框可以使用`dialog.showOpenDialog()`方法来打开，它有两个参数，一个是设置基本属性，另一个是回调函数，如果是异步可以使用`then`来实现。

- title ： String (可选)，对话框的标题
- defaultPath ： String (可选),默认打开的路径
- buttonLabel ： String (可选), 确认按钮的自定义标签，当为空时，将使用默认标签
- filters ： 文件选择过滤器，定义后可以对文件扩展名进行筛选
- properties：打开文件的属性，比如打开文件还是打开文件夹，甚至是隐藏文件。

```js
const { dialog } = require("electron").remote;
const openBtn = document.getElementById("openBtn");
openBtn.onclick = function() {
  dialog
    .showOpenDialog({
      title: "选择文件",
      defaultPath: "xiaojiejie.jpg",
      filters: [{ name: "jpg", extensions: ["jpg"] }],
      buttonLabel: "打开小姐姐",
    })
    .then((result) => {
      const image = document.getElementById("image");
      image.setAttribute("src", result.filePaths[0]);
    })
    .catch((err) => {});
};
```

# 11.保存文件对话框使用
