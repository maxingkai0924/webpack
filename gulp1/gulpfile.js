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
//半自动刷新
var livereload = require('gulp-livereload');
//全自动刷新
var connect = require('gulp-connect');
//自动打开浏览器
var open = require('open');
//所有的插件组合(基本上包含上面的插件)
var $ = require('gulp-load-plugins')();

gulp.task('任务名',function(){
    //配置任务的操作
});

//注册压缩js的任务
gulp.task('js',function(){
    return gulp.src('src/js/**/*.js')  //找到目标源文件，将数据读取到gulp内存中
    .pipe($.concat('build.js'))          //临时合并文件
    .pipe(gulp.dest("dist/js/"))       //输出文件
    .pipe($.uglify())                    //压缩文件
    .pipe($.rename({suffix:'.min'}))      //重命名
    .pipe(gulp.dest('dist/js'))
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
    .pipe($.concat('build.css'))           
    .pipe(gulp.dest('dist/css'))
    .pipe($.rename({suffix:'.min'}))
    .pipe($.cleanCss({comPatibility:'ie8'}))
    .pipe(gulp.dest('dist/css'))
    .pipe($.livereload())
    .pipe($.connect.reload())
});

//注册image任务
gulp.task('images',function(){
    gulp.src('src//img/**/*.{png,jpg,gif}')
    .pipe(gulp.dest('dist/img'))
})

//注册html任务  collapseWhitespace去掉html的空格
gulp.task('html',function(){
    gulp.src('index.html')
    .pipe($.htmlmin({collapseWhitespace:true}))
    .pipe(gulp.dest('dist/'))
    .pipe($.livereload())
    .pipe($.connect.reload())
})


//半自动注册监视任务
gulp.task('watch',['default'],function(){

    //开启监听
    livereload.listen();

    //确认监听的目标及其绑定相应的任务
    gulp.watch('index.html',['html']);
    gulp.watch('src/img/**/*.{png,jpg,gif}',['images']); 
    gulp.watch('src/js/*.js',['js']);   
    gulp.watch(['src/css/*.css','src/less/*.less'],['css']);

});

//全自动监听任务
gulp.task('server',['default'],function(){
    $.connect.server({
        root:'dist/',       
        livereload:true,    //实时刷新
        port:'5000'
    });
     
    //自动打开浏览器
    open('http://localhost:5000/')
    //确认监听的目标及其绑定相应的任务
    gulp.watch('index.html',['html']);
    gulp.watch('src/img/**/*.{png,jpg,gif}',['images']); 
    gulp.watch('src/js/*.js',['js']);   
    gulp.watch(['src/css/*.css','src/less/*.less'],['css']);
})

//注册默认任务 启动gulp就可以了
gulp.task('default',['js','css','html','images']);