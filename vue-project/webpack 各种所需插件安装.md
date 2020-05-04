 ## 什么是webpack
 + 本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。
 + webpack 所有构建工具都是基于node.js平台运行的~模块化默认采用common.js。
 + 在开始前你需要先理解四个核心概念：

  + 1、入口 (entry)
  ```
      可以通过在 webpack 配置中配置 entry 属性，来指定一个入口起点（或多个入口起点）。默认值为 ./src。
      接下来我们看一个 entry 配置的最简单例子：
      const { resolve } = require('path');    //node的内置方法path（处理文件路径）
      module.exports = {
        //输出文件名
        filename: "built.js",
        //resolve 用来拼接绝对路径的方法
        //_dirname node.js的文件，代表当前文件的目录绝对路径
        path: resolve(__dirname, 'build')
      };
  ```
  + 2、输出 (output)
  ```
   output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist。基本上，整个应用程序结构，都会被编译到你指定的输出路径的文件夹中。你可以通过在配置中指定一个 output 字段，来配置这些处理过程：
    const { resolve } = require('path');    //node的内置方法path（处理文件路径）

    module.exports = {
      entry: './path/to/my/entry/file.js',
      output: {
        path: resolve(__dirname, 'dist'),
        filename: 'my-first-webpack.bundle.js'
      }
    };
  ```

  + 3、loader
  ```
  loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块
  配置中，对一个单独的 module 对象定义了 rules 属性，里面包含两个必须属性：test 和 use。这告诉 webpack 编译器
  不同资源配置不同loader配置
  module.exports = {
    module: {
        rules: [
          { test: /\.txt$/, use: 'raw-loader' }
        ]
      }
  }
  ```

  + 4、插件 (plugins)
  ```
  loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量
  想要使用一个插件，你只需要 require() 它plugins数组中
  这时需要通过使用 new 操作符来创建它的一个实例。
  const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
    module.exports = {
      plugins: [
        new HtmlWebpackPlugin({template: './src/index.html'})
      ]
  };
  ```

 ## 使用webpack
* 1、首先初始化包 npm init(依赖node)
* 2、使用webpack  全局安装 npm i webpack webpack-cli
* 3、本地安装  npm i webpack webpack-cli  -D
* 4、使用webpack的 loader (执行方式，从下往上执行，从右往左)
* 5、当前目录创建一个webpack.config.js（配置webpack的默认文件）
* 6、webpack.config.js作用：指示webpack干哪些活当你运行webpack指令时，会加载里面的配置
## 使用css样式文件需要loader
*  1、css-loader将css文件以字符串的形式变成打包的js的文件
```
   npm i style-loader  css-loader -D

    {
        //test 正则表达式 匹配哪些文件
         test: /\.css$/,
        //使用哪些loder进行处理
        use: [
          //use执行方式从下往上
          //创建style标，将js中的样式资源插入进行处理，添加到head中生效
          'style-loader',
          //将css文件变成common.js模块进行处理加载到js中，里面内容是字符串
          'css-loader'
        ]
    }
```
*  2、style-loader 创建一个style标签将js样式资源插入进去，，添加到head中生效
*  3、sass-loader node-sass
```
安装scss   npm i sass-loader node-sass -D
{
				//test 正则表达式 匹配哪些文件
				test: /\.scss$/,
				//使用哪些loder进行处理
				//多个loader用use处理,单个loader可以直接写loader:"插件名"
				use: [
					//use执行方式从下往上
					//创建style标，将js中的样式资源插入进行处理，添加到head中生效
					'style-loader',
					//将css文件变成common.js模块进行处理加载到js中，里面内容是字符串
					'css-loader',
					//将less解析成css文件
					// 用'less',必须下载less和less-loader两个包

					'sass-loader'
				]
			},
```
## 处理css兼容问题loader
* 所需loader: postcss-loader postcss-preset-env

