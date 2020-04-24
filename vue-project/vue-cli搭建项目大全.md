# vue-cli搭建大全搭建大全
  1. 初始化项目
  ```
  vue init webpack <文件名>
  cd <文件名>
  npm run dev启动

  ```
  2. 安装使预编译语言scss
  ```
  npm install sass-loader@7.3.1 node-sass --save-dev

  style标签这样配置就可以用了  scoped意思是关闭全局作用域(只能当前css引用)
  <style lang="scss" scoped>
  </style>
  如果改变组件中的css样式  比如elementUI
  在定义的类前面 加 /deep/ .class 就可以改变
  ```
  * scss语法使用
  ```
    1、scss语法定义变量是用 '$' 开头定义比如 !default的是意思是设置默认值，权级最低
     $widths:220px
     $widths:220px !default
     使用直接
     div {
       width:$widths
     }

    2、 scss混合器使用@mixin
    @mixin borderRadios {
       border:1px solid #000;
       border-radius: 5px;
    }
    // 引用@mixin混合定义的变量使用@include方法
    h1{
       @include borderRadios;
    }

    3.给混合器传参mixin，接收参数必须以 '$' 开头比如  $normal, $hover, $visited
    @mixin linkColors($normal,$hover,$visited) {
       color: $normal;
       &:hover { color: $hover; }
       &:visited { color: $visited; }
    }

   //引用
   a {
     @include link-colors(blue, red, green);
   }
  ```
  3. 修改打开配置，用本地IP打开
    > 3.1 打开config/index.js/dev.port的默认的 'localhost' 改为 '0.0.0.0'
    > 3.2 彻底更换 build/webpack.dev.conf.js修改为一下代码

```
  'use strict'
  const utils = require('./utils')
  const webpack = require('webpack')
  const config = require('../config')
  const merge = require('webpack-merge')
  const path = require('path')
  const baseWebpackConfig = require('./webpack.base.conf')
  const CopyWebpackPlugin = require('copy-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
  const portfinder = require('portfinder')

  const HOST = process.env.HOST
  const PORT = process.env.PORT && Number(process.env.PORT)
  const os = require('os');
  ///////////////////获取本机ip///////////////////////
  function getIPAdress() {
      var interfaces = os.networkInterfaces();
      for (var devName in interfaces) {
          var iface = interfaces[devName];
          for (var i = 0; i < iface.length; i++) {
              var alias = iface[i];
              if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                  return alias.address;
              }
          }
      }
  }
  const myHost = getIPAdress();
  const devWebpackConfig = merge(baseWebpackConfig, {
      module: {
          rules: utils.styleLoaders({
              sourceMap: config.dev.cssSourceMap,
              usePostCSS: true
          })
      },
      // cheap-module-eval-source-map is faster for development
      devtool: config.dev.devtool,

      // these devServer options should be customized in /config/index.js
      devServer: {
          clientLogLevel: 'warning',
          historyApiFallback: {
              rewrites: [{
                  from: /.*/,
                  to: path.posix.join(config.dev.assetsPublicPath, 'index.html')
              }, ],
          },
          hot: true,
          contentBase: false, // since we use CopyWebpackPlugin.
          compress: true,
          host: HOST || config.dev.host,
          port: PORT || config.dev.port,
          useLocalIp: true,//避免打开浏览器为0.0.0.0，需手动改IP的情况
          open: config.dev.autoOpenBrowser,
          overlay: config.dev.errorOverlay ? {
              warnings: false,
              errors: true
          } : false,
          publicPath: config.dev.assetsPublicPath,
          proxy: config.dev.proxyTable,
          quiet: true, // necessary for FriendlyErrorsPlugin
          watchOptions: {
              poll: config.dev.poll,
          }
      },
      plugins: [
          new webpack.DefinePlugin({
              'process.env': require('../config/dev.env')
          }),
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
          new webpack.NoEmitOnErrorsPlugin(),
          // https://github.com/ampedandwired/html-webpack-plugin
          new HtmlWebpackPlugin({
              filename: 'index.html',
              template: 'index.html',
              inject: true
          }),
          // copy custom static assets
          new CopyWebpackPlugin([{
              from: path.resolve(__dirname, '../static'),
              to: config.dev.assetsSubDirectory,
              ignore: ['.*']
          }])
      ]
  })

  module.exports = new Promise((resolve, reject) => {
      portfinder.basePort = process.env.PORT || config.dev.port
      portfinder.getPort((err, port) => {
          if (err) {
              reject(err)
          } else {
              // publish the new Port, necessary for e2e tests
              process.env.PORT = port
                  // add port to devServer config
              devWebpackConfig.devServer.port = port

              // Add FriendlyErrorsPlugin//http://${devWebpackConfig.devServer.host}:${port}
              devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                  compilationSuccessInfo: {
                      messages: [`你的项目运行在这里 : http://${myHost}:${port}`],
                  },
                  onErrors: config.dev.notifyOnErrors ? utils.createNotifierCallback() : undefined
              }))

              resolve(devWebpackConfig)
          }
      })
  })

```
4. 修改router路由配置，在router下的index.js配置路由,打开地址取消 *#* 号
```
   // src/router/index.js 如下配置
   export default new Router({
      mode: 'history',
     routes: [
       {
         path: '/',
         name: 'HelloWorld',
         component: HelloWorld,
         meta: {
            index: 3,
            requireAuth: true
         }
       }
     ]
   })

   // 设置路由拦截器
   router.beforeEach((to, from, next) => {
     if (to.meta.requireAuth) {
       next()
     } else {
       Message('需要登录后，在查看')
       next()
     }
   })
