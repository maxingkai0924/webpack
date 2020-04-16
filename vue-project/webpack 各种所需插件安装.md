 ## 使用webpack
* 1、首先初始化包 npm init(依赖node)
* 2、使用webpack  全局安装 npm i webpack webpack-cli
* 3、本地安装  npm i webpack webpack-cli  -D
* 4、 使用webpack的 loader (执行方式，从下往上执行，从右往左)
## 使用css样式文件需要loader
*  1、css-loader将css文件以字符串的形式变成打包的js的文件
*  2、style-loader 创建一个style标签将js样式资源插入进去，，添加到head中生效
*  3、sass-loader node-sass  安装scss   npm i sass-loader node-sass -D
## 处理css兼容问题loader
* 所需loader: postcss-loader postcss-preset-env
## 打包图片资源依赖loader
* url-loader 处理css中图片的loader
* file-loader 解析图片
* html-loader 处理html中img图片的loader(然后被url-loader处理)
* html-loader解析是common.js 而 url-loader是es处理，所以关闭es模块，使用common.js
```
esModule:false
```
## 打包其他资源loader
> file-loader

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
