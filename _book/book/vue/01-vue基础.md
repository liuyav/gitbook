# 模板语法

## 插值

使用“Mustache”语法 (双大括号) 的文本插值 



## 指令

### 常用指令

- v-text 文本插值，在数据未渲染时候不会展示出来（可以用作界面优化）
- v-once 只渲染一次的文本插值
- v-bind 绑定属性
- v-html 渲染 html
- v-for 循环（key指定唯一性，用于dom diff；比 v-if 优先级高，同时使用时候请嵌套使用）
- v-model 双向数据绑定（用在输入控件上，语法糖，相当于绑定了 value 值和实现了 @input 事件）
- v-if / v-show
- v-else / v-else-if
- ...

### 指令缩写

- v-on 缩写 @
- v-bind 缩写 :

### 修饰符

- `.stop` - 调用 `event.stopPropagation()`。
- `.prevent` - 调用 `event.preventDefault()`。
- `.capture` - 添加事件侦听器时使用 capture 模式。
- `.sync`  相当于 ` $emit("update:var", params)` 
- `.self` - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
- `.{keyCode | keyAlias}` - 只当事件是从特定键触发时才触发回调。
- `.native` - 监听组件根元素的原生事件。
- `.once` - 只触发一次回调。
- `.left` - (2.2.0) 只当点击鼠标左键时触发。
- `.right` - (2.2.0) 只当点击鼠标右键时触发。
- `.middle` - (2.2.0) 只当点击鼠标中键时触发。
- `.passive` - (2.3.0) 以 `{ passive: true }` 模式添加侦听器





# 样式绑定

## class / style 绑定

### 对象写法 

对象 key 为要绑定的类名 / 属性名，对象 value 表达式确定是否绑定 ，例子如下：

- v-bind:class="{active: var === val}"
- v-bind:style="{backgroundColor: var === val ? 'red' : ''}"

### 数组写法

- 直接应用一个 class 列表 v-bind:class="[activeClass, errorClass]"
- 根据条件切换列表中的 class
  - 三元表达式 v-bind:class="[isActive ? activeClass : '', errorClass]"
  - 数组中使用对象写法  v-bind:class="[{ active: isActive }, errorClass]"





# 计算属性和侦听器

## 计算属性

### 特点

计算属性可以缓存，当数据未变化时候，不会执行

### setter 属性

计算属性默认只有 getter 属性，不过在需要时候也可以设置 setter 属性

```js
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```



## 侦听器

### 用法

- 函数写法
- 带选项写法，选项如下：
  - immediate
  - deep
  - handler

### 应用场景

- 侦听路由变化 $route





# 生命周期

beforeCreate()

created()

- 组件实例已创建，dom 未挂载

beforeMount()

mounted()

beforeUpdate()

updated()

beforeDestroy()

destroy()



# 组件化

组件 props 选项

- type、default、required

组件分类

- 有状态组件
- funtional 组件（无状态组件）
- abstract 组件，无界面，某一功能

组件定义尽量无状态化，这样组件可以更加内聚

组件优化：is、keep-alive、异步组件

插槽

- 匿名插槽
- 具名插槽
- 作用域插槽



# 必会 API 盘点

Vue.set() / delete() vm.$set() / delete()

vm.$on() / vm.$emit()

事件总线 Vue.prototype.$bus = new Vue()

组件或元素引用（ref 和 vm.$refs）



# 动画 transition

指定 name

- 动画样式格式 [name]-[enter/leave]-[status]
- 动画顺序
  1. [name]-enter
  2. [name]-enter-active
  3. [name]-enter-to（可以不定义）
  4. [name]-leave（可以不定义）
  5. [name]-leave-active
  6. [name]-leave-to

css 动画库（通过自定义过渡类名结合 css 动画库实现）

- 动画样式格式 [enter/leave]-[status]-class = "className"
- 只需要指定 active 时候的样式

js 动画钩子（指定 name，定义过渡动画）

- 钩子列表
  - @before-enter
  - @enter
  - @after-enter
  - @enter-cancel
  - @before-leave
  - @leave
  - @after-leave
  - @leave-cancel

纯 js 方案（过渡动画交给第三方库去做）

列表过渡 transition-group

# 可复用性

过滤器

自定义指令

渲染函数

函数式组件

混入

插件
