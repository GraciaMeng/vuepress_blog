# 1.vue3开发环境搭建

# 2.react开发环境搭建

# 3.搭建外部编译服务

# 4.vite对编译的支持

- postcss只需创建postcss.config.js自行配置

- css modules

  - ```js
    import styles from "./index.module.css";
    export default {
        setup(){
            return {styles}
    	}
    }
    ```

  - ```vue
    <template>
    	<div :class="$style.name"></div>
    </template>
    <style module>
        .name{
            color:#fff;
        }
    </style>
    ```

- css pre-processors  css预处理器（sass，less，stylus）
  - yarn add -D sass
- 支持jsx

# 5.http代理配置与实践

```js
export default {
    proxy: {
        '/api':{
            target:'http://localhost:5000',
            changeOrigin:true,
            rewrite:path=>path.replace(/^\/api/,'')
        }
    }
}
```

# 6.设置别名的方法

```js
const {path} = require('path')
export default {
    alias: {
        '/@/':resolve(__dirname,'src'),
        
    }
}
```

# 7.setup

初始化属性之后，beforeCreate之前执行

# 8.reactive

