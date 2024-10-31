### 项目初始化

#### 使用 create-react-app 搭建项目

```js
// 全局安装 cra
yarn add create-react-app global
// 创建 cra ts 项目
npx create-react-app web --template typescript
```



#### 路由组件配置管理

- 使用 react-router-config 集中式配置 react 路由，拥有 vue 配置路由的体验
- 使用 react-loadable 对组件进行异步加载处理
- 使用 react-router-dom 管理单页路由的跳转

安装依赖

```js
// 安装 react-router-config
yarn add react-router-config --development
// 安装对应的类型声明
yarn add @types/react-router-config --development

// 安装 react-loadable 
yarn add react-loadable  --development
// 安装对应的类型声明
yarn add @types/react-loadable --development

// 安装 react-router-dom
yarn add react-router-dom --development
// 安装对应的类型声明
yarn add @types/react-router-dom --development
```



在根组件 App.tsx 中注册路由

```tsx
import React from 'react';
import { renderRoutes } from 'react-router-config';
import { HashRouter } from 'react-router-dom';
import routes from './routers/index';

const App = () => (
  <HashRouter>
    <div>{renderRoutes(routes)}</div>
  </HashRouter>
);

export default App;
```

react-router-config 接收一份路由配置，在 src 下新建 routers 文件夹管理路由

```ts
// ./src/routes/index.ts
import Loadable from 'react-loadable';
import { RouteConfig } from 'react-router-config';

// 自定义 loading 组件
import Loading from '../components/Loading';

const routes: RouteConfig[] = [
  {
    path: '/',
    exact: true,
    component: Loadable({
      loader: () => import('../pages/home'),
      loading: Loading,
    }),
  }
];

export default routes;

```



#### 修改 webpack 配置

修改 webpack 配置有两种方案

- npm run eject 不可逆，暴露 create-react-app webpack 配置
- 使用 react-app-rewired 和 customize-cra

安装依赖

```powershell
yarn add customize-cra react-app-rewired --development
```

修改目录下 package.json 文件

```json
{
	"scripts": {
        "start": "react-app-rewired start",
        "build": "react-app-rewired build",
        "test": "react-app-rewird test --env=jsdom",
    }
}
```

在项目根目录下添加 config-overrides.js 文件，在该文件中配置 webpack



