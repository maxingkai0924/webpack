const {smart} = require('webpack-merge');
const webpack = require('webpack');
const base = require('./webpack.base.js');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');
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
const Host = getIPAdress();
const path = require('path')
const fs = require('fs');
const data = fs.readFileSync(path.resolve(__dirname,'./测试.js'),'utf8'); 
let lines = data.split('\n');
let indexs = [];
lines.forEach((item,index) => {
    item = item.replace('\r','');
    if(item.indexOf('`') != -1){
        indexs.push(index)
    }
})
let urls = ''
for(let i = indexs[0]; i <= indexs[1];i++){
    urls += (lines[i].trim());
}
urls = JSON.parse(urls.replace(/`/gi,''));
let url = urls.data.filter(item => item.name == 'URL')[0].value;
const devWebpackConfig = smart(base,{
    mode:'development',
    devtool:'eval-source-map',
    devServer:{
        contentBase:false,//启动目录
        compress:true,//gzip压缩
        overlay: {
            warnings: false,
            errors: true
        },
        host:'0.0.0.0',
        clientLogLevel:'error',
        historyApiFallback: false,
        quiet:true,
        openPage: 'index.html',
        proxy: {
            '/api': {
                target: url,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
    },
    plugins:[
        
        new webpack.HotModuleReplacementPlugin(),//热更新插件
        new webpack.NamedModulesPlugin() 
    ],
});
module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = 8080;
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            devWebpackConfig.devServer.port = port;
            devWebpackConfig.plugins.push(new FriendlyErrorsWebpackPlugin({
                compilationSuccessInfo: {
                    messages: [`外网前台的项目运行在这里 : http://${Host}:${port}`],
                },
                onErrors: function(severity,errors){
                    const notifier = require('node-notifier');
                    if (severity !== 'error') return;
                    notifier.notify({
                        title: '小笨蛋',
                        message: '运行出错啦,快去看看错误提示吧'
                    })
                }
            }))
            resolve(devWebpackConfig);
        }
    })
})