```

5. 使用elemnetui
> 安装 npm i element-ui -S
> main.js 使用
 ```
 import ElementUI from 'element-ui'
 import 'element-ui/lib/theme-chalk/index.css'
 Vue.use(ElementUI)
 ```
 > 使用elementui 国际化
 ```
   <!--引入elementUI的top同时引入一下所需语言 -->
   import enLocale from 'element-ui/lib/locale/lang/en'
   import zhLocale from 'element-ui/lib/lale/lang/zh-CN'
   <!--调用  Vue.config.lang设置成显示的语言包-->
   <!--记得安装  cnpm i --save vue-i18n -->
   Vue.use(VueI18n)
   Vue.use(Element)
   Vue.config.lang = 'zh-cn'
   Vue.locale('zh-cn', zhLocale)
   Vue.locale('en', enLocale)
 ```
6. 安装使用axios
```
 npm install axios qs --save

 1.插件axios调取接口
 2.插件qs处理post请求
```
* 1、配置跨域
```
//在config 下面的index.js 找到proxyTable
    proxyTable: {
      "/api":{
          target: 'www.baidu.com',   //请求地址
          changeOrigin: true,        //是否开启跨域
          pathRewrite: {             //请求代理指向
            '^/api': '/'
          }
      }
    }
```
* 2、main.js中引用
```
  import axios from 'axios'
  import qs from 'qs'
  axios.defaults.baseURL = '/api'  // /api是对应的proxyTable里面的/api
```
* 3、接口拦截器处理代码
```
  // 超时时间
  axios.defaults.timeout = 5000
  // Add a request interceptor
  axios.interceptors.request.use(function (config) {
    // 根据需要对数据进行转换处理：比如需要统一加上token值那么可以做如下处理
    if (!config.params) {
      config.params = {}
    }
    // 添加token
    config.params.accessToken = localStorage.getItem('accessToken')
    // 如果是post请求,用qs方法处理
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    return config
  }, function (error) {
    // Do something with request error
    console.log(error)
    return Promise.reject(error)
  })

  // Add a response interceptor
  axios.interceptors.response.use(function (response) {
    // Do something with response data
    console.log(response)
    return response
  }, function (error) {
    // Do something with response error
    // 根据返回状态拦截
    switch (error.response.status) {
      case 200:
        break
      case 400:
        ElementUI.Message.error(`拒绝访问(403)`)
        break
      case 401:
        ElementUI.Message.error(`拒绝访问(403)`)
        break
      case 403:
        ElementUI.Message.error('拒绝访问(403)')
        break
      case 404:
        ElementUI.Message.error('请求出错(404)')
        break
      case 408:
        ElementUI.Message.error('请求超时(408')
        break
      case 500:
        ElementUI.Message.error('服务器错误(500)')
        break
      case 501:
        ElementUI.Message.error('服务未实现(501)')
        break
      case 502:
        ElementUI.Message.error('网络错误(502)')
        break
      case 503:
        ElementUI.Message.error('服务不可用(503)')
        break
      case 504:
        ElementUI.Message.error('网络超时(504)')
        break
      case 505:
        ElementUI.Message.error('HTTP版本不受支持(505)')
        break
      default:
        ElementUI.Message.error(`连接出错`)
    }
    return Promise.reject(error)
  })
```
7. 使用vuex

```
   //安装 npm install vuex --save      // 如果安装了淘宝镜像，可以使用 cnpm安装
   //在src下面创建一个store目录，在目录下面在创建一个index.js里面的代码
    import Vue from 'vue'
    import Vuex from 'vuex'

    Vue.use(Vuex)

    export default new Vuex.Store({
      state: {
        count: 0,
      },
      mutations: {
        // 不要在mutations里面执行异步函数(当前state,参数)
        add (state, step) {
          state.count += step
        },
      },
      // actions里面的方法只能通过mutations里面的函数改变
      // actions里面的函数自带参数context有一个方法commit('方法','参数')
      actions: {
        addAsybc (context, step) {
          setTimeout(() => {
            context.commit('add', step)
          }, 1000)
        }
      },
      // 不会改变state里面的值的状态,只是形成新的状态
      getters: {
        showNum (state) {
          return 10
        }
      },
      modules: {}
    })
```

 > state

  ```
  定 义变量
   state: {
     count: 0,
   }
  ```
 > mutations

  ```
   修改 state中的变量
    mutations: {
      //  mutations只处理同步函数
      // 不要在mutations里面执行异步函数(当前state,参数)
      add (state, step) {    //add自定义处理state中变量的函数带两个参数，第一个参数就就是上面state，第二个参数，传入的参数
        state.count += step
      },
    },
    //vue文件中调取使用mutations中的函数有个commit('函数名',参数)
    this.$store.commit('add', 3)
  ```
 > actions
 ```
   // actions里面的方法只能通过mutations里面的函数改变
   // actions里面的函数自带参数context有一个方法commit('方法','参数')
   // actions可以处理异步函数
   actions: {
     addAsybc (context, step) {
       setTimeout(() => {
         context.commit('add', step)
       }, 1000)
     }
   },
   //vue 文件中调取使用actions中的异步方法有个dispatch('函数名',参数)
   this.$store.dispatch('addAsybc', 2);
 ```
 > getters
 ```
   // 不会改变state里面的值的状态,只是形成新的状态
   getters: {
     showNum (state) {
       return 10
     }
   },
 ```
 > modules
 ```
  多模块引用
 ```
> vuex 中四大模块简易使用
```
 vuex中有 mapState,mapMutations,mapActions,mapGetters四个方法，如果vue文件中使用需要调用如下
 import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

  mapState, mapGetters放在 computed中...mapState(['定义state中的变量名']),...mapGetters(['定义getter中的变量名'])
  mapMutations,mapActions放在 methods中 ...mapMutations(['定义的mutations中方法']),...mapActions(['定义actions的变量名']),
```
