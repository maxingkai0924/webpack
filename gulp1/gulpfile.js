var gulp = require('gulp');
//css/js 文件合并
var concat = require('gulp-concat');
//文件重命名
var rename = require('gulp-rename');
//js文件压缩
var uglify= require('gulp-uglify');
//less插件
var less = require('gulp-less');
//压缩css
var cssClean = require('gulp-clean-css');
//html文件合并
var htmlMin = require('gulp-htmlmin');

//全自动刷新
var connect = require('gulp-connect');

var  gutil = require('gulp-util');
//半自动刷新
var livereload = require('gulp-livereload');

const fileinclude  = require('gulp-file-include');

const webpack = require('webpack-stream');

const babel = require("gulp-babel");

var webpackConfig = require('./webpack.config.js');
const named = require('vinyl-named');
//自动打开浏览器
var open = require('open');
//所有的插件组合(基本上包含上面的插件)
var $ = require('gulp-load-plugins')();
 
const {
	resolve
} = require('path');
var os = require('os');
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
console.log(myHost);

gulp.task('任务名',function(){
    //配置任务的操作
});

//注册压缩js的任务
gulp.task('js',function(){
    return gulp.src('src/js/**/*.js')  //找到目标源文件，将数据读取到gulp内存中
    //.pipe($.concat('build.js'))          //临时合并文件
   
    // .pipe(gulp.dest("loi/js/"))       //输出文件
    .pipe(named())
    .pipe(webpack(webpackConfig))
    .pipe(babel())
    //.pipe($.uglify({compress:{properties:false}, output:{'quote_keys':true}}))                    //压缩文件
    .on('error', function(err) {
        gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    //.pipe($.rename({suffix:'.min'}))      //重命名
    .pipe(gulp.dest('loi/js'))
    .pipe($.livereload())                 //监听变化
    .pipe($.connect.reload())
});


//注册转换less的任务
gulp.task('less',function(){
    return gulp.src('src/less/*.less')     //找到目标源文件，将数据读取到gulp内存中
    .pipe($.less())                          //编译less文件转化为css
    .pipe(gulp.dest('src/css/'))           //输出到css中
    .pipe($.livereload())
    .pipe($.connect.reload())
});

//合并压缩css文件
//["less"] 当我执行css任务的时候，先执行less依赖
gulp.task('css',["less"],function(){
    return gulp.src('src/css/**/*.css')
    // .pipe($.concat('build.css'))           
    .pipe(gulp.dest('loi/css'))
    // .pipe($.rename({suffix:'.min'}))
    .pipe($.cleanCss({comPatibility:'ie8'}))
    .pipe(gulp.dest('loi/css'))
    .pipe($.livereload())
    .pipe($.connect.reload())
});

//注册image任务
gulp.task('images',function(){
    gulp.src('src/img/**/*.{png,jpg,gif}')
    .pipe(gulp.dest('loi/img'))
    .pipe($.livereload())
    .pipe($.connect.reload())
})

//注册fonts任务
gulp.task('font',function(){
    gulp.src('src/fonts/*.{css,eot,js,json,svg,ttf,woff,woff2}')
    .pipe(gulp.dest('loi/fonts'))
    .pipe($.livereload())
    .pipe($.connect.reload())
})

//注册html任务  collapseWhitespace去掉html的空格
gulp.task('index',["html"],function(){
    gulp.src('src/*.html')
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe($.htmlmin({collapseWhitespace:true}))
    .pipe(gulp.dest('loi/'))
    .pipe($.livereload())
    .pipe($.connect.reload())
})


//注册html任务  collapseWhitespace去掉html的空格
gulp.task('html',function(){
    gulp.src('src/pages/**/*.html')
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe($.htmlmin({collapseWhitespace:true}))
    .pipe(gulp.dest('loi/pages'))
    .pipe($.livereload())
    .pipe($.connect.reload())
})


//半自动注册监视任务
gulp.task('watch',['default'],function(){

    //开启监听
    livereload.listen();

    //确认监听的目标及其绑定相应的任务
    gulp.watch('src/fonts/**/*.',['font']);
    gulp.watch('src/pages/**/*.html',['html']);
    gulp.watch('src/img/**/*.{png,jpg,gif}',['images']); 
    gulp.watch('src/js/*.js',['js']);   
    gulp.watch(['src/css/*.css','src/less/*.less'],['css']);

});

//全自动监听任务
gulp.task('server',['default'],function(){
    $.connect.server({
        root:'loi/',       
        livereload:true,    //实时刷新
        // port:'5000',
        host:`${myHost}`
    });
     
    //自动打开浏览器
    open(`http://${myHost}:8080`)
    //确认监听的目标及其绑定相应的任务
    gulp.watch('src/fonts/**/*.{css,eot,js,json,svg,ttf,woff,woff2}',['font']);
    gulp.watch('src/*.html',['index']);
    gulp.watch('src/pages/**/*.html',['html']);
    gulp.watch('src/img/**/*.{png,jpg,gif}',['images']); 
    gulp.watch('src/js/*.js',['js']);   
    gulp.watch(['src/css/*.css','src/less/*.less'],['css']);
})

//注册默认任务 启动gulp就可以了
gulp.task('default',['js','css','html','images','font','index']);