const express = require('express');
const app = express();
const path = require('path');
const opn = require('opn');
const proxyMiddleware = require('http-proxy-middleware');

app.use(express.static(path.join(__dirname, './static')));
const proxyTable={
    "/lock": {
        target: 'http://192.168.1.180',
        // target: 'http://192.168.1.20:8087',
        // target: 'http://62.234.168.135',
        changeOrigin: true,
        pathRewrite: function(url) {
            return url;
        }
    },
    "/user": {
        target: 'http://192.168.1.180',
        // target: 'http://192.168.1.20:8081',
        // target: 'http://62.234.168.135',
        changeOrigin: true,
        pathRewrite: function(url) {
            return url;
        }
    },
    "/busi": {
        target: 'http://192.168.1.180',
        // target: 'http://192.168.1.30:8080',
        // target: 'http://62.234.168.135',
        changeOrigin: true,
        pathRewrite: function(url) {
            return url;
        }
    }
};
Object.keys(proxyTable).forEach(function (context) {
    let options = proxyTable[context];
    if (typeof options === 'string') {
        options = { target: options }
    }
    app.use(proxyMiddleware(options.filter || context, options))
});


let port = parseInt(8085);
let server = app.listen(port, () =>{
    console.log(`started the server,the port is ${port}`);
    opn("http://localhost:"+port);
});

