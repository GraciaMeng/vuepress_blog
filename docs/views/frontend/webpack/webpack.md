

# 1.webpack五个概念

## **（1） Entry**

入口(Entry)指示 webpack 以哪个文件为入口起点开始打包，分析构建内部依赖图。 

## **（2） Output** 

输出(Output)指示 webpack 打包后的资源bundles 输出到哪里去，以及如何命名。 

## **（3） Loader** 

Loader 让 webpack 能 够 去 处 理 那 些 非 JavaScript 文 件(webpack 自 身 只 理 解 JavaScript) 

## **（4） Plugins** 

插件(Plugins)可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩， 一直到重新定义环境中的变量等。 

## **（5） Mode** 

模式(Mode)指示 webpack 使用相应模式的配置。

| 选项        | 描述                                                         | 特点                        |
| ----------- | ------------------------------------------------------------ | --------------------------- |
| development | 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置 为 development。启用 NamedChunksPlugin 和 NamedModulesPlugin。 | 能让代码本地调试 运行的环境 |
| production  | 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置 为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin,SideEffectsFlagPlugin 和 TerserPlugin。 | 能让代码优化上线 运行的环境 |

# 2.webpack初体验

## （1）初始化配置

1. 初始化 package.json 
   - 输入指令: 
     - npm init
2. 下载并安装 webpack 
   - 输入指令: 
     - npm install webpack webpack-cli -g 
     - npm install webpack webpack-cli -D

## （2）**编译打包应用**

1. 创建文件 
2. 运行指令 
   - 开发环境指令：webpack src/js/index.js -o build/js/built.js --mode=development 
   - 功能：webpack 能够编译打包 js 和 json 文件，并且能将 es6 的模块化语法转换成浏览器能识别的语法。 
   - 生产环境指令：webpack src/js/index.js -o build/js/built.js --mode=production 
   - 功能：在开发配置功能上多一个功能，压缩代码。 
3. 结论
   - webpack 能够编译打包 js 和 json 文件。 
   - 能将 es6 的模块化语法转换成浏览器能识别的语法。 
   - 能压缩代码。 
4. 问题
   - 不能编译打包 css、img 等文件。 
   - 不能将 js 的 es6 基本语法转化为 es5 以下语法。

# 3.webpack开发环境的基本配置

## （1）创建配置文件

1.创建文件 webpack.config.js 

2.配置内容如下

```js
const { resolve } = require('path'); // node 内置核心模块，用来处理路径问题。
```

```js
module.exports = { 
    entry: './src/js/index.js', // 入口文件 
    output: { 
        // 输出配置 
        filename: './built.js', 
        // 输出文件名 
        path: __dirname + '/b',
        // 输出文件路径配置 
    },
    mode: 'development' //开发环境 
};
```

3.运行指令: webpack

## （2）打包样式资源

1. 创建文件

2. 下载安装 loader 包

   - npm i css-loader style-loader less-loader less -D

3. 修改配置文件

   ```js
   // resolve 用来拼接绝对路径的方法 
   const { resolve } = require('path'); 
   module.exports = { 
       // webpack 配置 
       // 入口起点 
       entry: './src/index.js',
       // 输出 
       output: { 
           // 输出文件名 
           filename: 'built.js', 
           // 输出路径 
           // __dirname nodejs 的变量，代表当前文件的目录绝对路径 
           path: resolve(__dirname, 'build')
   	},
   // loader 的配置 
       module: { 
           rules: [ 
               // 详细 loader 配置 
               // 不同文件必须配置不同 loader 处理 
               { 
                   // 匹配哪些文件 
                   test: /\.css$/, 
                   // 使用哪些 loader 进行处理 
                   use: [ 
                       // use 数组中 loader 执行顺序：从右到左，从下到上 依次执行 
                       // 创建 style 标签，将 js 中的样式资源插入进行，添加到 head 中生效 
                       'style-loader', 
                       // 将 css 文件变成 commonjs 模块加载 js 中，里面内容是样式字符串 
                       'css-loader' 
                   ] 
               },
               { 
                   test: /\.less$/, 
                   use: [ 
                       'style-loader', 
                       'css-loader', 
                       // 将 less 文件编译成 css 文件 
                       // 需要下载 less-loader 和 less 'less-loader' 
                   ] 
               } 
           ] 
       },
   }
   ```

   

