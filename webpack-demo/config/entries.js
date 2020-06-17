const fs = require('fs');
const path = require('path');
let files = fs.readdirSync(path.resolve(__dirname, '../src/js'));
let htmlFiles = fs.readdirSync(path.resolve(__dirname, '../src/pages'))
htmlFiles = htmlFiles.filter(item => item.indexOf('.html') != -1);
let entries = {};
let htmlArray = [];
files.forEach(item => {
    entries[item.split('.')[0]] = [path.resolve(__dirname, `../src/js/${item}`)];
});

htmlFiles.forEach(val => {
    let arr = files.filter(item => val.split('.')[0] == item.split('.')[0]);
    if (arr.length > 0) {
        htmlArray.push({
            template: path.resolve(__dirname, `../src/pages/${arr[0].split('.')[0]}.html`),
            filename: `pages/${arr[0].split('.')[0]}.html`,
            chunks: ['vendors', 'common', arr[0].split('.')[0]],
            minify: {
                removeAttributeQuotes: true, //删除html属性的双引号
                collapseWhitespace: true, //折叠空行，把所有的html折叠成一行
            }
        })
    } else {
        htmlArray.push({
            template: path.resolve(__dirname, `../src/pages/${val.split('.')[0]}.html`),
            filename: `pages/${val.split('.')[0]}.html`,
            chunks: [],
            minify: {
                removeAttributeQuotes: true, //删除html属性的双引号
                collapseWhitespace: true, //折叠空行，把所有的html折叠成一行
            }
        })
    }
});
htmlArray.unshift({
    template: path.resolve(__dirname, '../src/index.html'),
    filename: 'index.html',
    chunks: ['home'],
    minify: {
        removeAttributeQuotes: true, //删除html属性的双引号
        collapseWhitespace: true, //折叠空行，把所有的html折叠成一行
    }
})

module.exports = {
    entries,
    htmlArray
}