### 一、优化打包体验

#### 1. 缩小文件范围

loader是一个消耗性能的大户，进行 loader 匹配时候，使用

- include（包含）
- exclude（排除）

缩小文件检索范围，提高构建速度



#### 2. 限制文件查找范围

限制模块查找范围，定位到当前项目下的 node_modules

```js
module.exports = {
   	resolve: {
    	modules: [path.resolve(__dirname, "./node_modules")]
	} 
};
```



#### 3. 减少查找过程

通过别名设置多次引用依赖的路径地址，减少查找过程

```js
module.exports = {
   	resolve: {
    	alias: {
            // 设置 react react-dom 路径，减少查找
            "react": './node_modules/react/umd/react.production.min.js',
            "react-dom": './node_modules/react-dom/umd/react-dom.production.min.js',
            "@css": './src/assets/css',
    	}
	} 
};
```



#### 4. 优化 cdn 静态资源

设置之后，打包时候不打包 cdn 资源，而是在模板中手动引入，打包速度更快。

index.html 模板中手动引入

```javascript
<script src="http://cdn.js.com/js/lodash.js"></script>
```

webpack 配置了 externals 之后，webpack 对他不进行打包，需要在模板手动引入

```js
module.exports = {
   	externals: {
    	lodash: '_'
	}
};
```



#### 5. 静态资源使用 cdn 方式

使用 cdn 方式，优化第一次访问速度，第二次走缓存都一样了。

```javascript
module.exports = {
    output: {
        // 需要手动上传打包后 js 文件
    	filename: '[name].js'
    	publicPath: 'http://cdn.com/js/'
	}
};
```



#### 6. 压缩 Css、Html

html 在 html-webpack-plugin 中配置，css 生产模式使用 optimize-css-assets-webpack-plugin

安装

```javascript
npm i -D optimize-css-assets-webpack-plugin html-webpack-plugin
```

css 压缩

```javascript
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
   	plugins: [
        {
            new OptimizeCSSAssetsPlugin({
                cssProcessor: require('cssnano'),
                cssProcessorOptions: {
                    discardComments: { removeAll: true },
                }
            })
        }
    ]
};
```

html压缩

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    plugin: [
        new HtmlWebpackPlugin({
           	minify: {
                removeComments: true,
                collapseWhitespace: true,
                minifyCSS: true,
            },
        })
    ]
};
```



#### 7. dev 与 pro 打包区分

- 抽取出公共配置与 dev、pro 配置文件；

- 使用 webpack-merge 合并出 dev、pro 配置；

- 通过 mode 区分打包

  

#### 8. TreeShaking

"摇树"，清除无用的代码，即 Dead Code
Dead Code 一般具有以下几个特征：

- 代码不会被执行，
- 代码执行结果不被用到
- 代码只会影响死变量
- js tree shaking 只支持 ES module 的引入方式

依赖安装

```javascript
npm i glob-all purify-css purifycss-webpack -D
```

webpack 配置

```javascript
const PurifyCSS = require('purifycss-webpack')
const glob = require('glob-all');

module.exports = {
    // css treeshaking
    pulgins: [
        new PurifyCSS({
            path: glob.sync([
                path.resolve(__dirname, "./src/*.html"),
                path.resolve(__dirname, "./src/*.js")
            ])
        })
    ]
    // js treeshaking
    // 生产模式下生效，开发模式为了方便调试，不生效。
    optimization: {
    	usedExports: true    // 哪些导出的模块被使用了，在做打包
	}
};
```

排除 treeshaking 规则，在 package.json 中 sideEffects 字段配置，可设置不对 treeshaking 生效的范围

```json
{
    sideEffects: [
        './src/*.scss'
    ]
}
```



#### 9. 加载优化

使用魔法注释，进行 prefetch、preload

- prefetch: 当浏览器发现进程空闲时候，会请求一些异步模块（比如点击时候触发的模块）
- preload: 预先加载，不管是否空闲，比较重要先展示的一些模块

使用 import() 语法时候加上注释，开启魔法注释

```js
// 生成 <link rel="prefetch" href="modleName.js" /> 并追加页面头部
import(/* webpackPrefetch: true */, 'moduleName');

// 
import(/* webpackPreload: true */, 'moduleName');
```



#### 10. scope hoisting

webpack 通过 ES6 语法的静态分析，分析出模块之间的依赖关系，尽可能的把模块放在同一个函数中，优化 bundle 文件体积

```js
module.exports = {
    optimization: {
    	concatenateModules: true
	}
};
```



#### 11. HappyPack 并发执行任务

运行在 Node 之上的 webpack 是单线程模型的，也就是说 webpack 需要一个个地处理任务，不能同时处理多个任务，HappyPack 就能让 webpack 做到这一点，它将任务分解给多个子进程去并发执行，子进程处理完再将结束发送给主进程，从而发挥多核 CPU 电脑的威力。



依赖安装

```powershell
yarn add happypack --development
```

webpack 配置

```js
const os = require('os');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.TheadPool({
    size: os.cpus().length
})

