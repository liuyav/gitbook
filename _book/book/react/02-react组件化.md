### 组件复合技术

- 组件调用时候自定义标签内容
  - jsx --- 组件内 this.props.children 获取 jsx（匿名插槽）
  - 对象 --- 组件内 this.props.children 获取的对象信息（具名插槽）



### 高阶组件 - HOC

接收一个组件，返回一个新组件

装饰器写法：

依赖安装

```powershell
npm i -D @babel/plugin-proposal-decorators
```

配置 config-overrides.js

```js
const {addDecoratorsLegacy} = require('customize-cra');

module.exports = override(
	addDecoratorsLegacy()	// 配置装饰器
)
```

如果 vscode 有警告，vscode 设置如下

```powershell
javascript.implicitProjectConfig.experimentalDecorators: true
```



表单组件的设计与实现：

1. 表单的双向绑定
   - onchange 与 e.target.value
   - antd 的 @Form.create({})
     - getFieldDecorator(attr, {rules; [rules]}, comp)
2. 高阶函数实现 antd 表单功能
   - getFieldDecorator(attr, {rules; [rules]}, comp)
   - getFieldsValue()
   - getFieldValue()
   - validateFields()



弹窗类组件实现（React v16.3）

```
import { createPortal } from 'react-dom'
```

1. 创建 node 节点，挂载在 body 下
2. createPortal (<Dialog>,  node);

3. componentWillUnmount 时候 移除 node



### 纯组件

- 使用 setState 方法，但是 state 没有改变的时候，在 shouldComponentUpdate 中进行判断
- 使用 PureComponent 不用再写 shouldComponentUpdate，已经实现了浅比较。



### 组件跨层级通信 - Context

使用场景

- 多个子孙组件使用顶层祖辈的 state
- 网站主题色



创建 context、provider

```tsx
// ./src/context/themeContext.ts
export const ThemeContext = React.createContext({num : 0});
export const ThemeProvider = ThemeContext.Provider();

// 创建消费者
export const ThemeConsumer = ThemeContext.Consumer();
```

注入数据

```tsx
import { ThemeProvider } from './src/context/themeContext.ts';

class ParentComp extends Component {
  constructor(props) {
      super(props)
      this.state = {
          num: 1
      }
  }
  render() {
    return <Provider value={state}><ChildCom></Provider>
  }
}

```

class子孙组件使用数据 

```tsx
import { ThemeContext } from './src/context/themeContext.ts';

export default class ChildCom extends Component {
  static contextType = ThemeContext;
  render() {
    return <div>{this.context.num}</div>
  }
}

export default ChildCom;
```

函数组件使用数据

```tsx
import { ThemeConsumer } from './src/context/themeContext.ts';

const ChildCom = () => {
    return (
    	<ThemeConsumer>
        	{
                ctx => (
                	<div>{ctx.num}</div>
                )
            }
        </ThemeConsumer>
    )
};

export default ChildCom;
```







