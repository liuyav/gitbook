### 一、样式的处理方式

#### 1. 常用 loader、plugin 安装

```javascript
npm i -D style-loader css-loader sass-loader node-sass postcss-loader autoprefixer
```

#### 2. 配置 postcss

在项目目录下新建 postcss.config.js 文件，webpack 执行构建时候会自动读取该文件配置，配置方式如下：

```javascript
const autoprefixer = require('autoprefixer');
module.exports = {
    plugins: [autoprefixer({
        overrideBrowserslist: ["last 2 versions", ">1%"],
    })]
}
```

#### 3. 配置 webpack.config.js

webpack 处理过程：

- 首先使用 sass-loader 对 .scss 文件中语法进行转换；
- 在将编译后的文件交给 postcss 进行处理；
- 然后使用 css-in-js 方式将 css 插入到 js 代码中去；
- 最后使用 style-loader 解析出 css 代码，在页面创建 style 标签插入页面中去。

```javascript
module.exports = {
    module: {
    	test: /\.scss$/,
        use: [
            // 从 js 中提取出来并且创建 style 标签插入页面中
            'style-loader',
            // 插入到 js 中
            {
                loader: 'css-loader',
                options: {
                    // 开启 css 模块化
                    modules: true,
                },
            },
            // 编译后 css 进行 postcss 后处理
            {
                loader: 'postcss-loader',
            },
            // scss loader 先处理编译 css
            'sass-loader',
        ],
    }, 
};
```



### 二、静态资源的处理

#### 1. 字体的处理

依赖安装

```javascript
npm i -D file-loader
```

在 css 中定义字体

```css
@font-face {
    font-family: 'webfont';
    font-display: swap;
    // 下载下来的字体本地路径
    src: url('webfont.woff2') format('woff2');
}
```

webpack 规则配置

```javascript
module.exports = {
    module: {
        rules: [
            {
                // 匹配字体规则
                test: /\.(eot|ttf|woff|woff2|svg)$/,
                use: 'file-loader',
            }
        ],
    }
};
```



#### 2. 图片的处理 url-loader

url-loader 与 file-loader 功能一致，并且多了一个 limit 配置，可以根据文件大小确定生成 bundle 还是使用 base64 数据。



依赖安装

```javascript
npm i -D url-loader
```

webpack 配置

```javascript
module.exports = {
    module: {
        rules: [
        	{
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    loader: 'url-loader',
                    options: {
                        // ext 文件后缀名
                        name: "[name]_[hash:6].[ext]",
                        // 输出目录
                        outputPath: 'images/',
                        // 推荐使用 url-loader 因为支持 limit，单位字节
                        limit: 2 * 1024,
                    }
                ],
            },
        ],
    }
};
```



### 三、处理 html 模块文件

对 html 处理，一个是对模块文件进行预配置，第二是每次生成的时候对打包文件路径进行清理。



依赖安装

```
npm i -D html-webpack-plugin clean-webpack-plugin
```

webpack 配置

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlgin = require('clean-webpack-plugin');
module.exports = {
    plugin: [
        new 
        new HtmlWebpackPlugin({
            // 选择模板
            template: './src/index.html',
            filename: 'index.html',
            // 资源注入位置 (true | 'body') | 'head' | false
            inject: true,
            // 开启压缩 {} | false
            minify: false,
            // 网站 icon
            favicon: '',
            // title 设置方式
            //     1. 这里设置 title
            //     2. 模块默认支持 ejs，在模板内引用 title 变量
            //         - <%= htmlWebpackPlugin.options.title %>
            title: '首页'
        })
    ]
};
```



### 四、SourceMap 配置

开发模式默认开启，生产模式推荐配置如下。

```
module.exports = {
    // 推荐配置
    devtool: 'eval-cheap-module-source-map'
}
```



### 五、WebpackDevServer

webpack 本地开发服务器，每次修改代码需要重新打包，利用 devserver 提高效率（基于express）



依赖安装

```js
npm i -D webpack-dev-server

// 启动
npx webpack server
```

1. 本地开发服务搭建：

```js
const webpack = require('webpack');
module.exports = {
    devServer: {
        // 设置目录路径
        contentBase: "./dist",
        // 是否打开浏览器
        open: true,
        // 端口
        port: 8080,
        // 开启 css 热更新
    	hot: true,
    	// 即便 HMR 没有生效，浏览器也不要自动刷新
    	hotOnly: true
        // 代理设置
        proxy: {
            "/api": {
                target: "http://localhost:9090"
            }
        },
        // 在 webpack-dev-server 静态资源中间件处理之前，可以用于拦截部分请求返回特定内容，或者实现简单的数据 mock。
        before(app, server) {
            app.get("/api/info", (req, res) => {
                res.json({hello: "express"});
            })
        },
        // 在 webpack-dev-server 静态资源中间件处理之后，比较少用到，可以用于打印日志或者做一些额外处理。
        after() {},
    },
    plugins: [
        // css 热更新配置
    	new webpack.HotModuleReplacementPlugin()
	]
	// js 热更新配置使用 react-hot-loader
}
```



### 六、使用 babel 处理 jsx

依赖安装

```js
npm i -D @babel/core @babel/preset-env @babel/preset-react babel-loader
```

bable.config.js 配置

```js
module.exports = {
	presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    edge: "17",
                    firefox: "60",
                    chrome: "67",
                    safari: "11.1",
                },
                corejs: 2,
                // entry 在入口引入一次，按需引入
                // usage 不需要 import，全自动检测
                // false 不会按需引入
                useBuiltIns: "usage",
            }
        ],
        "@babel/preset-react"
    ],
};
```

webpack 配置

```js
module: {
    rules: [
        {
            exinclude: /node_modules/,
            test: /.jsx?$/,
            use: {
                loader: 'babel-loader'
            }
        },
    ],
};
```



### 七、js 代码兼容

依赖安装

```
npm i -S polyfill
npm i -D @babel/plugin-transform-runtime
npm i -S @babel/runtime
```

当 babel 兼容不了的写法的时候，使用 polyfill 第三方库进行兼容，他不会转换代码。

当开发组件库时候，polyfill 不适合了，因为注入的是全局变量，所以推荐使用闭包方式，配置如下：

```javascript
module.exports = {
    plugins: [
        {
            "@babel/plugin-transform-runtime",
            {
                absoluteRuntime: false,
                corejs: false,
                helper: true,
                regenerator: true,
                useESModules: false,
            }
        }
    ]
};
```

