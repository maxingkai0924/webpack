/* 
   webpack.config.js web的配置文件 
   作用：指示webpack干哪些活当你运行webpack指令时，会加载里面的配置
   
   所有构建工具都是基于node.js平台运行的~模块化默认采用common.js。

    loder 1.下载 2使用（loder的配置）
    plugins 1.下载 2.引入 3.使用
 */

//resolve node.js语法 用来拼接绝对路径的方法(当前目录路径)
const { resolve } = require('path');
//html-webpack-plugin 复制一个html文件，自动引入css和js
const HtmlWebpackPlugin = require('html-webpack-plugin');
// mini-css-extract-plugin 取代 style-loader提取js中css成单独文件 （解决闪屏问题，减少js体积大小，增加运行速度）;
const miniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css插件
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// 设置node.js环境变量确定css是兼容开发环境还是正式环境 默认production
process.env.NODE_ENV = 'production'
//PWA:渐进式网络开发应用程序（离线可访问
const workboxWebpackPlugin = require('workbox-webpack-plugin');

//配合dll文件，告诉webpack，那些文件不需要打包
const webpack = require('webpack');

//配置生产环境压缩方案:js/css
const TerserWebpackPlugin = require('terser-webpack-plugin')

//将某个文件打包输入，并在html中自动引入
const addAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

