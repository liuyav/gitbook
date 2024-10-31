### 一、什么 Webpack

> webpack 是一个打包模块化的 javascript 工具，它会从入口模块出发，识别出源码中的模块化导入语句，递归地找出入口文件的所有依赖，将入口和其所有的依赖打包到一个单独的文件中，是工程化、自动化思想在前端开发中的体现。



### 一、安装

```javascript
// 依赖安装
npm i -D webpack webpack-cli
```

本地安装方式启动：npx webpack

查看各个阶段耗时：npx webpack --profile



### 二、webpack 默认配置

1. 执行 npx webpack 时候会默认寻找 webpack.config.js 配置文件；
2. 默认入口为 src/index.js；
3. 默认出口为 dist/main.js;
4. 默认 mode 为 production；
5. 配置参数 context 用于配置项目打包的相对路径，默认为根目录；
6. 默认支持 json 和 js 模块，默认后缀名为 .json 、.js。



### 三、webpack 核心概念

#### 1. entry

webpack 入口，执行 npx webpack 之后会在 entry 字段下找对应的文件入口地址，支持单入口、多入口。

单入口：

```javascript
// 方式一：接收一个 string
module.exports = {
	entry: './src/index.js'	
};

// 方式二：接收一个 array
module.exports = {
	entry: ['./src/index.js', './src/other.js']  
};
```

多入口：

```javascript
// 接收一个对象，key 为入口
module.export = {
    entry: {
        index: './src/index.js',
        other: './src/other.js'
    }
};
```



#### 2. output

webpack 打包出口位置，出口文件是一个对象。

```javascript
const path = require('path');
module.exports = {
    // path：必须为绝对路径
    path: path.reslove(__dirname, './dist'),
    // filename：构建文件名字，支持占位符输出
    filename: '[name].js'
};
```



#### 3. bundle

webpack 对文件进行打包生成的静态文件资源被称为 bundle，1 chunk = 1 bundle = 一个文件 



#### 4. loader

webpack 处理不认识的模块的时候，会到 module 列表中找到对应的正则匹配规则，应用对应的 loader 来增强对其他格式文件的处理；如果匹配到规则，就按照 loader 列表中的顺序从后往前加载 loader 处理文件。



#### 5. plugin

作用于整个打包过程，对 webpack 不具备的功能进行扩展。



### 四、webpack 占位符

1. hash

   - 每次构建都会生成、即使文件没有改
   - 默认长度20，可以指定长度[hash:16]

2. chunkHash

   - 根据不同入口 entry 进行依赖解析，构建对应 chunk
   - 只要组成 entry 的模块没有内容改变，则对应的 hash 不变
   - 多入口可以使用 chunkhash

3. contentHash

   - 父 chunk 改变，子 chunk 不变，子 chunk 使用 contentHash 时候就不会随着父 chunk 改变而改变

4. name

   - bundle 名称

   