4. 运行指令: webpack

## （3）打包HTML资源

npm install --save-dev html-webpack-plugin

```js
const { resolve } = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
module.exports = { 
    entry: './src/index.js', 
    output: { 
        filename: 'built.js', 
        path: resolve(__dirname, 'build') 
    },
    plugins: [ 
        // plugins 的配置 
        // html-webpack-plugin 
        // 功能：默认会创建一个空的 HTML，自动引入打包输出的所有资源（JS/CSS） 
        // 需求：需要有结构的 HTML 文件 
        new HtmlWebpackPlugin(
            { 
                // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS） 
                template: './src/index.html' 
            }
        ) 
    ],
    mode: 'development' 
};
```

## （4）打包图片资源

npm install --save-dev html-loader url-loader file-loader

```js
const { resolve } = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
module.exports = { 
    entry: './src/index.js', 
    output: { 
        filename: 'built.js', 
        path: resolve(__dirname, 'build') 
    },
    module: { 
        rules: [ 
            { 
                test: /\.less$/, 
                // 要使用多个 loader 处理用 use 
                use: ['style-loader', 'css-loader', 'less-loader'] 
            },
            { 
                // 问题：默认处理不了 html 中 img 图片
                // 处理图片资源 
                test: /\.(jpg|png|gif)$/, 
                // 使用一个 loader 
                // 下载 url-loader file-loader 
                loader: 'url-loader', 
                options: {
                    // 图片大小小于 8kb，就会被 base64 处理 
                    // 优点: 减少请求数量（减轻服务器压力）
                    // 缺点：图片体积会更大（文件请求速度更慢） 
                    limit: 8 * 1024, 
                    // 问题：因为 url-loader 默认使用 es6 模块化解析，而 html-loader 引入图片是 commonjs 
                    // 解析时会出问题：[object Module] 
                    // 解决：关闭 url-loader 的 es6 模块化，使用 commonjs 解析 
                    esModule: false, 
                    // 给图片进行重命名 
                    // [hash:10]取图片的 hash 的前 10 位 
                    // [ext]取文件原来扩展名 
                    name: '[hash:10].[ext]' 
                } 
            },
            { 
                test: /\.html$/, 
                // 处理 html 文件的 img 图片（负责引入 img，从而能被 url-loader 进行处理） 
                loader: 'html-loader',
                options:{
                    esModule:false
                }
            } 
        ] 
    },
 };
```

## （5）打包其他资源

```js
// 打包其他资源(除了 html/js/css 资源以外的资源) 
{ 
    // 排除 css/js/html 资源 
    exclude: /\.(css|js|html|less)$/, 
    loader: 'file-loader', 
    options: { 
        name: 'assets/[hash:10].[ext]' 
    } 
}
```

## （6）devServer热加载

npm i  webpack-dev-server -D

```js
var path = require('path');
module.exports = {
    // 开发服务器devServer：用来自动化（自动编译，自动打开浏览器，自动刷新浏览器~）
    // 特点：只会在内存中编译打包，不会有任何输出
    // 启动devServer指令：webpack-dev-server
    devServer: {
         // 项目构建后路径 
        contentBase: path.join(__dirname, 'dist'),
        // 启动 gzip 压缩 
        compress: true,
        // 端口号 
        port: 3000,
        // 自动打开浏览器 
        open: true 
    },
};
```

# 4.webpack生产环境配置

## （1）提取css为单独文件

npm install --save-dev mini-css-extract-plugin

```js
var path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    module: { 
        rules: [ 
            { 
                test: /\.css$/, 
                use: [ 
                    // 创建 style 标签，将样式放入 
                    // 'style-loader', 
                    // 这个 loader 取代 style-loader。作用：提取 js 中的 css 成单独文
                    MiniCssExtractPlugin.loader, 
                    // 将 css 文件整合到 js 文件中 
                    'css-loader' 
                ] 
            } 
        ] 
    },
    plugins: [ 
       new MiniCssExtractPlugin({ 
           // 对输出的 css 文件进行重命名 
           filename: 'css/built.css' 
       }) 
    ],
};
```

## （2）**css** **兼容性处理**

npm install --save-dev postcss-loader postcss-preset-env

