### 初识 React

创建 CRA 项目

```powershell
// 全局安装 CRA 脚手架
yarn add create-react-app global
npx create-react-app my-app template --typescript
```

react 作用：

1. 负责逻辑控制、数据
2. 生成 virtual-dom

react-dom 作用：

1. 将 virtual-dom 转换成真实 dom



### JSX 语法

```jsx
import React, { Component } from 'react';

const name = 'react';
const add = (a, b) => a + b;
const jsxObj = <div>jsxObj</div>;
const flag = true;
const arr = [1, 2, 3];
class Jsx extends Component {
    render() {
        return <div>
            {/* 1. 基本使用，变量用 {} 包裹 */}
            <div>hello, {name}</div>
            {/* 2. 函数，直接调用，有返回值 */}
            <div>{add(1, 3)}</div>
            {/* 3. jsx 对象 */}
            {jsxObj}
            {/* 4. 条件语句 */}
            {flag && jsxObj}
            {/* 5. 数组 */}
            <ul>
                {
                    arr.map(item => (
                        /**
                         * diff 的时候
                         *    1. 首先比较 type
                         *    2. 然后是 key，所有同级同类型的元素，key值必须得唯一
                         * 
                        <li key={item}>{item}</li>
                    ))
                }
            </ul>
            {/* 6. 属性 */}
            <div title={jsxObj} id={"app"}>attr</div>
        </div>;
    }
}

export default Jsx; 
```



### 两种组件

class组件

- 拥有状态
- 拥有生命周期函数



function 组件

- 组件状态使用 useState
  - 依赖项为空，表示只执行一次
  - 有依赖，表示依赖变化执行里面的



### setState 的用法

合成事件、生命周期中是异步的（批量更新、优化性能的目的）

```jsx
componentDidMount() {
    this.setState({
        counter: this.state.counter + 1
    })
}


setCounter = () => {
    this.setState({
        counter: this.state.counter + 1
    })
};

render() {
    return {
        <div>
            <button onClick={this.setCounter}>
                {this.state.counter}
            </button>
        </div>
    }
}
```

在 setTimeout 中是同步的：

```jsx
setCounter = () => {
    setTimeout(() => {
        this.setState({
            counter: this.state.counter + 1
        })
    }, 0)
};

render() {
    return {
        <div>
            <button onClick={this.setCounter}>
                {this.state.counter}
            </button>
        </div>
    }
}
```

在原生事件中是同步的：

```jsx
componentDidMount() {
    document.querySelector('#app').addEventListener('click', () => {
        this.setCounter();
    })
}

setCounter = () => {
    this.setState({
        counter: this.state.counter + 1
    })
};

render() {
    return {
        <div>
            <button id="test">
                {this.state.counter}
            </button>
        </div>
    }
}
```

setState 第二个参数为回调函数的时候是同步的：

```jsx
setCounter = () => {
    this.setState({
    	counter: this.state.counter + 1
    }, () => {
    	console.log(this.state.counter)
    })
};

render() {
    return {
        <div>
            <button onClick={this.setCounter}>
                {this.state.counter}
            </button>
        </div>
    }
}
```

 state 更新会被合并：

一个操作，对一个 state 进行多次更新，会被合并更新，同一个属性按照后面的

```jsx
setCounter = () => {
    this.setState({
    	counter: this.state.counter + 1
    })
    this.setState({
    	counter: this.state.counter + 2
    })
};

render() {
    return {
        <div>
            <button onClick={this.setCounter}>
                {this.state.counter}
            </button>
        </div>
    }
}
```

在这种情况下，想要实现链式更新，setState 第一个参数写成函数

```jsx
setCounter = () => {
    this.setState(state => {
    	return {
    		counter: state.counter + 1
    	}
    })
    this.setState(state => {
    	return {
    		counter: state.counter + 2
    	}
    })
};

render() {
    return {
        <div>
            <button onClick={this.setCounter}>
                {this.state.counter}
            </button>
        </div>
    }
}
```



### React 生命周期

v 16.3 之前的生命周期执行顺序

组件初始化：

- static defaultProps
- static propTypes
- constructor()
- componentWillMount()
- render()
- componentDidMount()

组件更新：

- willReceiveProps(nextProps) 接受父组件 props，初次渲染不执行
- componentShouldUpdate()
  - 更新 componentWillUpdate、render、componentDidMount()



一些生命周期被废除

- 废除 componentWillMount、componentWillReceiveProps、componentWillUpdate
- 如需使用添加 UNSAFE_ 前缀
- 使用命令批量添加



生命周期

- componentWillReceiveProps(nextProps) 初次渲染时候不会执行，只有在已挂载的组件接受新的 props 的时候，才会执行

v16.4 之前要废除的生命周期用 getDerivedStateFromProps 代替，使用的话加上 UNSAFE_

- UNSAFE_componentWillMount
- UNSAFE_componentWillReceiveProps
- UNSAFE_componentWillUpdate

