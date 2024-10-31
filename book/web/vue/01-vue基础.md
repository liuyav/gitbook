## 一、模板语法

### 1、插值

使用“Mustache”语法 (双大括号) 的文本插值 



## 二、指令

### 1、常用指令

- v-text 文本插值，在数据未渲染时候不会展示出来（可以用作界面优化）
- v-once 只渲染一次的文本插值
- v-bind 绑定属性
- v-html 渲染 html
- v-for 循环（key指定唯一性，用于dom diff；比 v-if 优先级高，同时使用时候请嵌套使用）
- v-model 双向数据绑定（用在输入控件上，语法糖，相当于绑定了 value 值和实现了 @input 事件）
- v-if / v-show
- v-else / v-else-if
- ...

### 2、指令缩写

- v-on 缩写 @
- v-bind 缩写 :

### 3、指令修饰符

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



## 三、样式绑定

### 1、class / style 绑定

#### 1）对象写法 

对象 key 为要绑定的类名 / 属性名，对象 value 表达式确定是否绑定 ，例子如下：

- v-bind:class="{active: var === val}"
- v-bind:style="{backgroundColor: var === val ? 'red' : ''}"

#### 2）数组写法

- 直接应用一个 class 列表 v-bind:class="[activeClass, errorClass]"
- 根据条件切换列表中的 class
  - 三元表达式 v-bind:class="[isActive ? activeClass : '', errorClass]"
  - 数组中使用对象写法  v-bind:class="[{ active: isActive }, errorClass]"





## 四、计算属性和侦听器

### 1、计算属性

#### 1）特点

计算属性可以缓存，当数据未变化时候，不会执行

#### 2）setter 属性

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



## 五、侦听器

### 1、用法

- 函数写法
- 带选项写法，选项如下：
  - immediate
  - deep
  - handler

### 2、应用场景

- 侦听路由变化 $route





## 六、生命周期

### 1、beforeCreate()

### 2、created()

组件实例已创建，dom 未挂载

### 3、beforeMount()

### 4、mounted()

### 5、beforeUpdate()

### 6、updated()

### 7、beforeDestroy()

### 8、destroy()



## 七、组件化

### 1、组件 props 选项

#### 1）type

#### 2）default

#### 3）required

### 2、组件分类

#### 1）有状态组件

#### 2）funtional 组件（无状态组件）

#### 3）abstract 组件，无界面，某一功能

### 3、组件定义尽量无状态化，这样组件可以更加内聚

### 4、组件优化：is、keep-alive、异步组件

### 5、插槽

#### 1）匿名插槽

#### 2）具名插槽

#### 3）作用域插槽



## 八、必会 API 盘点

### 1、Vue.set() / delete() vm.$set() / delete()

### 2、vm.$on() / vm.$emit()

### 3、事件总线 Vue.prototype.$bus = new Vue()

### 4、组件或元素引用（ref 和 vm.$refs）



## 九、动画 transition

### 1、指定 name

#### 1）动画样式格式 [name]-[enter/leave]-[status]

#### 2）动画顺序

1. [name]-enter
2. [name]-enter-active
3. [name]-enter-to（可以不定义）
4. [name]-leave（可以不定义）
5. [name]-leave-active
6. [name]-leave-to

### 2、css 动画库（通过自定义过渡类名结合 css 动画库实现）

- 动画样式格式 [enter/leave]-[status]-class = "className"
- 只需要指定 active 时候的样式

### 3、js 动画钩子（指定 name，定义过渡动画）

#### 1）钩子列表

- @before-enter
- @enter
- @after-enter
- @enter-cancel
- @before-leave
- @leave
- @after-leave
- @leave-cancel

### 4、纯 js 方案（过渡动画交给第三方库去做）

### 5、列表过渡 transition-group



## 十、可复用性

### 1、过滤器

### 2、自定义指令

### 3、渲染函数

### 4、函数式组件

### 5、混入

### 6、插件