module.exports = {
    module: {
        rules: [
            {
                test: /.jsx?$/,
                use: [
                    {
                        loader: "happypack/loader?id=babel"
                    }
                ]
            },
            {
                test: /\.s?css$/,
                use: ["happypack/loader?id=css"]
            }
        ],
    }
    plugins: [
        new HappyPack({
    		id: 'babel',
    		loaders: ['babel-loader'],
           	// 共享进程池 功能慎用，项目较小构建时间反而增加了
           	threadPool: happyThreadPool
		}),
        new HappyPack({
    		id: 'css',
    		loaders: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: true
                    }
                },
                'postcss-loader',
                'scss-loader'
            ]
		})
    ]
};
```

与 min-css-extract-plugin 配合不好



### 二、优化开发体验

#### 1. 设置后缀（不推荐）

webpack 默认支持 .js、.json，设置后缀后写法上舒服，但是推荐带上后缀，减少查找。

```js
module.exports = {
   	resolve: {
    	extensions: ['.js', '.json', '.jsx', '.ts']
	} 
};
```



#### 2. Dll 抽取

dll 动态链接库，做缓存，只会提升 webpack 打包速度，并不能减少最后生成代码体积。

对依赖提前编译，进行缓存

webpack 已经内置了对动态链接库的支持
- DllPlugin: 用于打包出一个个单独的动态链接库文件
- DllReferencePlugin: 用于在主要配置的文件中引入 DllPlugin 插件打包好的动态链接库文件

新建 webpack.config.dll.js文件，打包基础模块

```javascript
const { DllPlugin } = require('webpack');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        react: ['react', 'react-dom'],
    },
    output: {
        path: path.resolve(__dirname, './dll'),
        filename: '[name].dll.js',
        library: 'react',
    },
    plugins: [
        new DllPlugin({
            path: path.join(__dirname, './dll', '[name]-manifest.json'),
            name: 'react'
        })
    ]
}
```

package.json 中配置命令

```json
{
    "script": {
        "build:dll": "webpack --config ./webpack.config.dll.js"
    }
}
```

使用 npm run build:dll 后会在根目录下生产 dll 文件夹，在模板文件中手动引入 dll 文件夹下的 reatc.dll.js。

通过这种方式，打包时候不打包 dll 已经打包的文件。

<P style="color: red; font-weight: bold">不能同时和代码分割、依赖别名设置同时使用<p>



### 三、二者兼具

#### 1. CodeSpliting

**单页面 spa：**

打包后，所有页面只生成一个 bundle.js 

- 代码体积变大，不利于下载
- 没有合理利用浏览器资源

**多页面应用 mpa：**

如果多个页面引入一些公共模块，可以把公共模块抽离出来，单独打包，公共代码只需要下载一次缓存起来，避免重复下载。



默认写入 splitChunks: { chunk: 'all' } 会把引用次数为1，体积大于 30kb 的分割出去



webpack 配置

```javascript
module.exports = {
    optimization: {
        splitChunks: {
            // all 支持两种模块
            // async
            // initial
            chunk: 'all',
            // 模块分割最小尺寸
            minSize: 30000,
            // 对模块进行二次分割时使用
            maxSize: 0,
            // 打包生产的 chunk 文件最少有几个 chunk 引用了这个模块
            minChunks: 1,
            // 最大异步请求数
            maxAsyncRequest: 5,
            // 打包分割符号
            automaticNameDelimiter: '-',
            // 打包后的名字，可以就收布尔值或者函数
            name: true,
            // 分成多个组文件
            cacheGroups: {
                lodash: {
                    test: /lodash/,
                    name: 'lodash',
                },
                react: {
                    test: /react|react-dom/,
                    name: 'react',
                    // 优先级
                    priority: 10
                }
            }
        }
    }
};
```



### 四、性能分析工具

#### 1. 测量 Plugin 与 Loader 耗时

依赖安装

```js
npm i -D speed-measure-webpack-plugin
```

webpack 配置

```js
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();

// webpack 配置
const config = {};

module.exports = smp.wrap(config)
```

#### 2. 分析 webpack 打包后的模块依赖关系

分析 webpack 打包后的模块依赖关系，启动 weback 时候会默认打开一个窗口

依赖安装

```js
npm i -D webpack-bundle-analyzer
```

webpack 配置

```js
const BundleAnalyZerPlugin = require('webpack-bundle-analyzer').BundleAnalyZerPlugin;

module.exports = merge(baseWebpackConfig, {
    plugins: [
        new BundleAnalyZerPlugin(),
    ]
})
```