```js
var path = require('path');
module.exports = {
    module: { 
        rules: [ 
            { 
                test: /\.css$/, 
                use: [ 
                    MiniCssExtractPlugin.loader,  
                    'css-loader',
                    { 
                        loader: 'postcss-loader', 
                        postcssOptions: { 
                            ident: 'postcss', 
                            plugins: [ 
                                // postcss 的插件 
                                require('postcss-preset-env')() 
                            ] 
                        } 
                    }
                ] 
            } 
        ] 
    },
    plugins: [ 
       new MiniCssExtractPlugin({ 
           // 对输出的 css 文件进行重命名 
           filename: 'css/built.css' 
       }) 
    ],
};
```

## （3）压缩css

npm install --save-dev optimize-css-assets-webpack-plugin

```js
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin' )
module.exports = {
    module: { 
        rules: [ 
            { 
                test: /\.css$/, 
                use: [ 
                    MiniCssExtractPlugin.loader,  
                    'css-loader',
                    { 
                        loader: 'postcss-loader', 
                        postcssOptions: { 
                            ident: 'postcss', 
                            plugins: [ 
                                // postcss 的插件 
                                require('postcss-preset-env')() 
                            ] 
                        } 
                    }
                ] 
            } 
        ] 
    },
    plugins: [ 
      // 压缩 css 
        new OptimizeCssAssetsWebpackPlugin()
    ],
};
```

## （4）**js** **语法检查** 

npm install eslint-webpack-plugin eslint  --save-dev

```js
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  plugins: [
      new ESLintPlugin(
          {
              exclude:/node_modules/,
              fix:true
          }
      )
  ],
};
```

## （5）**js** **兼容性处理**

npm install --save-dev babel-loader @babel/core @babel/preset-env @babel/polyfill core-js 

```js
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin' )
module.exports = {
    module: { 
        rules: [ 
            /*
            	js兼容性处理babel-loader @babel/core @babel/preset-env
            	1.基本js兼容性处理 --> @babel/preset-env
            	问题：只能转换基本语法，如promise不能转换
            	2.全部js兼容性处理 --> @babel/polyfill
            	问题：只要解决兼容性问题，但是所有兼容性代码全部引入，文件体积太大
            	3.需要做兼容性处理: 按需加载 -->core.js
            */
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: 'babel-loader', 
                options: { 
                    // 预设：指示 babel 做怎么样的兼容性处理 
                    presets: [ 
                        [ '@babel/preset-env', { 
                            // 按需加载 
                            useBuiltIns: 'usage', 
                            // 指定 core-js 版本 
                            corejs: { version: 3 },
                            // 指定兼容性做到哪个版本浏览器 
                            targets: { 
                                chrome: '60', 
                                firefox: '60', 
                                ie: '9', 
                                safari: '10', 
                                edge: '17' 
                            } 
                        } 
                        ] 
                    ] 
                } 
            }
        ] 
    },
    plugins: [ 
      // 压缩 css 
        new OptimizeCssAssetsWebpackPlugin()
    ],
};
```

## （7）**HTML** **压缩**

新版自动压缩生产环境

```js
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  plugins: [
      new HtmlWebpackPlugin({
         template: './src/index.html', 
          // 压缩 html 代码 
          minify: { 
              // 移除空格 
              collapseWhitespace: true, 
              // 移除注释 
              removeComments: true 
          }
  	})
  ],
};
```

## 5.webpack优化配置

## （1）HMR

hot module replacement 热模块替换  /  模块热替换

作用：一个模块发生变化，只会重新打包（而不是打包所有）极大提升构建速度

样式文件：可以使用HMR功能，因为style-loader内部实现

js文件：默认不能使用HMR功能

html文件：默认不能使用HMR功能，而且会有问题

解决：修改entry入口，将html文件引入（删掉browserslist？）

```js
module.exports = {
	devServer: { 
        contentBase: resolve(__dirname, 'build'), 
        compress: true, 
        port: 3000, 
        open: true, 
        // 开启 HMR 功能 
        // 当修改了 webpack 配置，新配置要想生效，必须重新 webpack 服务 
        hot: true 
    }
}
```

## （2）source-map

一种提供源代码到构建后代码映射技术（如果构建后源代码出错，通过映射可以追踪源代码错的位置

```js
module.exports = {
    devtool:'source-map'
}
```