如果不想要手动加前缀，采用命令方式

```powershell
npx react-codemod rename-unsafe-lifecycles <path>
```



v16.4 及之后引入两个新生命周期

- static getDerivedStateFromProps(props, state)
  - 这个生命周期可以更新 state
- getSnapshotBeforeUpdate(prevProps, prevState)
  - 这个生命周期可以将返回值传递给 componentDidUpdate(prevProps, prevState, snapShot)



v16.4 生命周期执行顺序

组件初始化：

- static defaultProps
- static propTypes
- constructor()
- static getDerivedStateFromProps(props, state)
- render()
- componentDidMount()

组件更新：

- static getDerivedStateFromProps(props, state)
- shouldCompoentUpdate(nextProps,nextState)返回布尔确认是否更新
- render()
- getSnapshotBeforeUpdate(prevProps,prevState)第一次没值
- componentDidMount()



### Redux

使用场景：

- 大量、随时间变化的数据
- state 需要有一个单一可靠的数据来源
- state 放在最顶层组件中已经无法满足需要了
- 某个组件的状态需要共享



redux 更新流程：

- 视图需要更新，调用 redux 的 dispatch 方法并指定派发动作通知 Reducer 
- Reducer 拿到当前 state 与 dispath 方法派发的动作，返回一个 newState
- store 中数据发生变化，通过subscribe()方法变更订阅通知页面更新



安装依赖

```powershell
npm i redux -S
```



定义 store 存储数据（ redux 中导出 createStore 方法）

定义 reducer （定义state初始化修改规则）

```ts
import { createStore } from 'redux';

function counterReducer(state = 0, action) {
  console.log('state',);
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUNS":
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(counterReducer);

export default store;
```



store.getState() 获取状态

store.dispatch() 传递action 更新状态、

store.subscribe() 组件渲染完毕后调用，并在回调中调用 forceUpdate 方法强制刷新

```tsx
import React, { Component } from 'react';
import store from '../store/index';

// 视图需要更新，调用 redux 的 dispatch 方法并指定派发动作通知Reducer ，Reducer 拿到当前 state 与 dispath 方法派发的动作，返回一个 newState，store中数据发生变化，通过subscribe()方法变更订阅通知页面更新
class ReduxPage extends Component {
  componentDidMount() {
    store.subscribe(() => {
      this.forceUpdate();
    })
  }
  render() {
    return <div>
      <div>{store.getState()}</div>
      <button onClick={() => store.dispatch({ type: 'ADD' })}>ADD</button>
    </div>;
  }
}

export default ReduxPage;
```



### React-redux

更为便捷的 react 版本的状态管理。

- Provide 为后代组件提供store（好处：后代页面不需要在引入store）
- connect 为组件通过数据和变更方法
  - 高阶组件，第一个参数用于映射 state、dispatch to  props
  - 第二个参数接收当前组件



依赖安装

```powershell
npm i react-redux -S
```



定义 reducer

```tsx
// store/index.ts
import { createStore } from 'redux';

function counterReducer(state = 0, action) {
  console.log('state',);
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUNS":
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(counterReducer);

export default store;
```

页面应用

```tsx
import React, { Component } from 'react';
import { connect } from 'react-redux';

export default connect(
  // mapStateToProps 把 state 映射到 props
  state => ({ num: state }),
  // mapDispathToProps 把 dispath 映射到 props
  {
    add: () => ({type: "ADD"})
  }
)(class ReactReduxPage extends Component {
  render() {
    // const { num, dispatch } = this.props;
    const { num, add } = this.props;
    return <div>
      <div>{num}</div>
      <button onClick={() => add({ type: 'ADD' })}>ADD</button>
    </div>;
  }
})
```



### React-router

react-router 包含三个库，react-router、react-router-dom、react-router-native



reatc-router 提供最基本的路由功能，react-router-dom、react-router-native 都依赖 reatc-router 所以安装的时候也会自动安装

```powershell
npm i react-router-dom -S
```

基本使用

```tsx
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

class RouterPage extends Component {
  render() {
    return (
    	<div>
        	<Router>
            	<Link to="/">首页</Link>
                <Link to="/user">用户中心</Link>
                
                <Switch>
                	// 三种渲染方式互斥，优先级 children > component > render
                    // child 渲染与 location 无关，其他两种都与 location 有关
                    <Route
                        exact
                        path="/"
                        component={HomePage}
                        children={() => <div>children</div>}
                        render={() => <div>render</div>}
                    />
                    <Route path="/user" component={UserPage} />
                    // 写在最后，并且搭配 switch 使用
                    <Route component={EmptyPage} />
                </Switch>
            </Router>
        </div>
    );
  }
}

class HomePage extends Component {
  render() {
    return <div>首页</div>
  }
}

class UserPage extends Component {
  render() {
    return <div>用户中心</div>
  }
}

class EmptyPage extends Component {
  render() {
    return <div>404</div>
  }
}
```



