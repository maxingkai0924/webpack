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
            "value":"/api"
        },
    ]
}
```

| 重要字段 | 说明 | 类型 | 是否必须 |
| --- | --- | --- |  --- | 
|URL|接口地址|网址|是| 