## 打包图片资源依赖loader
* url-loader file-loader 下载
```
npm i url-loader file-loader -D
```
* html-loader 处理html中img图片的loader(然后被url-loader处理)
```
    {
      test:/\.html$/,
      //处理html里面img标签图片，负责引入图片别url-loader处理
      loader:'html-loader'
    }
```
* url-loader 处理css中图片的loader
```

           //使用url-loader 下载两个包 url-loader file-loader 默认处理不了html里面的img
           test:/\.(jpg|png|gif)$/,
           loader:'url-loader',
           //图片大小小于8kb 会被处理成base64
           //优点：减少请求数量（减轻服务器压力）
           //缺点：图片体积变大（请求变慢）
           options:{
               limit:8*1024,
               //问题:url-loader默认是用es6模块去解析，而html-loader引入图片是common.js
               //解析出问题：[object Module]
                //解决：关闭url-loader的es6的模块化，使用common.js解析
               esModule:false,
               //[hash:10]取文件的前十位
               //[ext]取原来的扩展名
               name:'[hash:10].[ext]'
           }
       },
```
* file-loader 解析图片
* html-loader解析是common.js 而 url-loader是es处理，所以关闭es模块，使用common.js
```
  {
      //使用url-loader 下载两个包 url-loader file-loader 默认处理不了html里面的img
      test:/\.(jpg|png|gif)$/,
        loader:'url-loader',
      //图片大小小于8kb 会被处理成base64
      //优点：减少请求数量（减轻服务器压力）
      //缺点：图片体积变大（请求变慢）
      options:{
        limit:8*1024,
        //问题:url-loader默认是用es6模块去解析，而html-loader引入图片是common.js
          //解析出问题：[object Module]
        //解决：关闭url-loader的es6的模块化，使用common.js解析
          esModule:false,
        //[hash:10]取文件的前十位
        //[ext]取原来的扩展名
        name:'[hash:10].[ext]'
      }
    }
```
## 打包其他资源loader
> file-loader
```
{
    //打包其他资源 排除 css|js|html
    exclude:/\.(css|js|html)$/,
    loader:"file-loader",
    options:{
      name:'[hash:10].[ext]'
    }
  }
```
## js中loader使用
* 1、语法检查 eslint-loader eslint 需要安装
**  在package.json 中 eslintConfig设置 airbnb -->依赖 eslint-config-airbnb-base eslint-plugin-import eslint
* 2、js兼容性处理：babel-loader @babel/core  @babel/preset-env  coreJS(core.js)（主要安装依赖）
** @babel/preset-env 问题:只能解决基本语法 ，如promise 语法不能转换
** 全部js兼容处理 -->@babel/polyfill
** 问题：我只要解决部分兼容性问题，这个插件将所有兼容引入（体积太大）
** 需要做兼容性处理（按需加载）--> coreJS(core.js)
```
 {

   test: /\.js$/,
   // 排除第三方库
   exclude: /node_modules/,
   loader: 'babel-loader',
   options: {
     // 预设：presets 指示babel做怎么样的兼容处理
     presets: [
       [
         '@babel/preset-env',
         {
           // 按需加载
           useBuiltIns: 'usage',
           // 指定core.js版本
           corejs: {
             version: 3,
           },
           // 指定按需加载的浏览器版本
           targets: {
             chrome: '60',
             firefox: '60',
             ie: '9',
             safari: '10',
             edge: '17',
           },
         },
       ],
     ],
   },
 },
```


## 使用webpack的 plugins (1、下载 2、引用 3、使用)
* 1、使用 html-webpack-plugin  在plugins中 new调用
* 功能：默认会创建一个空的html， 自动引入打包输出的资源（js/css）
```
 new HtmlWebpackPlugin({
    template: 'index.html',
    // 压缩html代码
    minify: {
    // 移除html中空格
    collapseWhitespace: true,
    // 移除html中注释
    removeComments: true,
    },
}),
```

## 使用min-css-extract-plugin在plugins中 new调用
* 提取js中的css成单独文件
```
 new MinCssExtractPlugin({
    filename: 'css/built.css'
}),
```

* MinCssExtractPlugin.loader 取代style-loader

## 压缩css
* 使用optimize-css-assets-webpack-plugin  new 调用
* new OptimizeCssAssetsWebpackPlugin(),


## 开发服务器 devServer(自动化，打开和刷新浏览器)
* 安装 npm i webpack-dev-server -D
```
	//开发服务器（自动化，自动编译，自动打开浏览器，自动刷新浏览器）安装webpack-dev-server
	//特点:只会在内存中编译打包，不会有任何输出（本地不打包）；
	//启动devSever指令为：npx webpack-dev-server
```

```
	devServer:{
		//项目构建后的路径
		contentBase:resolve(__dirname,'build'),
	    //启动gzip压缩
		compress:true,
		//配置端口号
		port:3000,
		// 自动打开浏览器
		open:true
	}
```
```
	远程用户名：administrator
	密码:kqgeo2018
```
