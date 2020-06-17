let fs = require('fs');
let path = require('path');
let testData = 
`{
    "data":[
        {
            "name":"URL",
            "value":"/api"
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
`
fs.writeFileSync(path.resolve(__dirname,'../static/json/urls.json'),testData);