[inline-|hidden-|eval-]\[nosources-][cheap-[module-]]source-map

- source-map:外部  错误代码准确信息  和  源代码的错误位置

- inline-source-map内联   只生成一个内联source-map

- hidden-source-map外部   错误代码原因，但是没有错误位置

- eval-source-map内联   每一个文件都生成对应的source-map，都在eval。   错误文件有hash值，同inline

- nosources-source-map外部    错误代码准确信息，但是没有任何源代码信息

- cheap-source-map外部   只能精确到行

- cheap-module-source-map外部


内联和外部的区别：1.外部生产了文件，内联没有   2.内联构建速度更快



1. 开发环境：速度快，调试更友好
   - ​	速度快(eval>inline>cheap>....)
   - ​	调试更友好
     - cheap-source-map    cheap-module-source-map  cheap-source-map
     - eval-source-map (react框架)  /  eval-cheap-module-source-map
2. 生产环境：源代码要不要隐藏？调试要不要更友好
   - 内联会让代码体积变大，所以在生产环境中不用内联
   - nosources-source-map 全部隐藏
   - hidden-source-map 只隐藏源代码，会提示构建后代码错误信息

## （3）oneOf

提升构建速度：以下loader只会匹配一个

注意：不能有两个配置处理同一个类型文件

```js
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin' )
// 复用 loader const 
commonCssLoader = [ 
    MiniCssExtractPlugin.loader, 
    'css-loader', { 
        // 还需要在 package.json 中定义 browserslist 
        loader: 'postcss-loader', 
        options: { 
            ident: 'postcss', 
            plugins: () => [
                require('postcss-preset-env')()
            ] 
        } 
    } 
];
module.exports = {
    module: { 
        rules: [ 
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                //优先执行
                enforce:'pre',
                loader: 'eslint-loader', 
                options: { 
                    fixed:true
                } 
            },
            {
                oneOf:[
                    {
                        test:/^.css$/,
                        use:[...commonCssLoader]
                    },
                    {
                        test:/^.less$/,
                        use:[...commonCssLoader,'less-loader']
                    }
                ]
            }
        ] 
    },
    plugins: [ 
      // 压缩 css 
        new OptimizeCssAssetsWebpackPlugin()
    ],
};
```

## （4）缓存

- babel缓存：
  - cacheDirectory: true
- 文件资源缓存：
  - hash:每次webpack构建时打包会生成一个唯一的hash值
    - 问题：因为js和css同时使用一个hash值，如果重新打包，会导致所有缓存失效（可能我却只改动一个文件）
  - chunkhash：根据chunk生成的hash值，如果打包来源于同一个chunk，那么hash就一样
    - 问题：js和css的hash还是一样的
    - 因为css是在js中被引入的，所以同属于一个chunk
  - contenthash：根据文件的内容生成hash值。不同文件hash值一定不一样
    - 让代码上线运行缓存更好使用

```js
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin' )
module.exports = {
    module: { 
        rules: [ 
            /*
            	js兼容性处理babel-loader @babel/core @babel/preset-env
            	1.基本js兼容性处理 --> @babel/preset-env
            	问题：只能转换基本语法，如promise不能转换
            	2.全部js兼容性处理 --> @babel/polyfill
            	问题：只要解决兼容性问题，但是所有兼容性代码全部引入，文件体积太大
            	3.需要做兼容性处理: 按需加载 -->core.js
            */
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: 'babel-loader', 
                options: { 
                    // 预设：指示 babel 做怎么样的兼容性处理 
                    presets: [ 
                        [ '@babel/preset-env', { 
                            // 按需加载 
                            useBuiltIns: 'usage', 
                            // 指定 core-js 版本 
                            corejs: { version: 3 },
                            // 指定兼容性做到哪个版本浏览器 
                            targets: { 
                                chrome: '60', 
                                firefox: '60', 
                                ie: '9', 
                                safari: '10', 
                                edge: '17' 
                            } 
                        } 
                        ] 
                    ],
                    // 开启 babel 缓存 
                    // 第二次构建时，会读取之前的缓存 
                    cacheDirectory: true
                } 
            }
        ] 
    },
    plugins: [ 
      // 压缩 css 
        new OptimizeCssAssetsWebpackPlugin()
    ],
};
```

