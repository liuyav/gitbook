## 一、介绍

> Vue 的响应式原理是核心是通过 ES5 的保护对象的 Object.defindeProperty 中的访问器属性中的 get 和 set 方法，data 中声明的属性都被添加了访问器属性，当读取 data 中的数据时自动调用 get 方法，当修改 data 中的数据时，自动调用 set 方法，检测到数据的变化，会通知观察者 Wacher，观察者 Wacher自动触发重新render 当前组件（子组件不会重新渲染）,生成新的虚拟 DOM 树，Vue 框架会遍历并对比新虚拟 DOM 树和旧虚拟 DOM 树中每个节点的差别，并记录下来，最后，加载操作，将所有记录的不同点，局部修改到真实 DOM 树上。



## 二、原理实现

### 1、vue 进行实例化过程：

1. 通过 Observer 劫持所有的数据。
2. 解析模板里面出现的指令，再把通过 Observer 劫持的数据 getter 一下进行赋值，初始化视图。
3. 同时定义一个更新函数和 Watcher，将来数据变化的时候 Watcher 会调用更新函数。
4. 定义Proxy 函数代理 $data，方便用户直接访问 data 里面的数据。



### 2、new Vue() 构造函数解析

1.  进行 new Vue() 时候会传入一个 options 选项，保存选项。
2.  拿出选项 data 数据，传递给 Observer 做数据相应化。
3.  创建编译器，传递 $el / vm 参数



### 3、Observer 数据响应化

1.  对传入数据进行判断，如果是引用类型值进行递归遍历取出值，在进行 defineReactive 处理



## 三、Compile 编译

拿到模板遍历子元素，根据不同情况做处理：

### 1、文本元素

编译文本



### 2、节点元素

遍历属性，根据属性作不同处理：

1. v 开头
   - v-text 处理 textContent
   - v-html 处理 innerHTML
   - v-model 监听 input
2. @ 开头 绑定 click 事件



## 四、Watcher 更新函数



## 五、Dep 依赖管理

