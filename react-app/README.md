# react项目
## 一、安装
  ```
   create-react-app my-app  
  ```
## 二、启动
```
 npm run start
```  
## 三 、组件创建
```
export default  class (组件名字大写字母开头)  extends React.Component{
    
        constructor(props){
            super(props)
            this.state={
                num:1
            }
        }

        render(){
            return(
                <div onClick={this.handlClick}>{this.state.num}
                    <NavLink  to='/home/news' activeClassName='activeClass'> news</NavLink>
                     <NavLink  to='/home/msg' activeClassName='activeClass'> msg </NavLink>
                     <Switch>
                        <Route path='/home/news' component={News}></Route>
                        <Route path ='/home/msg' component={Message}></Route>
                        <Redirect to='/home/news'></Redirect>
                    </Switch>
                </div>
            )
        }

        //定义绑定事件
        handlClick=()=>{

        }
  }
```
## 四、用到的技术
```
 //用于组件通信
 redux    npm i redux react-redux redux-thunk(异步应用) --save-dev   

 pubsub-js  npm i pubsub-js --save-dev 

 //组件库
 antd-mobile  npm  i antd-mobile --save-dev

 //监测父组件传过来的属性和方法
 prop-types npm i prop-types --save-dev
```

## 五、路由
```
react-router-dom    cnpm i react-router-dom -D
```
### 1. 根组件路由应用 
```
 import {BrowserRouter} from 'react-router-dom'

 ReactDOM.render((
    <BrowserRouter>
        <MyIndex/>
    </BrowserRouter>      
    ),document.getElementById('root')
);
```
### 2.子组件路由应用

```
 import {NavLink,Switch,Route,Redirect} from 'react-router-dom'
 1. NavLink  路由链接相当于a链接
 两个参数 to 路由地址  activeClassName路由选中状态

 2.Route指定路由组件
 两个参数path路由地址和NavLink的to对应
 component= {引入的组件名}

 3.Switch 引入的多个组件只显示一个必须用Switch包裹
 <Switch>
    <Route path='/home/news' component={News}></Route>
    <Route path ='/home/msg' component={Message}></Route>
    <Redirect to='/home/news'></Redirect>
</Switch>

4.Redirect 指定默认组件显示 一个参数to='
```

