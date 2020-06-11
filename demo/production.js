const tools = require('./config/tools');
const path = require('path');
const entry = tools.entryDir;
const output = tools.outputDir;
const fs = require('fs');
const slog = require('single-line-log').stdout;
const jsPath = path.resolve(__dirname,`./${entry}/js`);
const shell = require('shelljs');
tools.resolveScss(`./${entry}/scss/*.scss`,path.resolve(__dirname,`./${output}/css`));
tools.resolveHtml(`./${entry}/*.html`,path.resolve(__dirname,`./${output}`));
tools.resolveHtml(`./${entry}/pages/*.html`,path.resolve(__dirname,`./${output}/pages`));
tools.uglifyJs(`./${entry}/js/*.js`,path.resolve(__dirname,`./${output}/js`));
let number = 1;
let dirs = fs.readdirSync(jsPath);
let timer = setInterval(() => {
    number++;
    let progress = (number/dirs.length).toFixed(2).toString().substr(0,4);
    slog('项目打包进度: ' + progress* 100 + '%');
    if(number >= dirs.length){
        clearInterval(timer);
        shell.exit();
    }
}, 800);
