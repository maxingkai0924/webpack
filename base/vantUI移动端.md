# 移动端配置
## 1、适配
1. 首先，安装lib-flexible，使用命令行
```
 npm i lib-flexible --save
```
2. 引入lib-flexible，在项目入口文件main.js中引入lib-flexible
```
 import 'lib-flexible'

 //记得把一下一段话配置到index.html中
 <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
```
3.下载 autoprefixer postcss-pxtorem 
```
  作用 px转化为rem
  npm i autoprefixer  postcss-pxtorem -D
  
  在vue.config.js引入
  const autoprefixer = require('autoprefixer');
  const pxtorem = require('postcss-pxtorem');
  
  然后如下配置
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue:37.5,
            propList: ['*']
          })
        ]
      }
    }
  },
```
## 2、解决300s问题
1. 首先安装 fastclick,使用命令行
```
npm install --save fastclick
```
2. 在 src/main.js 中引入插件
   ```
   import fastclick from 'fastclick'
   fastclick.attach(document.body)
   ```

## 3、使用vant

+ 通过 npm 安装
```
npm i vant -S
```

+ vant地址  [https://youzan.github.io/vant/#/zh-CN/quickstart](https://youzan.github.io/vant/#/zh-CN/quickstart)
+ vant的demo模板 githup地址 [https://github.com/youzan/vant-demo](https://github.com/youzan/vant-demo)
![](移动端_files/1.png)

## 4、 使用 vue-cli3.0以上版本，解决跨域
```
  在vue.config.js加上如下代码
  devServer:{
  	  port: '8080',
  	  open: true,
  	  proxy:  {
  			"/api":{
  			    target: 'www.baidu.com',   //请求地址
  			    changeOrigin: true,        //开启跨域
  				secure: false,             // 目标服务器地址是否是安全协议
  			    pathRewrite: {             //指定请求方式  
  			      '^/api': '/' 
  			    }
  			}
  		}
  }
```
