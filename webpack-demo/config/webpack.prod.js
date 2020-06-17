const {smart} = require('webpack-merge');
const base = require('./webpack.base.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin')
module.exports = smart(base,{
    mode:'production',
    devtool:false,
    optimization:{
        minimizer:[
            new TerserPlugin(),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins:[
        new CleanWebpackPlugin()
    ],
})