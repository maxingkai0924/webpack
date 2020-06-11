let fs = require('fs');//http://192.168.1.15/service/
//http://mds.nmdis.org.cn/service/
let testData = 
`let urls = [
    {
        name:"URL",
        value:"http://58.56.42.50:6101/service"
    },
    {
        name:"SITEID",
        value:"ea461abdd10a486181b3785ccdfe5e28"
    },
    {
        name:"TIMEURL",
        value:"http://mds.nmdis.org.cn"
    }
]
export default urls;
`
fs.writeFileSync('../src/public/urls.js',testData);
