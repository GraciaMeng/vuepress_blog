# Service Worker

离线缓存

### Service Worker特性:

- 不能直接访问/操作Dom
  - 特定api：Promise、Fetch API、Cache API
- 需要时直接唤醒，不需要时自动休眠
- 离线缓存内容开发者可控
- 一旦被安装则永远存活，除非手动卸载
- 必须在HTTPS环境下工作(本地环境除外)
- 广泛使用了Promise 

创建

```js
if ("serviceworker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/dist/ms-swiper.js", { scope: "/dist/" })
            .then((registeration) => {
            console.log(registeration.scope);
        })
            .catch((error) => {
            console.log(error);
        });
    });
}
```

