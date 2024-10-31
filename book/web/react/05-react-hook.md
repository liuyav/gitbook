## 一、常用hook

### 1、UseEffect() 

- 和 didmount、didupdate类似
- 第二个参数为依赖项，只有依赖项发生变化才会执行
- return 清除副作用，类似于 willUnMount

### 2、UseMemo()

- 相当于computed，缓存计算值
- 接收两个参数，一个函数，一个依赖项
- 依赖项改变时候才会重新计算，避免在每次渲染时候都进行高额开销计算

### 3、UseCallBack()

- 相当于纯函数，但是纯函数比较的是值，这里是函数
- 接收两个参数，一个函数，一个依赖项
- 依赖项改变时候才会重新计算，避免子组件重新渲染

### 4、UseState()

### 5、UseReducer() 

### 6、UseSyncExternalStore()

### 7、UseSelector()

### 8、UseDispatch()





## 二、自定义hook

- 命名以 use 开头 
- 函数内部可以调用其他hook



## 三、hook使用规则

- 只能在函数最外层调用hook，不能在循环、条件判断或者子函数调用
- 函数组件中调用hook、或者在自定义hook中调用hook