// 复用相同的css-loader  
//注意:use执行方式从下往上,从右往左
const commonCssLoader = [
    //miniCssExtractPlugin取代style-loader  提取js中的css成单独文件
    'miniCssExtractPlugin.loader',
    
    //创建style标，将js中的样式资源插入进行处理，添加到head中生效
    'style-loader',
    //将css文件变成common.js模块进行处理加载到js中，里面内容是字符串
    'css-loader',
  
    /*  
    css兼容性处理:postcss --> 安装postcss-loader postcss-preset-env
    注意：postcss-preset-env帮助postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式
    package.json中的配置
    "browserslist":{
        //兼容浏览器
        "development":[
            "last 1 chrome version",
            "last 1 firefox version",
            "last 1 safari version"
        ],
        默认是生产环境production -->设置node.js环境变量process.env.NODE_ENV = 'developement'
        "production":[
            ">0.2%",     大于0.2%的所有浏览器
            "not dead",  活着的
            "not op_mini all"  不要op_mini所有
        ]
    }
    */
    {
        loader: 'postcss-loader',
		//options 配置loader
        options: {
            ident: 'postcss',
            // plugins 作用使用 postcss-loader的插件 postcss-preset-env
            plugins: () => [
                require('postcss-preset-env')(),
            ],
        },
    },
]
//webpack 配置
module.exports = {
	
	//输入入口起点
	entry: './src/index.[contenthash:10].js',
	//输出
	output: {
		//输出文件名
		filename: "[name].[hash].js",
		//输出路径 
		//_dirname node.js的文件，代表当前文件的目录绝对路径
		path: resolve(__dirname, 'build'),
	    //所有资源公共路径的添加配置前缀 比如 '/'
		publicPath:'/',
		chunkFilename:'[name]_chunk.js',  //非入口chunk
		library:'[name]',   //整个打包的库向外暴露变量名
		libraryTargets:'window'  //global|common.js|window
	},
	//loder的配置
	module: {
		rules: [
			//不同资源配置不同loader配置
			//详细的loader配置
			/*
		 	    语法检查：eslint-loader eslint 需要安装
				注意: 只检查自己的写的源代码，第三方的库不用检查
				设置检查规则：
				在package.json 中 eslintConfig设置
				  "eslintConfig": {
					"extends": "airbnb-base",
					"env":{
						"browser":true  //支持浏览器的全局变量
					}
				  }
				airbnb -->依赖 eslint-config-airbnb-base eslint-plugin-import eslint
			*/
			{
				test: /\.js$/,
				// 排除第三方库
				exclude: /node_modules/,
				loader: 'eslint-loader',
				//enforce: 'pre' 两个配置执行一个js文件，优先执行   延后执行enforce:'post'
				enforce: 'pre',
				options: {
					//fix检查后修正
					fix: true,
				},
			},
			{
				//oneOf以下loader只会匹配一个
				//注意oneOf不能有两个配置执行一个文件,相同的必须提取出来
				oneOf: [
					{
						//test 正则表达式 匹配哪些文件
						test: /\.css$/,
						//使用哪些loder进行处理
						use: [...commonCssLoader]
					},

					//详细的loader配置
					{
						//test 正则表达式 匹配哪些文件
						test: /\.less$/,
						//使用哪些loder进行处理
						//多个loader用use处理,单个loader可以直接写loader:"插件名"
						use: [
                            
                            ...commonCssLoader,
							//将less解析成css文件
							// 用'less',必须下载less和less-loader两个包
							'less-loader'
						]
					},
					{
						//使用url-loader 下载两个包 url-loader file-loader 默认处理不了html里面的img
						test: /\.(jpg|png|gif)$/,
						loader: 'url-loader',

						options: {
							//图片大小小于8kb 会被处理成base64
							//优点：减少请求数量（减轻服务器压力）
							//缺点：图片体积变大（请求变慢）
							limit: 8 * 1024,
							//问题:url-loader默认是用es6模块去解析，而html-loader引入图片是common.js
							//解析出问题：[object Module]
							//解决：关闭url-loader的es6的模块化，使用common.js解析
							esModule: false,
							//[hash:10]取文件的前十位
							//[ext]取原来的扩展名
                            name: '[hash:10].[ext]',
                            //outputPath 指定打包文件名
                            outputPath: 'imgs',
						}
					},
					{
						test: /\.html$/,
						//处理html里面img标签图片，负责引入图片别url-loader处理
						loader: 'html-loader'
					},
					{
						//exclude正则匹配排除 打包其他资源 排除 css|js|html|scss|sass
						exclude: /\.(css|js|html|less|scss|sass)$/,
						loader: "file-loader",
						options: {
							//outputPath 指定打包文件名称
							name: '[hash:10].[ext]',
							outputPath: 'medias',
						}
					},

					/*
						 js兼容性处理：babel-loader @babel/core （主要安装依赖）
						 1、@babel/preset-env（安装）处理简单的语法兼容比如=>箭头函数
						 问题:只能解决基本语法 ，如promise 语法不能转换
						 2、全部js兼容处理 -->@babel/polyfill (在入口文件import引入即可)
						 问题：我只要解决部分兼容性问题，这个插件将所有兼容引入（体积太大）
						 3、需要做兼容性处理（按需加载）--> coreJS(安装core.js)
					   */
					{
						test: /\.js$/,
						// 排除第三方库
						exclude: /node_modules/,
						//只检查src下面的js代码
						include:resolve(__dirname,'src')
						use:[
						   {
							 loader:"thread-loader", 
							 options:{
								 workers:2  //进程为2个
							 }
						   },
						   {
							loader: 'babel-loader',
							options: {
								// 预设：presets 指示babel做怎么样的兼容处理
								presets: [
									[
										'@babel/preset-env',
										{
											//按需加载
											useBuiltIns: 'usage',
											//指定core.js版本
											corejs: {
												version: 3,
											},
											//指定按需加载的浏览器版本
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
								/*
								   babel-loader缓存
								   cacheDirectory:true -->第二次打包更快
								   文件缓存
								*/
								cacheDirectory: true
							},
						   }
						]
					
					},
				]
			}

		]
	},
	plugins: [
		//详细插件(plugins)的配置
		//html-webpack-plugin
		//功能: 默认会创建一个空的html文件，自动引入打包输入的所有资源（js/css）
		//需要有结构的html文件
		new HtmlWebpackPlugin({
			//复制 'index.html' 文件，并自动引入打包输入的所有资源（js/css）
			template: 'index.html',
			// 压缩html代码
			minify: {
				// 移除html中空格
				collapseWhitespace: true,
				// 移除html中注释
				removeComments: true,
			},
		}),
		//提取js中的css成单独文件
		new miniCssExtractPlugin({
			// 对输出css文件重命名
			filename: 'css/built.[contenthash:10].css',
		}),
		// 压缩css
		new optimizeCssAssetsWebpackPlugin(),
		/* 
		   PWA:渐进式网络开发应用程序（离线可访问）
		   workbox--> workbox-webpack-plugin
		   sw 必须运行在服务器中
		   -->  node.js
		   
		   -->npm i serve -g
		   serve -s build启动服务器 将build下面的所有资源暴露出去
		 */
		new workboxWebpackPlugin.FeberateSw({
			//1、帮助serviceworker快速启动
			//2、删除旧的serviceworker
			clientsClaim: true,
			skipWaiting: true
		}),
		
	    //配合dll文件，告诉webpack，那些文件不需要打包
		new webpack.DllReferencePlugin({
			maifest:resolve(__dirname,'dll/maifest')
		}),
		
		//将某个文件打包输入，并在html中自动引入
		new addAssetHtmlWebpackPlugin({
			filepath:resolve(__dirname,'dll/jquery')
		})
	],
	/*
	   可以将node_modules中的代码单独打包一个chunk最终输出
	*/
	
	optimization:{
		splimization:{
			chunks:"all",
			minSize:30*1024,  //分割的chunk最小为30kb
			maxSize:0,        //最大没有限制
			minChunks:1       //要啊提取的chunk最少被引用1次
			maxAsyncREquests:5, //按需加载最大数量为5个
			minInitealDelimiter:3,  //入口文件最大并行请求数量
			automaticNameDelimiter:'~', //名称连接符
			name:true,                  //可以使用命名规则
		},
		//将当前模块的记录其他模块的hash值单独打包一个文件runtime
		//解决：缓存失效
		runTimeChunk:{
			name:entrypoint => `runtime-${entrypoint.name}`
		},
		minimizer:[
		  new TerserWebpackPlugin({
			  //开启缓存
			  cache:true,
			  //开启多线程打包
			  parallel:true,
			  //启动source-map
			  souceMap:true
		  })
		]
	},
	externals:{
		//拒绝打包进来
		jquery:'jquery'
	}
	
	//mode:'production'
	mode: 'development',
	//开发服务器（自动化，自动编译，自动打开浏览器，自动刷新浏览器）安装webpack-dev-server
	//特点:只会在内存中编译打包，不会有任何输出（本地不打包）； 
	//启动devSever指令为：npx webpack-dev-server
	devServer: {
		//项目构建后的路径
		contentBase: resolve(__dirname, 'build'),
		//监视contentBase 目录下的所有文件，一旦发生变化就reload
		watchContentBase:true,
		//忽略某些文件
		watchOptions:{
			ignored:"node_modules"
		},
		//启动gzip压缩
		compress: true,
		//配置端口号
		port: 5000,
		host:'locahost',
		// 自动打开浏览器
		open: true,
		//热启动
		/* 
		   HMR:hot module replacement
			作用:一个模块发生变化，只会打包当前模块，而不是打包所有模块
			样式文件：可以使用HMR功能：因为style-loader内部实现了
			js文件：默认没有HMR功能
			html文件：默认没有HMR功能,同时会导致一个问题：html不能热更新了
			解决方法：修改entry,将html文件引入
		 */
        hot: true,
		//不要显示启动服务器日志信息
		clientLogLevel:'none',
		//除了一些基本启动信息外，其他内容都不要显示
		quiet:true,
		//如果出错了，不要全屏提示
		overlady:false,
		//服务器代理 -->解决开发环境跨域问题
		proxy:{
			//一旦devServer(5000)服务器收到 api/xxx的请求，就会转换到另一个服务器(3000)
			'api':{
				target:'http://locahost:3000',
				//发送请求时。请求路径重写    api/xxx --> '/xxx'(去掉api)
				pathRewrite:{
					'^/api':''
				}
			}
		}
        /* 
        source-map 一种提供源代码到构建后代码映射技术 （如果构建后代码出错，通过映射可以找到源代码的错误）
        [inline-|hidden-|eval-][nosoures-] [cheap-]
        source-map 外部  
        错误代码的准确信息和源代码的错误位置 
        inline-source-map    内联（在打包的js中）
        错误代码的准确信息和源代码的错误位置 
        hidden-source-map    外部（生成source-map文件）
        错误代码的错误原因，没有错误位置，不能追踪到源代码错误，只能提示到构建后代码的提示
        eval-source-map      内联（）
        错误代码的准确信息和源代码的错误位置 
        nosoures-source-map  外部
        找到错误代码的准确信息，没有源代码任何信息
        cheap-source-map     外部
        错误代码的准确信息和源代码的错误位置 ，但是整行代码
            内联和外部的区别
            1、内联速度更快
                
            开发环境：
            速度快
            eval-cheap-souce-map
            eval-source-map
            调试更友好
            vue和react脚手架默认:eval-source-map
            生产环境：源代码要不要隐藏？调试要不要友好	 
        nosoures-source-map
        hidden-source-map
        可以选择source-map/cheap-module-source-map
        */
		devtool: "eval-source-map"
	},
	//解析模块的规则
	resolve:{
		//配置解析模块路径别名：优点写路径简单，缺点没有提示
		alias:{
			$css: resolve(__dirname,'src/css')
		},
		//配置省略文件路径的后缀名
		extensions:['.js','.css','.json'],
		//告诉webpack 解析模块是去哪个目录
		modules:[resolve(__dirname,'../../node_modules'),'node_modules']
	}
}



/* 
   缓存
   babel-loader缓存
   cacheDirectory:true -->第二次打包更快
   文件缓存
   hash:每次webpack构建唯一的hash值。
   问题：因为js和css同时使用一个hash值
   如果重新打包会导致所有缓存失效
   chunkhash:根据chunk生成hash值，如果打包来源同一个chunk,那么hash值就一样
   问题:js和css的hash值还是一样的
   因为css是从js中引入的
   contenthash:根据文件内容生成hash，不同的文件一定不一样
   -->上线代码运行缓存更好使用
 */

/* 
  tree-shaking:去除无用代码
  1、必须使用esMoudule
  2、mode设置成production
  作用：减少代码体积
  在package.json中配置
  "slideEffects":false(所有代码都会tree-shaking)
  改成"slideEffects":["*.css","*scss","*.less"]
 */
 /*
    懒加载
	es6语法
	webpackChunkName加载的js名称
	webpackPrefetch:true预加载
	import(/*webpackChunkName:'test',webpackPrefetch:true).then(()=>{
		
	})
 
 */
 /*
    多进程打包 
	安装thread-loader
	配置在js下面
 */


