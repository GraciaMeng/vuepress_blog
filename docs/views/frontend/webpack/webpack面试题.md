# 1.拆分配置和合并配置

### 开发环境和生产环境都会使用的配置

webpack.base.config.js

```js
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry:{
    main:'./src/index.js',
  },
  output:{
    filename:'[name].js',
    path:path.resolve(__dirname,'dist')
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    })
  ]
}
```

### 开发环境配置

webpack.dev.config.js

```js
const {smart:merge} = require('webpack-merge');

const devConfig = {
  mode:'develoment'
}
module.exports = merge(commonConfig, devConfig)
```

### 生产环境配置

webpack.prod.config.js

```js
const {smart:merge} = require('webpack-merge');

const prodConfig = {
  mode:'production'
}
module.exports = merge(commonConfig, prodConfig)
```

package.json

```js
//配置scripts
"scripts":{
	"build:dev":"webpack --config ./build/webpack.dev.config.js",
	"build":"webpack --config ./build/webpack.prod.config.js",
}
```

# 2.如何使用webapck-dev-server

是在开发环境的配置

```js
const devConfig = {
  mode:'develoment',
  devServer:{
    port:8080, //服务器启动的端口 8080
    contentBase:'./dist', // 服务器静态资源文件夹
    progress:true,//打包时显示进度条
    open:true, // 启动服务器后，自动打开浏览器
    compress:true, //开启gzip压缩
  }
}
```

package.json

```js
//配置scripts
"scripts":{
	"dev":"webpack-dev-server --config ./build/webpack.dev.config.js"
}
```

# 3.如何处理样式

webpack.base.config.js

```js
module.exports = {
  module:{
      rules:[
          {
              test:/\.css$/, //以css结尾
              loader:[
                  'style-loader',
                  'css-loader',
                  'postcss-loader',//处理浏览器兼容性，要在根目录下创建postcss.config.js
                  //从下往上执行
              ]
          }
      ]
  }
}
```

postcss.config.js

```js
module.exports = {
    plugins:[
        require('autoprefixer')
    ]
}
```

package.json对浏览器针对一些设置

```js
"browserslist":[
    "> 1%",
    "last 2 versions"
]
```

# 4.处理图片

比较小的图片，就转换成了base64格式，可以减少http请求

比较大的图片，依旧像file-loader一样，单独打包到img文件夹里面，发送请求，防止页面首次渲染太慢。

### 开发环境配置

webpack.dev.config.js

```js
const devConfig = {
  mode:'develoment',
  module:{
      rules:[
          {
              test:/\.(png|jpg)/,
              loader:'file-loader'
          }
      ]
  }
}
```

### 生产环境配置

webpack.prod.config.js

```js
const prodConfig = {
  mode:'production',
  module:{
      rules:[
          {
              test:/\.(png|jpg)/,
              use:{
                  loader:'url-loader',
                  options:{
                      limit:5 * 1024,
                      outputPath:'/img/'
                  }
              }
          }
      ]
  }
}
```

# 5.多入口

webpack.base.config.js

```js
module.exports = {
  entry:{
    index:'./src/index.js',
    other:'./src/other.js'
  },
  output:{
    filename:'[name].js',
    path:path.resolve(__dirname,'dist')
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      filename:'index.html',
      chunks:['index']
    }),
    new HtmlWebpackPlugin({
      template:'./src/other.html',
      filename:'other.html',
      chunks:['other']
    }),
  ]
}
```

# 6.抽离css

如果不设置，css样式会打包到js文件中

生产环境下，通常抽离css

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Terserplugin = require('terser-webpack-plugin');
const OptimizecssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
  mode:'production',
  module:{
    rules:[
      {
        test:/\.css/,
        loader:[
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins:[
    new MiniCssExtractPlugin({
      filename:'css/main.[contentHash:8].css'
    })
  ],
  //优化
  optimization:{
    minimizer:[
      //压缩js
      new Terserplugin(),
      //压缩js
      new OptimizecssAssetsWebpackPlugin()
    ]
  }
}
```

# 7.抽离公共代码

- 公共模块
  - 公共模块的代码不需要重复打包，单独抽离成一个公共模块的文件，然后引用即可
- 第三方模块
  - 第三方模块的代码一般不会轻易改变，不需要在业务代码改变之后再重新打包，单独抽离成一个第三方模块的文件，然后引用即可

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['index', 'vendor', 'common']
    })
  ],
  optimization: {
    //代码分割
    splitChunks: {
      //all 对同步、异步代码 都做代码分割
      //async 只对异步代码做代码分割
      //initial 只对同步代码做代码分割
      // 同步代码，例如import lodash from 'lodash';
      //异步代码，例如import('lodash')
      chunks: 'all',
      cacheGroups: {
        //第三方模块
        vendor: {
          //每个组的名字
          name: 'vendor',
          //优先级，优先级越高，越先检测处理
          //第三方模块 可能也会被作为公共模块 来检测处理，通过高优先级，达到先被当作 第三方模块 来检测处理
          priority: 1,
          // 检测方法，例如：检测模块是否来自 node_modules
          test: /node_modules/,
          // 实际开发中，可以些5 * 1024,也就是5kb
          // 但这里为了看到代码分割效果，我们把值设置最小，也就是0
          minSize: 0,
          // 检测模块被引用了几次
          // 对于第三款模块而已，引用1此就应该单独打包
          // 对于公共模块而已，引用2此以上就应该单独打包
          minChunks: 1
        },
        // 公共模块
        common: {
          //每个组的名字
          name: 'common',
          priority: 0,
          minSize: 0,
          minChunks: 2
        }
      }
    }
  },
}
```

