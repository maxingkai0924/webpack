const browserSync = require('browser-sync').create();//静态服务器
const path = require('path');
const reload = browserSync.reload;
const tools = require('./config/tools');
const outDir = tools.outputDir;
const baseDir = path.resolve(__dirname,`./${outDir}`);
const gulp = require('gulp');
//解决跨域
var { createProxyMiddleware } = require('http-proxy-middleware');


const fs = require('fs');
const data = fs.readFileSync(path.resolve(__dirname,'./config/测试.js'),'utf8'); 
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

let proxyArr =[
    // 代理转发接口(1)
    createProxyMiddleware('/api', {
        target:url,
        changeOrigin: false,
        pathRewrite:{
            "^/api":""
        }
    }),

]
browserSync.init({      // 启动Browsersync服务
    server: {
        baseDir: baseDir,   // 启动服务的目录 默认 index.html
        index: 'index.html', // 自定义启动文件名
        // 使用中间件
        middleware: [...proxyArr]
    },
    notify: false,
    open: 'external',   // 决定Browsersync启动时自动打开的网址 external 表示 可外部打开 url, 可以在同一 wifi 下不同终端测试
    injectChanges: false // 注入CSS改变
});
gulp.watch(`./${outDir}/css/**/*.css`).on('change', reload);
gulp.watch(`./${outDir}/pages/**/*.html`,).on('change', reload);
gulp.watch(`./${outDir}/*.html`).on('change', reload);
gulp.watch(`./${outDir}/js/*.js`).on('change', reload);