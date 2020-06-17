const targetPath='IOI';
const path = require('path');
const webpack = require('webpack');
const entry = require('./entries');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const copyWebpackPlugin = require('copy-webpack-plugin');

function getProjectAbsolutePath(dir) {
    return path.resolve(__dirname, '../', dir)
}
module.exports = {
    entry:entry.entries,
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, `../${targetPath}`),
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.scss', 'css', '.json', '.vue'],
        alias: { //别名
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.join(__dirname, '../src')
        },
    },
    plugins: [
        new webpack.ProvidePlugin({//所有模块内置jQuery/lodash,无需import 引入
            $:'jquery',
            jQuery:'jquery'
        }),
        new copyWebpackPlugin({
            patterns: [{
                    from: 'static',
                    to: 'static'
                },
                {
                    from: path.resolve(__dirname, '../src/assets'),
                    to: 'assets',
                    globOptions: {
                        ignore: ['!**/imgs']
                    }
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new webpack.ProvidePlugin({
            $:'jquery',
            jQuery:'jquery'
        })
    ],
    optimization: {
        splitChunks: { //分割代码块
            cacheGroups: { //缓存组
                common: { //公共的模块
                    name: 'common',
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 2,
                    priority:-20,
                    reuseExistingChunk:true
                },
                vendors: {
                    name: "vendors",
                    chunks: 'initial',
                    priority:-10,
                    test:/[\\/]node_modules[\\/]/,
                    reuseExistingChunk:true,
                    minSize: 0,
                    minChunks: 2
                }
            }
        }
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: [{
                    loader: "babel-loader"
                }],
                exclude: /node_modules/, //排除哪个文件夹
                include: getProjectAbsolutePath('src') //包括哪个文件夹
            },
            {
                //可以处理scss文件, node-sass,sass-loader
                test: /\.css$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                autoprefixer({
                                    overrideBrowserslist: ["defaults", "> 1%", "last 10 versions", "Firefox < 20", "not ie <= 8", "ios > 7", "cover 99.5%"]
                                })
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader', //@import语法解析路径
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                autoprefixer({
                                    overrideBrowserslist: ['ie >= 8', 'Firefox >= 20', 'Safari >= 5', 'Android >= 4', 'Ios >= 6', 'last 4 version']
                                })
                            ]
                        }
                    },
                    'sass-loader' //把scss -> css
                ]
            },
            {
                test: /\.html$/,
                use: 'html-withimg-loader'
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: [{
                    loader: "url-loader",
                    //当图片小于多少k的时候用base64转化
                    options: {
                        limit: 10 * 1024,
                        esModule: false,
                        outputPath: 'assets/imgs'
                    }
                }]
            }
        ]
    }
}
entry.htmlArray.forEach(element => {
    module.exports.plugins.push(new HtmlWebpackPlugin(element));
});