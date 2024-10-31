### 一、自定义 Loader 实现

> 一个loader就是一个Node.js 模块，这个模块需要导出一个函数，这个导出的函数的工作就是获得处理前的源内容，对源内容进行处理后，返回处理后的内容。



自定义一个 loader

```js
// ./src/loaders/replace-loader.js
module.exports = function(source, sourceMap, ast) {
  // 通过 this.query 接收配置传递的参数
  const { str } = this.query;
  return source.replace('aaa', str);
};
```

webpack 中使用

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
  },
  // 定义自定义 loader 所在位置
  resolveLoader: {
    modules: ['node_modules', './src/loaders']
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: {
          loader: 'replace-loader',
          options: {
            str: 'bbb'
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    })
  ],
  devServer : {
    contentBase: './dist'
  }
};
```

loader 的两种返回方式

```js
// return source
module.exports = function (source) {
    return source;
}

// this.callback()
module.exports = function (source) {
    this.callBack(null, source);
}
```

this.callback 详细用法

```js
this.callback(
    // 当无法转换源内容时，给 Webpack 返回一个 Error
    err: Error | null,
    // 源内容转换后的内容
    content: string | Buffer,
    // 用于把转换后的内容得出原内容的 Source Map，方便调试
    sourceMap?: SourceMap,
    // 如果本次转换为原内容生成了 AST 语法树，可以把这个 AST 返回，
    // 以方便之后需要 AST 的 Loader 复用该 AST，以避免重复生成 AST，提升性能
    abstractSyntaxTree?: AST
);
```

异步 loader 

```js
module.exports = function(source, sourceMap, ast) {
  const { str } = this.query;
  // 使用 this.async 处理异步 loader
  const cb = this.async();

  setTimeout(() => {
    cb(null, source.replace('aaa', str))
  }, 2000)
};
```



### 二、自定义 Plugin 实现