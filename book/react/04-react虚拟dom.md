##### 什么是 ```vdom```

用 javascript 对象表示 dom 信息与结构，当状态变更时候，重新渲染这个 JavaScript 的对象结构，这个 JavaScript 对象称为 vom



##### 为什么用 ```vdom```

1. 传统 dom 渲染流程（domTree、styleRules、renderTree）渲染出来的 dom 节点比较庞大
2. 比较真实 dom 节点时候比较庞大，成本高
3. 用 js 对象处理，通过 diff 算法对新旧 vom 之间比较差异，最小化执行dom操作，提高性能



##### jsx

react 中使用 jsx 描述试图，通过 babel-loader 转译后变成 React.createElement() 形式，该函数讲生成的 vdom 来描述真实 dom，如果将来状态变化，vdom做出相应变化，在通过 diff 算法对比新老 dom 区别从而做出最终dom操作

使用 jsx 是为了更简单生成 vdom



##### React.createElement() 

创建虚拟dom



##### React.Component()

实现自定义组件



##### ReactDOM.render()

渲染真实dom

1. 初次调用时候替换容器节点dom元素
2. 第二次调用会使用 dom 差分算法，进行高效更新