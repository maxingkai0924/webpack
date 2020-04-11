# 标题
## 标题
### 标题
#### 标题
**标题**
##### 标题
*标题*
***标题***
~~这是加删除线的文字~~

>这是引用的内容
>>这是引用的内容
>>>这是引用的内容
---
***
[百度](http://baidu.com)
- 列表内容
+ 列表内容
* 列表内容
1. 列表内容  
2. 列表内容   
3. 列表内容   

| 表头 | 表头 | 表头 |
| --- | --- | --- |
|第一行|第一行|第一行|
|第二行|第二行|第二行|
|第三行|第三行|第三行|

`gulp`

```
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
```