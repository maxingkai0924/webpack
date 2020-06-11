# 这是IOI-前台界面
## 1、下载启动项目
  * 从git地址拉下代码  git clone
   
  * 进入当前目录执行 npm i  下载依赖
   
  * npm run dev 启动项目
## 2、打包项目
 ```
    npm run build--test 测试环境打包
    npm run build--prop 线上环境打包
 ```

 ## 3、配置url
 * 打开项目中config文件下，找到  开发.js 、 部署.js 、测试.js 三个文件
  
 * 开发.js  执行命令npm run dev（启动），会把js文件testData对象写入到打包后的urls.json中
 * 测试.js  执行命令npm run build--test（打包）  会把js文件testData对象写入到打包后的urls.json中
 * 部署.js  执行命令npm run build--prod，会把js文件testData对象写入到打包后的urls.json中

## 4、打包后文件中urls.json文件详情
```
 {
    "data":[
        {
            "name":"URL",
            "value":"http://58.56.42.50:8101/"
        },
        {
            "name":"SITEID",
            "value":"1a9af24949184a37847106eeda384aa1"
        },
        {
            "name":"fontCssUrl",
            "value":"//at.alicdn.com/t/font_1792196_ik88ibhhf8.css"
        },
        {
            "name":"fontJsUrl",
            "value":"//at.alicdn.com/t/font_1792196_ufbixlxktpl.js"
        }
    ]
}
```

| 重要字段 | 说明 | 类型 | 是否必须 |
| --- | --- | --- |  --- | 
|URL|接口地址|网址|是| 
|SITEID|网站siteId|id|是|
|fontCssUrl|阿里字体图标公共样式|css| 是|
|fontJsUrl|阿里字体图标公共js|js|是

#### 注意：如果打包发版后的urls.json文件需要修改
1. 禁止修改打包后name对应值 
2. 只可修改value对应的值，修改之前也得慎重