## 一、webpack 构建 bundle 原理分析实现
1. webpack 启动后会接受一份配置
2. 通过 fs 模块读取配置内容，拿到入口
3. 通过 @babel/parser 模块将配置内容转成抽象语法树 AST
4. 通过 ast 拿到对应的 dependencies、code、entryFile
5. 通过 for 循环递归拿出所有的依赖，生成 code
6. 拿到 code 去做生成器函数并输出到 dist 目录