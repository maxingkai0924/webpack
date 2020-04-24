const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

module.exports = {
  outputDir: 'dist',
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/vant-demo/' : '/',
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
  devServer:{
  port: '8080',
  open: true,
  proxy:  {
		"/api":{
			target: 'http://58.56.42.50:10021/service',
			changeOrigin: true,
			secure: false, // 目标服务器地址是否是安全协议
			pathRewrite: {
                '^/api': '/'
			}
		}
	}
  }
};
