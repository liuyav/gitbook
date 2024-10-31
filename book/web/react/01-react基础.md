# 一、react、react-dom作用

## 1、react 负责描述特性，提供React API

类组件、函数组件、hooks、contexts、refs...这些都是React特性，而 react 模块只描述特性长什么样、该怎么用，并不负责特性的具体实现。



## 2、react-dom 作用

react-dom称为渲染器，负责在不同的宿主载体上实现特性，达到与描述相对应的真实效果。比如渲染出DOM树、响应点击事件等。



# 二、JSX 语法

## 1、基本使用，变量用 {} 包裹

```react
<div>hello, { name }</div>
```



## 2、有返回值的函数直接调用，用 {} 包裹

```react
<div>{ add(1, 3) }</div>
```



## 3、html标签，用 {} 包裹

```react
{ <div>hello</div> }
```



## 4、条件语句，用 {} 包裹

```react
{ Bolean(true) && <div>hello</div> }
```



## 5、数组循环输出，用 {} 包裹

```react
{ arr.map(item => (<li key={ item }>{ item }</li>)) }
```



## 6、作为属性值，用 {} 包裹

```react
<div title={ name }></div>
```



# 三、两种组件

## 1、class组件

### （1）拥有状态

### （2）拥有生命周期函数



## 2、function 组件

### （1）组件状态使用 useState

- 依赖项为空，表示只执行一次
- 有依赖，表示依赖变化执行里面的



# 四、setState 的用法

## 1、合成事件、生命周期中是异步的（批量更新、优化性能的目的）

```jsx
componentDidMount() {
    this.setState({
        counter: this.state.counter + 1
    })
}

{
    groupName: "",
    groupMember: "",
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



## 2、在 setTimeout / 原生事件 / setState第二个回调参数中 访问是同步的：

- setTimeout

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

- 在原生事件中是同步的，

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

- setState 第二个参数为回调函数的时候是同步的：

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



##  3、state 更新会被合并：

### （1）一个操作，对一个 state 进行多次更新，会被合并更新，同一个属性按照后面的

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

### （2）在这种情况下，想要实现链式更新，setState 第一个参数写成函数

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



# 五、React 生命周期

## 1、v 16.3 之前的生命周期执行顺序

### （1）组件初始化流程

- static defaultProps 默认属性
- static propTypes
  - propTypes.string.isRequired
- constructor()
- componentWillMount()
- render()
- componentDidMount()

### （2）组件更新流程

- willReceiveProps(nextProps) 接受父组件 props，初次渲染不执行，可以用这个做性能优化
- componentShouldUpdate()
  - 更新 componentWillUpdate、render、componentDidUpdate()



## 2、一些生命周期被废除

### （1）废除 componentWillMount、componentWillReceiveProps、componentWillUpdate

### （2）componentWillReceiveProps(nextProps) 

- 初次渲染时候不会执行只有在已挂载的组件接受新的 props 的时候，才会执行

### （3）如需使用添加 UNSAFE_ 前缀

- UNSAFE_componentWillMount
- UNSAFE_componentWillReceiveProps
- UNSAFE_componentWillUpdate

- 也可以使用命令批量添加

```powershell
npx react-codemod rename-unsafe-lifecycles <path>
```



## 3、v16.4 及之后引入两个新生命周期

### （1）static getDerivedStateFromProps(props, state)

- 这个生命周期可以更新 state

### （2）getSnapshotBeforeUpdate(prevProps, prevState) 在更新之前的缩影

- 这个生命周期可以将返回值传递给 componentDidUpdate(prevProps, prevState, snapShot)



## 4、v16.4 生命周期执行顺序

### （1）组件初始化：

- static defaultProps
- static propTypes
- constructor()
- static getDerivedStateFromProps(props, state)
- render()
- componentDidMount()

### （2）组件更新：

- static getDerivedStateFromProps(props, state)
- shouldCompoentUpdate(nextProps,nextState)返回布尔确认是否更新
- render()
- getSnapshotBeforeUpdate(prevProps,prevState)第一次没值
- componentDidMount(nextProps,nextState, snap)



# 六、Redux

## 1、安装依赖

```powershell
npm i redux -S
```



## 2、使用场景：

### （1）大量、随时间变化的数据

### （2）state 需要有一个单一可靠的数据来源

### （3）state 放在最顶层组件中已经无法满足需要了

### （4）某个组件的状态需要共享



## 3、redux 更新流程：

### （1）视图需要更新，调用 redux 的 dispatch 方法并指定派发动作通知 Reducer 

### （2）Reducer 拿到当前 state 与 dispath 方法派发的动作，返回一个 newState

### （3）store 中数据发生变化，通过subscribe()方法变更订阅通知页面更新



## 4、具体实现

### （1）定义 store 存储数据（ redux 中导出 createStore 方法）

### （2）定义 reducer （定义state初始化修改规则）

```react
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

### （3）store.getState() 获取状态

### （4）store.dispatch() 传递action 更新状态、

### （5）store.subscribe() 组件渲染完毕后调用，并在回调中调用 forceUpdate 方法强制刷新

```react
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



# 七、React-redux

## 1、依赖安装

```powershell
npm i react-redux -S
```



## 2、更为便捷的 react 版本的状态管理。

### （1）Provide 为后代组件提供store（好处：后代页面不需要在引入store）

### （2）connect 为组件通过数据和变更方法

- 高阶组件，第一个参数用于映射 state、dispatch to  props
- 第二个参数接收当前组件



## 3、使用reducer

### （1）定义reducer

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

### （2）页面应用

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



# 八、React-router

## 1、安装

```powershell
npm i react-router-dom -S
```



## 2、Raect-router 介绍

### （1）reatc-router 提供最基本的路由功能

### （2）react-router-dom 依赖 reatc-router 所以安装的时候也会自动安装



## 3、Route 匹配 location 与 component 的映射关系

### （1）三种渲染方式互斥

- 优先级 children > component > render

### （2）children 渲染与 location 无关，其他两种都与location有关

### （3）switch 独占路由，只会渲染一个

- 配合写在最后的Route组件并且没有path，实现404页面

```jsx
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

class RouterPage extends Component {
  render() {
    return (
    	<div>
        	<Router>
                // link 路由跳转
                // Route 匹配location与component的映射关系
            	<Link to="/">首页</Link>
                <Link to="/user">用户中心</Link>
                
                <Switch>
                	// 三种渲染方式互斥，优先级 children > component > render
                    // children 渲染与 location 无关，其他两种都与 location 有关
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