注意：如果出现bug，但是用户使用了强制缓存，会一直缓存已存好的，不会访问新的

在output的filename添加hash可有效解决（对js和css文件添加hash）

```js
output:{
	filename:'js/build.[hash:10].js',
	path:resolve(__dirname,'build')
}
```

## （5）tree shaking

去除无用代码

前提：

1.必须使用ES6模块

2.开启production模式

作用：减少代码体积



在package.json中配置

"sideEffects": false 所有代码都没有副作用（都可以进行tree shaking）

问题：可能会把css/@babel/polyfill（副作用）文件干掉

"sideEffects":["*.css"] 标记说明不会对这些文件进行处理

## （6）code_split

代码分割主要是将我们打包的一个chunk输出的一个文件输出成多个文件，可以实现各项功能

3个文件可以同时并行加载，实现按需加载

单页面应用下，把每个路由页面拆分成每个文件

注意：只有大于30kb的时候才会被分割，不然无效

```js
module.exports = {
    //多入口
    entry:{
        //有一个入口，最终输出就有一个bundle
        main:'./src/js/index.js',
        test:'./src/js/test.js'
    },
    output:{
        //取文件名[name]
        filename:"js/[name].[contenthash:10].js",
        path:resolve(__dirname,'build')
    }
}
```

```js
module.exports = {
    /*
    1. 可以将 node_modules 中代码单独打包一个 chunk 最终输出 
    2. 自动分析多入口 chunk 中，有没有公共的文件。如果有会打包成单独一个 chunk 
    */
    optimization: { 
        splitChunks: { 
            chunks: 'all' 
        } 
    }
}
```

在output加入chunkFilename:"js/[name].js"，魔法注释生效

## （7）懒加载和预加载

懒加载：当文件需要使用时才会加载

预加载：会在使用之前，提前加载js文件；等其他资源加载完毕，浏览器空闲了，在偷偷加载资源（兼容性差）

正常加载可以认为时并行加载（同一时间加载多个文件）

```js
import(/* webpackChunkName:'test',webpackPrefetch:true*/'./test').then(res=>{}).catch(err=>{})
```

## （8）PWA

让网页像app应用程序一样可以离线访问

PWA：渐进式网络开发应用程序（离线可访问）（webpack5无？）

workbox --> workbox-webpack-plugin

## （9）多进程打包

## （10）externals

```js
module.exports = {
    entry:'./src/js/index.js',
    output:{
        filename:"js/[name].[contenthash:10].js",
        path:resolve(__dirname,'build')
    },
    mode:'production',
    externals:{
        // 拒绝 jQuery 被打包进来 
        jquery: 'jQuery'
    }
}
```

## （11）dll

新建webpack.dll.js（不使用cdn，使用服务器资源才使用dll）

使用dll技术，对某些库（第三方库：jquery）单独打包

当运行webpack时，默认查找webpack.config.js文件

需求：需要运行webpack --config webpack.dll.js

```js
const resolve = require('path');
const webpack = require('webpack');
module.exports = {
    entry:{
      //最终打包生成的[name]->jquery
        //['jquery'] --> 要打包的库
        jquery:['jquery']
    },
    output:{
        filename:"[name].js",
        path:resolve(__dirname,'dll'),
        library:'[name]_[hash]', //打包的库里面向外暴露出去的内容叫什么名字
    },
    plugins:[
        // 打包生成一个manifest.json文件，提供和第三方库的映射
        new webpack.DllPlugin({
            name:'[name]_[hash]',//映射库的暴露的内容名称
            path:resolve(__dirname,'dll/manifest.json')//输出文件路径
        })
    ],
    mode:'production'
}
```

webpack.config.js

```js
module.exports = { 
    plugins: [
        new HtmlWebpackPlugin({ 
            template: './src/index.html' 
        }), 
        // 告诉 webpack 哪些库不参与打包，同时使用时的名称也得变~ 
        new webpack.DllReferencePlugin({ 
            manifest: resolve(__dirname, 'dll/manifest.json') 
        }), 
        // 将某个文件打包输出去，并在 html 中自动引入该资源 
        // npm i add-asset-html-webpack-plugin -D
        new AddAssetHtmlWebpackPlugin({ 
            filepath: resolve(__dirname, 'dll/jquery.js') 
        }) 
    ],
    mode: 'production' 
}
```

