# React Native Android Backer

[英文文档](./README.md)

## 这是什么？

`React Native Android Backer` 是一个处理 Android 回退按钮的解决方案，它结合了 `react-navigation` 的 API 从而提供了强大的功能，特性如下：

* 连续点击回退按钮退出 App
* 设置是否禁用回退按钮
* 页面跳转
* 关闭 modal 弹出框

## 安装

```sh
npm install react-native-android-backer
// 或
yarn add react-native-android-backer
```

## 依赖的第三方库

请确认 App 项目中已安装了以下库：

* react: 要求版本大于 16.x
* react-native: 建议版本大于 0.57.x
* react-navigation: 建议版本大于 3.x

## 使用说明

1. 首先使用 `withBacker` 方法，将 `react-navigation` 的 `AppNavigator` 组件进行封装：

```js
import { withBacker } from 'react-native-android-backer';
import AppNavigator from './navigation/AppNavigator';

const AppNavigatorWithBacker = withBacker(AppNavigator, {
  exitToast: () => console.log('Click again will exit App'),
  isExitScreen: routeName => false,
});
```

`withBacker(component, options)`: 这个方法一个 [高阶组件](https://reactjs.org/docs/higher-order-components.html)，它提供 2 个传入参数：

* component: 要封装的组件，类型为 React 组件
* options: 配置回退按钮的参数对象，有如下参数：
  * exitToast: 退出 App 时的提示方法
  * isExitScreen: 判断该页面是否需要退出 App，一般是 App 首页或者一级页面需要退出

`AppNavigatior` 就是用 [`expo`](https://expo.io/) 初始化项目后自动生成的文件，源文件可以参考 [这里](./example/src/navigation/AppNavigator.js)。

2. 然后将原先使用 `AppNavigator` 的地方替换为 `AppNavigatorWithBacker`。

```diff
- <AppNavigator />
+ <AppNavigatorWithBacker />
```

## API 介绍

`React Native Android Backer` 通过 `react-navigation` 的 [跳转参数](https://reactnavigation.org/docs/en/params.html) 进行回退行为判断，有以下参数可以使用：

* disableBack：类型为布尔值，是否禁止回退按钮，即按了回退按钮没有任何反应
* backPage && backPageParams： backPage 类型为字符串，backPageParams 类型为对象，传入这 2 个参数时表示点击回退按钮会跳转到某个页面并带上跳转参数
* isModalShow && closeModal：isModalShow 类型为方法， closeModal 类型为方法，传入这 2 个参数时表示点击回退按钮会关闭 modal 弹出框

使用示例：

```js
import React, { Component } from 'react';

class Foo extends Component {
  constructor(props) {
    ...
    // 在组件构造器中定义 react-navigation 的 param 参数
    props.navigation.setParams({
      disableBack: true,
      backPage: 'Bar', // 按了回退键后跳转的页面
      backPageParams: { foo: 'foo' }, // 跳转页面时所需的参数
      isModalShow: () => this.state.isVisible, // 提供一个方法来返回 modal 是否打开的 state
      closeModal: () => this.setState({ isVisible: false }), // 提供一份方法来关闭 modal
    });
  }
  ...
}
```

## 额外的 API

另外 `React Native Android Backer` 提供了不需要使用 `react-navigation` 的 `navigation` 对象就可以调用的 API：

* navigate: 页面跳转
* goBack: 页面回退
* getCurrentRoute: 获取当前页面对象

使用示例：

```js
import React, { Component } from 'react';
import { navigationServer } from 'react-native-android-backer';

class Foo extends Component {
  ...
  handleGoto = () => {
    navigationServer.navigate('Bar');
  }

  handleGoBack = () => {
    navigationServer.goBack();
  }

  getCurrentPage = () => {
    const currentPage = navigationServer.getCurrentRoute();
    // currentPage: {
    //   "key": "id-1552444588477-2",
    //   "params": {
    //     "disableBack": true,
    //   },
    //   "routeName": "Settings",
    // }
  }
  ...
}
```

## 示例

[示例 App](./example)

## 许可证

[Apache-2.0](./LICENSE)
